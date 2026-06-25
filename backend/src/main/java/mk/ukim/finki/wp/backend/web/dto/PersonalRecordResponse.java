package mk.ukim.finki.wp.backend.web.dto;

import java.time.LocalDate;

public record PersonalRecordResponse(
        Long exerciseId,
        String exerciseName,
        Double weight,
        Integer reps,
        Integer sets,
        LocalDate workoutDate,
        Long workoutId,
        String workoutName
) {
}
