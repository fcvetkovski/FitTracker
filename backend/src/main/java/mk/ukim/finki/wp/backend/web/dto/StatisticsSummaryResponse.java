package mk.ukim.finki.wp.backend.web.dto;

public record StatisticsSummaryResponse(
        long totalWorkouts,
        long totalExercises,
        double totalVolume,
        double averageWorkoutVolume
) {
}
