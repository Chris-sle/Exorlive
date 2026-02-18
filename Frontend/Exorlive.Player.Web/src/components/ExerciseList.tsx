import type { WorkoutExerciseItem } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
    exercises: WorkoutExerciseItem[];
}

const ExerciseList = ({ exercises }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="exercise-list">
            {exercises.map((ex) => (
                <div
                    key={ex.exerciseId}
                    className="exercise-row"
                    onClick={() => navigate(`/exercises/${ex.exerciseId}`)}
                >
                    <div className="exercise-radio" />
                    <img src={ex.thumbnailUrl} className="exercise-thumb" />
                    <div className="exercise-info">
                        <div className="exercise-title">{ex.title}</div>
                        <div className="exercise-meta">
                            {ex.totalSets} SETT, {ex.repetitionsPerSet} REPS
                        </div>
                    </div>
                    <button className="icon-button more-button">⋮</button>
                </div>
            ))}
        </div>
    );
};

export default ExerciseList;