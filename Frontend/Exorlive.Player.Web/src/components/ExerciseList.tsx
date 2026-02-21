import { useNavigate } from "react-router-dom";
import type { WorkoutExerciseItem } from "../types";
import { useWorkoutPlayer } from "../context/WorkoutPlayerContext";

interface Props {
    exercises: WorkoutExerciseItem[];
    completedIds: number[];
    onToggleCompleted: (id: number) => void;
}

const ExerciseList = ({ exercises, completedIds, onToggleCompleted }: Props) => {
    const navigate = useNavigate();
    const { setCurrentIndex } = useWorkoutPlayer();

    const handleOpenExercise = (exerciseId: number) => {
        const index = exercises.findIndex((e) => e.exerciseId === exerciseId);
        if (index === -1) return;
        setCurrentIndex(index);
        navigate(`/exercises/${exerciseId}`);
    };

    return (
        <div className="exercise-list">
            {exercises.map((ex) => {
                const checked = completedIds.includes(ex.exerciseId);
                return (
                    <div key={ex.exerciseId} className="exercise-row">
                        <label className="exercise-radio-wrapper" onClick={e => e.stopPropagation()}>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggleCompleted(ex.exerciseId)}
                            />
                            <span className="exercise-radio-visual" />
                        </label>

                        <img className="exercise-thumb" src={ex.thumbnailUrl} alt={ex.title} />

                        <div
                            className="exercise-info"
                            onClick={() => handleOpenExercise(ex.exerciseId)}
                        >
                            <div className="exercise-title">{ex.title}</div>
                            <div className="exercise-meta">
                                {ex.totalSets} SETT, {ex.repetitionsPerSet} REPS
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExerciseList;