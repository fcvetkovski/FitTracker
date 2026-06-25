package mk.ukim.finki.wp.backend.web.dto;

import java.time.LocalDate;
import java.util.List;

public record WorkoutResponse(
        Long id,
        String name,
        LocalDate date,
        String notes,
        List<WorkoutEntryResponse> entries
) {
}
