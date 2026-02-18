-- Legg til øvelser (basert på skjermbildene dine)
INSERT INTO Exercises (Title, Description, VideoFileName, ThumbnailFileName, Duration) VALUES
('Knebøy til 90 grader i kneledd', 'Stå med hoftebreddes avstand mellom føttene. Hold ryggen rett og bøy knærne til 90 grader.', 'kneboy-90-grader.mp4', 'kneboy-90-grader-thumb.jpg', 30),
('Stående foroverøy', 'Stå med føttene hoftebredt. Bøy deg forover fra hoften med rett rygg.', 'staende-foroverboy.mp4', 'staende-foroverboy-thumb.jpg', 30),
('Plukke epler med vektoverføring', 'Strekk armene opp som om du plukker epler. Overfør vekt fra side til side.', 'plukke-epler.mp4', 'plukke-epler-thumb.jpg', 30),
('Firfotstående diagonalhev', 'Start på alle fire. Hev motsatt arm og ben samtidig. Hold balansen.', 'diagonal-hev.mp4', 'diagonal-hev-thumb.jpg', 30);

-- Legg til sett for første øvelse (som i skjermbildet: 2 sett, 10 reps hver)
INSERT INTO ExerciseSets (ExerciseId, SetNumber, Repetitions) VALUES
(1, 1, 10),
(1, 2, 10);

-- Legg til sett for de andre øvelsene også
INSERT INTO ExerciseSets (ExerciseId, SetNumber, Repetitions) VALUES
(2, 1, 10),
(2, 2, 10),
(3, 1, 10),
(3, 2, 10),
(4, 1, 10),
(4, 2, 10);

-- Opprett treningsøkt (som i skjermbildet: "Korsrygg forebygging")
INSERT INTO Workouts (Title, Description, ScheduledDate, Duration) VALUES
('Korsrygg forebygging', 'Nyoppstatte ryggsmerter går som regel over av seg selv. Disse øvelsene kan hjelpe med forebygging.', '2026-02-11 15:46:00', 20);

-- Koble øvelser til økten
INSERT INTO WorkoutExercises (WorkoutId, ExerciseId, OrderIndex) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(1, 4, 4);

-- Nye øvelser (fortsetter Id-ene etter 4)
INSERT INTO Exercises (Title, Description, VideoFileName, ThumbnailFileName, Duration) VALUES
('Ryggliggende rotasjon av korsrygg',
 'Ligg på ryggen, bøy knærne og roter dem kontrollert fra side til side for å mobilisere korsryggen.',
 'ryggliggende-rotasjon-korsrygg.mp4',
 'ryggliggende-rotasjon-korsrygg-thumb.jpg',
 30),
('Firfotstående: sitt tilbake på heler',
 'Stå på alle fire og sitt rolig bakover mot hælene for å tøye korsrygg og hofter.',
 'firfotstaende-sitt-tilbake-pa-heler.mp4',
 'firfotstaende-sitt-tilbake-pa-heler-thumb.jpg',
 30);

-- Sett til de nye øvelsene (2 sett, 10 reps)
INSERT INTO ExerciseSets (ExerciseId, SetNumber, Repetitions) VALUES
(5, 1, 10),
(5, 2, 10),
(6, 1, 10),
(6, 2, 10);

-- Koble dem inn i samme treningsøkt "Korsrygg forebygging"
-- Forutsetter at denne fortsatt har Id = 1, og at eksisterende 4 øvelser har OrderIndex 1–4
INSERT INTO WorkoutExercises (WorkoutId, ExerciseId, OrderIndex) VALUES
(1, 5, 5),
(1, 6, 6);