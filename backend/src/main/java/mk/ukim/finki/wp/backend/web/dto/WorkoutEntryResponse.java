package mk.ukim.finki.wp.backend.web.dto;

public record WorkoutEntryResponse(
        Long id,
        Long exerciseId,
        String exerciseName,
        Integer sets,
        Integer reps,
        Double weight,
        Double volume
) {
}
