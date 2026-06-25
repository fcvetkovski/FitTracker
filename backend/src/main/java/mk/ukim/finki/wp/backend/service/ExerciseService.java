package mk.ukim.finki.wp.backend.service;

import java.util.List;
import mk.ukim.finki.wp.backend.model.Exercise;
import mk.ukim.finki.wp.backend.model.MuscleGroup;
import mk.ukim.finki.wp.backend.repository.ExerciseRepository;
import mk.ukim.finki.wp.backend.repository.WorkoutEntryRepository;
import mk.ukim.finki.wp.backend.web.dto.CreateExerciseRequest;
import mk.ukim.finki.wp.backend.web.dto.ExerciseResponse;
import mk.ukim.finki.wp.backend.web.dto.UpdateExerciseRequest;
import mk.ukim.finki.wp.backend.web.exception.ConflictException;
import mk.ukim.finki.wp.backend.web.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final WorkoutEntryRepository workoutEntryRepository;

    public ExerciseService(ExerciseRepository exerciseRepository, WorkoutEntryRepository workoutEntryRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutEntryRepository = workoutEntryRepository;
    }

    @Transactional(readOnly = true)
    public List<ExerciseResponse> findAll(MuscleGroup muscleGroup, String name) {
        List<Exercise> exercises;
        if (muscleGroup != null && name != null && !name.isBlank()) {
            exercises = exerciseRepository.findByMuscleGroupAndNameContainingIgnoreCase(muscleGroup, name.trim());
        } else if (muscleGroup != null) {
            exercises = exerciseRepository.findByMuscleGroup(muscleGroup);
        } else if (name != null && !name.isBlank()) {
            exercises = exerciseRepository.findByNameContainingIgnoreCase(name.trim());
        } else {
            exercises = exerciseRepository.findAll();
        }

        return exercises.stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ExerciseResponse findById(Long id) {
        return toResponse(getExercise(id));
    }

    @Transactional
    public ExerciseResponse create(CreateExerciseRequest request) {
        validateUniqueName(request.name(), null);

        Exercise exercise = Exercise.builder()
                .name(request.name().trim())
                .muscleGroup(request.muscleGroup())
                .type(request.type())
                .description(request.description())
                .build();

        return toResponse(exerciseRepository.save(exercise));
    }

    @Transactional
    public ExerciseResponse update(Long id, UpdateExerciseRequest request) {
        Exercise exercise = getExercise(id);
        validateUniqueName(request.name(), id);

        exercise.setName(request.name().trim());
        exercise.setMuscleGroup(request.muscleGroup());
        exercise.setType(request.type());
        exercise.setDescription(request.description());

        return toResponse(exercise);
    }

    @Transactional
    public void delete(Long id) {
        Exercise exercise = getExercise(id);
        if (workoutEntryRepository.existsByExerciseId(id)) {
            throw new ConflictException("Exercise cannot be deleted because it is used in workout entries");
        }
        exerciseRepository.delete(exercise);
    }

    @Transactional(readOnly = true)
    public Exercise getExercise(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id " + id));
    }

    private void validateUniqueName(String name, Long existingId) {
        exerciseRepository.findByNameIgnoreCase(name.trim())
                .filter(exercise -> existingId == null || !exercise.getId().equals(existingId))
                .ifPresent(exercise -> {
                    throw new ConflictException("Exercise name already exists");
                });
    }

    private ExerciseResponse toResponse(Exercise exercise) {
        return new ExerciseResponse(
                exercise.getId(),
                exercise.getName(),
                exercise.getMuscleGroup(),
                exercise.getType(),
                exercise.getDescription()
        );
    }
}
