package mk.ukim.finki.wp.backend.service;

import java.time.LocalDate;
import java.util.Set;
import mk.ukim.finki.wp.backend.model.Exercise;
import mk.ukim.finki.wp.backend.model.Workout;
import mk.ukim.finki.wp.backend.model.WorkoutEntry;
import mk.ukim.finki.wp.backend.repository.WorkoutEntryRepository;
import mk.ukim.finki.wp.backend.repository.WorkoutRepository;
import mk.ukim.finki.wp.backend.web.dto.CreateWorkoutEntryRequest;
import mk.ukim.finki.wp.backend.web.dto.CreateWorkoutRequest;
import mk.ukim.finki.wp.backend.web.dto.UpdateWorkoutEntryRequest;
import mk.ukim.finki.wp.backend.web.dto.UpdateWorkoutRequest;
import mk.ukim.finki.wp.backend.web.dto.WorkoutEntryResponse;
import mk.ukim.finki.wp.backend.web.dto.WorkoutResponse;
import mk.ukim.finki.wp.backend.web.exception.BusinessRuleException;
import mk.ukim.finki.wp.backend.web.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkoutService {

    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("id", "name", "date", "notes");

    private final WorkoutRepository workoutRepository;
    private final WorkoutEntryRepository workoutEntryRepository;
    private final ExerciseService exerciseService;

    public WorkoutService(
            WorkoutRepository workoutRepository,
            WorkoutEntryRepository workoutEntryRepository,
            ExerciseService exerciseService
    ) {
        this.workoutRepository = workoutRepository;
        this.workoutEntryRepository = workoutEntryRepository;
        this.exerciseService = exerciseService;
    }

    @Transactional(readOnly = true)
    public Page<WorkoutResponse> findAll(Pageable pageable) {
        validateSort(pageable.getSort());

        Sort defaultSort = Sort.by(Sort.Direction.DESC, "date");
        Pageable effectivePageable;
        if (pageable.isUnpaged()) {
            effectivePageable = PageRequest.of(0, 20, defaultSort);
        } else if (pageable.getSort().isSorted()) {
            effectivePageable = pageable;
        } else {
            effectivePageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), defaultSort);
        }

        return workoutRepository.findAll(effectivePageable)
                .map(this::toResponse);
    }

    private void validateSort(Sort sort) {
        sort.stream()
                .map(Sort.Order::getProperty)
                .filter(property -> !ALLOWED_SORT_FIELDS.contains(property))
                .findFirst()
                .ifPresent(property -> {
                    throw new BusinessRuleException(
                            "Invalid workout sort field '" + property + "'. Allowed values: id, name, date, notes"
                    );
                });
    }

    @Transactional(readOnly = true)
    public WorkoutResponse findById(Long id) {
        return toResponse(getWorkout(id));
    }

    @Transactional
    public WorkoutResponse create(CreateWorkoutRequest request) {
        validateWorkoutDate(request.date());

        Workout workout = Workout.builder()
                .name(request.name().trim())
                .date(request.date())
                .notes(request.notes())
                .build();

        return toResponse(workoutRepository.save(workout));
    }

    @Transactional
    public WorkoutResponse update(Long id, UpdateWorkoutRequest request) {
        Workout workout = getWorkout(id);
        validateWorkoutDate(request.date());

        workout.setName(request.name().trim());
        workout.setDate(request.date());
        workout.setNotes(request.notes());

        return toResponse(workout);
    }

    @Transactional
    public void delete(Long id) {
        Workout workout = getWorkout(id);
        workoutRepository.delete(workout);
    }

    @Transactional
    public WorkoutEntryResponse addEntry(Long workoutId, CreateWorkoutEntryRequest request) {
        Workout workout = getWorkout(workoutId);
        Exercise exercise = exerciseService.getExercise(request.exerciseId());

        WorkoutEntry entry = WorkoutEntry.builder()
                .workout(workout)
                .exercise(exercise)
                .sets(request.sets())
                .reps(request.reps())
                .weight(request.weight())
                .build();

        workout.getEntries().add(entry);
        return toEntryResponse(workoutEntryRepository.save(entry));
    }

    @Transactional
    public WorkoutEntryResponse updateEntry(Long workoutId, Long entryId, UpdateWorkoutEntryRequest request) {
        getWorkout(workoutId);
        WorkoutEntry entry = getEntryForWorkout(entryId, workoutId);
        Exercise exercise = exerciseService.getExercise(request.exerciseId());

        entry.setExercise(exercise);
        entry.setSets(request.sets());
        entry.setReps(request.reps());
        entry.setWeight(request.weight());

        return toEntryResponse(entry);
    }

    @Transactional
    public void deleteEntry(Long workoutId, Long entryId) {
        WorkoutEntry entry = getEntryForWorkout(entryId, workoutId);
        workoutEntryRepository.delete(entry);
    }

    @Transactional(readOnly = true)
    public Workout getWorkout(Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found with id " + id));
    }

    private WorkoutEntry getEntryForWorkout(Long entryId, Long workoutId) {
        return workoutEntryRepository.findByIdAndWorkoutId(entryId, workoutId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Workout entry not found with id " + entryId + " for workout " + workoutId
                ));
    }

    private void validateWorkoutDate(LocalDate date) {
        if (date.isAfter(LocalDate.now())) {
            throw new BusinessRuleException("Workout date cannot be in the future");
        }
    }

    private WorkoutResponse toResponse(Workout workout) {
        return new WorkoutResponse(
                workout.getId(),
                workout.getName(),
                workout.getDate(),
                workout.getNotes(),
                workout.getEntries().stream()
                        .map(this::toEntryResponse)
                        .toList()
        );
    }

    private WorkoutEntryResponse toEntryResponse(WorkoutEntry entry) {
        return new WorkoutEntryResponse(
                entry.getId(),
                entry.getExercise().getId(),
                entry.getExercise().getName(),
                entry.getSets(),
                entry.getReps(),
                entry.getWeight(),
                calculateVolume(entry)
        );
    }

    private double calculateVolume(WorkoutEntry entry) {
        return entry.getSets() * entry.getReps() * entry.getWeight();
    }
}
