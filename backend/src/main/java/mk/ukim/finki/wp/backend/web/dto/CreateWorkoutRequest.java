package mk.ukim.finki.wp.backend.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record CreateWorkoutRequest(
        @NotBlank(message = "Workout name is required")
        String name,

        @NotNull(message = "Workout date is required")
        LocalDate date,

        String notes
) {
}
