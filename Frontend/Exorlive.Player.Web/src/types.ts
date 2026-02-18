export interface WorkoutSummary {
  id: number;
  title: string;
  description?: string;
  scheduledDate?: string;
  duration?: number;
}

export interface WorkoutExerciseItem {
  exerciseId: number;
  orderIndex: number;
  title: string;
  thumbnailUrl: string;
  totalSets: number;
  repetitionsPerSet?: number;
}

export interface WorkoutDetail {
  id: number;
  title: string;
  description?: string;
  scheduledDate?: string;
  duration?: number;
  exercises: WorkoutExerciseItem[];
}

export interface ExerciseDto {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  thumbnailUrl: string;
  videoUrl: string;
  sets: { setNumber: number; repetitions: number }[];
}