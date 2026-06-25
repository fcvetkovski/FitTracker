package mk.ukim.finki.wp.backend.web.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record UpdateWorkoutEntryRequest(
        @NotNull(message = "Exercise id is required")
        Long exerciseId,

        @NotNull(message = "Sets are required")
        @Positive(message = "Sets must be greater than 0")
        Integer sets,

        @NotNull(message = "Reps are required")
        @Positive(message = "Reps must be greater than 0")
        Integer reps,

        @NotNull(message = "Weight is required")
        @PositiveOrZero(message = "Weight must be 0 or greater")
        Double weight
) {
}
