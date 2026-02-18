-- Se alle øvelser
SELECT * FROM Exercises;

-- Se øvelser med deres sett
SELECT 
    e.Id,
    e.Title,
    es.SetNumber,
    es.Repetitions
FROM Exercises e
LEFT JOIN ExerciseSets es ON e.Id = es.ExerciseId
ORDER BY e.Id, es.SetNumber;

-- Se treningsøkt med tilhørende øvelser
SELECT 
    w.Title AS WorkoutTitle,
    e.Title AS ExerciseTitle,
    we.OrderIndex
FROM Workouts w
JOIN WorkoutExercises we ON w.Id = we.WorkoutId
JOIN Exercises e ON we.ExerciseId = e.Id
ORDER BY we.OrderIndex;