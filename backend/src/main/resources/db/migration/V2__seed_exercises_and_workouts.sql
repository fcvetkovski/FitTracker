INSERT INTO exercise (id, name, muscle_group, type, description) VALUES
    (1, 'Bench Press', 'CHEST', 'STRENGTH', 'Barbell press performed on a flat bench.'),
    (2, 'Squat', 'LEGS', 'STRENGTH', 'Barbell back squat for lower body strength.'),
    (3, 'Deadlift', 'BACK', 'STRENGTH', 'Hip hinge compound lift from the floor.'),
    (4, 'Overhead Press', 'SHOULDERS', 'STRENGTH', 'Standing barbell press from shoulders to overhead.'),
    (5, 'Pull Up', 'BACK', 'BODYWEIGHT', 'Bodyweight vertical pulling exercise.'),
    (6, 'Barbell Row', 'BACK', 'STRENGTH', 'Bent-over row for upper back strength.'),
    (7, 'Plank', 'CORE', 'BODYWEIGHT', 'Isometric core hold.'),
    (8, 'Treadmill Run', 'CARDIO', 'CARDIO', 'Indoor running cardio session.');

INSERT INTO workout (id, name, date, notes) VALUES
    (1, 'Push Strength', CURRENT_DATE - INTERVAL '6 days', 'Focused on chest and shoulders.'),
    (2, 'Lower Body Strength', CURRENT_DATE - INTERVAL '4 days', 'Heavy squat day.'),
    (3, 'Pull Strength', CURRENT_DATE - INTERVAL '2 days', 'Back-focused workout.'),
    (4, 'Conditioning And Core', CURRENT_DATE - INTERVAL '1 day', 'Short cardio and core session.');

INSERT INTO workout_entry (id, workout_id, exercise_id, sets, reps, weight) VALUES
    (1, 1, 1, 4, 8, 80.0),
    (2, 1, 4, 3, 8, 45.0),
    (3, 2, 2, 5, 5, 120.0),
    (4, 2, 3, 3, 5, 140.0),
    (5, 3, 5, 4, 8, 0.0),
    (6, 3, 6, 4, 10, 70.0),
    (7, 4, 8, 1, 25, 0.0),
    (8, 4, 7, 3, 60, 0.0);

SELECT setval(pg_get_serial_sequence('exercise', 'id'), (SELECT MAX(id) FROM exercise));
SELECT setval(pg_get_serial_sequence('workout', 'id'), (SELECT MAX(id) FROM workout));
SELECT setval(pg_get_serial_sequence('workout_entry', 'id'), (SELECT MAX(id) FROM workout_entry));
