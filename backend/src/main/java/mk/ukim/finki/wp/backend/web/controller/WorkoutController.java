package mk.ukim.finki.wp.backend.web.controller;

import jakarta.validation.Valid;
import mk.ukim.finki.wp.backend.service.WorkoutService;
import mk.ukim.finki.wp.backend.web.dto.CreateWorkoutEntryRequest;
import mk.ukim.finki.wp.backend.web.dto.CreateWorkoutRequest;
import mk.ukim.finki.wp.backend.web.dto.UpdateWorkoutEntryRequest;
import mk.ukim.finki.wp.backend.web.dto.UpdateWorkoutRequest;
import mk.ukim.finki.wp.backend.web.dto.WorkoutEntryResponse;
import mk.ukim.finki.wp.backend.web.dto.WorkoutResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping
    public Page<WorkoutResponse> findAll(
            @ParameterObject @PageableDefault(size = 10, sort = "date", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return workoutService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public WorkoutResponse findById(@PathVariable Long id) {
        return workoutService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkoutResponse create(@Valid @RequestBody CreateWorkoutRequest request) {
        return workoutService.create(request);
    }

    @PutMapping("/{id}")
    public WorkoutResponse update(@PathVariable Long id, @Valid @RequestBody UpdateWorkoutRequest request) {
        return workoutService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        workoutService.delete(id);
    }

    @PostMapping("/{workoutId}/entries")
    @ResponseStatus(HttpStatus.CREATED)
    public WorkoutEntryResponse addEntry(
            @PathVariable Long workoutId,
            @Valid @RequestBody CreateWorkoutEntryRequest request
    ) {
        return workoutService.addEntry(workoutId, request);
    }

    @PutMapping("/{workoutId}/entries/{entryId}")
    public WorkoutEntryResponse updateEntry(
            @PathVariable Long workoutId,
            @PathVariable Long entryId,
            @Valid @RequestBody UpdateWorkoutEntryRequest request
    ) {
        return workoutService.updateEntry(workoutId, entryId, request);
    }

    @DeleteMapping("/{workoutId}/entries/{entryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEntry(@PathVariable Long workoutId, @PathVariable Long entryId) {
        workoutService.deleteEntry(workoutId, entryId);
    }
}
