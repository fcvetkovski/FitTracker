package mk.ukim.finki.wp.backend.repository;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.backend.model.Exercise;
import mk.ukim.finki.wp.backend.model.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    Optional<Exercise> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);

    List<Exercise> findByNameContainingIgnoreCase(String name);

    List<Exercise> findByMuscleGroup(MuscleGroup muscleGroup);

    List<Exercise> findByMuscleGroupAndNameContainingIgnoreCase(MuscleGroup muscleGroup, String name);
}
