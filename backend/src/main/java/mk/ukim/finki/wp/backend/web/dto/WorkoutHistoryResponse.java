package mk.ukim.finki.wp.backend.web.dto;

import java.time.LocalDate;

public record WorkoutHistoryResponse(
        Long workoutId,
        String workoutName,
        LocalDate date,
        String notes,
        double totalVolume
) {
}
