package mk.ukim.finki.wp.backend.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import mk.ukim.finki.wp.backend.model.Workout;
import mk.ukim.finki.wp.backend.model.WorkoutEntry;
import mk.ukim.finki.wp.backend.repository.ExerciseRepository;
import mk.ukim.finki.wp.backend.repository.WorkoutEntryRepository;
import mk.ukim.finki.wp.backend.repository.WorkoutRepository;
import mk.ukim.finki.wp.backend.web.dto.PersonalRecordResponse;
import mk.ukim.finki.wp.backend.web.dto.StatisticsSummaryResponse;
import mk.ukim.finki.wp.backend.web.dto.WorkoutHistoryResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StatisticsService {

    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutEntryRepository workoutEntryRepository;

    public StatisticsService(
            WorkoutRepository workoutRepository,
            ExerciseRepository exerciseRepository,
            WorkoutEntryRepository workoutEntryRepository
    ) {
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
        this.workoutEntryRepository = workoutEntryRepository;
    }

    @Transactional(readOnly = true)
    public StatisticsSummaryResponse getSummary() {
        long totalWorkouts = workoutRepository.count();
        long totalExercises = exerciseRepository.count();
        double totalVolume = workoutEntryRepository.findAll().stream()
                .mapToDouble(this::calculateVolume)
                .sum();
        double averageWorkoutVolume = totalWorkouts == 0 ? 0 : totalVolume / totalWorkouts;

        return new StatisticsSummaryResponse(totalWorkouts, totalExercises, totalVolume, averageWorkoutVolume);
    }

    @Transactional(readOnly = true)
    public List<PersonalRecordResponse> getPersonalRecords() {
        Comparator<WorkoutEntry> byBestPerformance = Comparator
                .comparing(WorkoutEntry::getWeight)
                .thenComparing(WorkoutEntry::getReps);

        return workoutEntryRepository.findAll().stream()
                .collect(Collectors.groupingBy(entry -> entry.getExercise().getId()))
                .values()
                .stream()
                .map(entries -> entries.stream().max(byBestPerformance).orElseThrow())
                .sorted(Comparator.comparing(entry -> entry.getExercise().getName()))
                .map(this::toPersonalRecordResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<WorkoutHistoryResponse> getWorkoutHistory() {
        return workoutRepository.findAllByOrderByDateDesc().stream()
                .map(this::toWorkoutHistoryResponse)
                .toList();
    }

    private PersonalRecordResponse toPersonalRecordResponse(WorkoutEntry entry) {
        return new PersonalRecordResponse(
                entry.getExercise().getId(),
                entry.getExercise().getName(),
                entry.getWeight(),
                entry.getReps(),
                entry.getSets(),
                entry.getWorkout().getDate(),
                entry.getWorkout().getId(),
                entry.getWorkout().getName()
        );
    }

    private WorkoutHistoryResponse toWorkoutHistoryResponse(Workout workout) {
        double totalVolume = workout.getEntries().stream()
                .mapToDouble(this::calculateVolume)
                .sum();

        return new WorkoutHistoryResponse(
                workout.getId(),
                workout.getName(),
                workout.getDate(),
                workout.getNotes(),
                totalVolume
        );
    }

    private double calculateVolume(WorkoutEntry entry) {
        return entry.getSets() * entry.getReps() * entry.getWeight();
    }
}
