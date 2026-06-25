package mk.ukim.finki.wp.backend.web.controller;

import jakarta.validation.Valid;
import java.util.List;
import mk.ukim.finki.wp.backend.model.MuscleGroup;
import mk.ukim.finki.wp.backend.service.ExerciseService;
import mk.ukim.finki.wp.backend.web.dto.CreateExerciseRequest;
import mk.ukim.finki.wp.backend.web.dto.ExerciseResponse;
import mk.ukim.finki.wp.backend.web.dto.UpdateExerciseRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<ExerciseResponse> findAll(
            @RequestParam(required = false) MuscleGroup muscleGroup,
            @RequestParam(required = false) String name
    ) {
        return exerciseService.findAll(muscleGroup, name);
    }

    @GetMapping("/{id}")
    public ExerciseResponse findById(@PathVariable Long id) {
        return exerciseService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseResponse create(@Valid @RequestBody CreateExerciseRequest request) {
        return exerciseService.create(request);
    }

    @PutMapping("/{id}")
    public ExerciseResponse update(@PathVariable Long id, @Valid @RequestBody UpdateExerciseRequest request) {
        return exerciseService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        exerciseService.delete(id);
    }
}
