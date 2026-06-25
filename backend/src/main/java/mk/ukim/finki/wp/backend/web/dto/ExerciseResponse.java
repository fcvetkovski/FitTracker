package mk.ukim.finki.wp.backend.web.dto;

import mk.ukim.finki.wp.backend.model.ExerciseType;
import mk.ukim.finki.wp.backend.model.MuscleGroup;

public record ExerciseResponse(
        Long id,
        String name,
        MuscleGroup muscleGroup,
        ExerciseType type,
        String description
) {
}
