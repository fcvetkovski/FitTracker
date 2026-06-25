package mk.ukim.finki.wp.backend.repository;

import java.util.List;
import mk.ukim.finki.wp.backend.model.Workout;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @EntityGraph(attributePaths = {"entries", "entries.exercise"})
    List<Workout> findAllByOrderByDateDesc();
}
