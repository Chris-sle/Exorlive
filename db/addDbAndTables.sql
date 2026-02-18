-- 1. Opprett databasen
CREATE DATABASE ExorliveDb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;/

-- 2. Bruk databasen
USE ExorliveDb;

-- 3. Opprett Exercises-tabellen
CREATE TABLE Exercises (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    VideoFileName VARCHAR(255), -- Filnavn som backend serverer, f.eks. "kneboy.mp4"
    ThumbnailFileName VARCHAR(255), -- Thumbnail-fil som backend serverer
    Duration INT, -- varighet i sekunder
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (Title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Opprett ExerciseSets-tabellen
CREATE TABLE ExerciseSets (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ExerciseId INT NOT NULL,
    SetNumber INT NOT NULL,
    Repetitions INT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ExerciseId) REFERENCES Exercises(Id) ON DELETE CASCADE,
    INDEX idx_exercise (ExerciseId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Opprett Workouts-tabellen
CREATE TABLE Workouts (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    ScheduledDate DATETIME,
    Duration INT, -- total varighet i minutter
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Opprett WorkoutExercises-tabellen
CREATE TABLE WorkoutExercises (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    WorkoutId INT NOT NULL,
    ExerciseId INT NOT NULL,
    OrderIndex INT NOT NULL,
    FOREIGN KEY (WorkoutId) REFERENCES Workouts(Id) ON DELETE CASCADE,
    FOREIGN KEY (ExerciseId) REFERENCES Exercises(Id) ON DELETE CASCADE,
    INDEX idx_workout (WorkoutId),
    INDEX idx_exercise (ExerciseId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;