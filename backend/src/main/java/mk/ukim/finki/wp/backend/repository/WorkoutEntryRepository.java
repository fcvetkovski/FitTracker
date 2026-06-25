package mk.ukim.finki.wp.backend.repository;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.backend.model.WorkoutEntry;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutEntryRepository extends JpaRepository<WorkoutEntry, Long> {

    boolean existsByExerciseId(Long exerciseId);

    Optional<WorkoutEntry> findByIdAndWorkoutId(Long id, Long workoutId);

    @EntityGraph(attributePaths = {"exercise", "workout"})
    List<WorkoutEntry> findAll();
}
