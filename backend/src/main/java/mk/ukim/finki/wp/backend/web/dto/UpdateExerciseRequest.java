package mk.ukim.finki.wp.backend.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.wp.backend.model.ExerciseType;
import mk.ukim.finki.wp.backend.model.MuscleGroup;

public record UpdateExerciseRequest(
        @NotBlank(message = "Exercise name is required")
        String name,

        @NotNull(message = "Muscle group is required")
        MuscleGroup muscleGroup,

        @NotNull(message = "Exercise type is required")
        ExerciseType type,

        String description
) {
}
