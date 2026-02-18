import { useEffect, useState } from "react";
import ExerciseList from "../components/ExerciseList";
import type { WorkoutDetail } from "../types";

const DEFAULT_WORKOUT_ID = 1;

const WorkoutPage = () => {
    const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/workouts/${DEFAULT_WORKOUT_ID}`);
                const data: WorkoutDetail = await res.json();
                setWorkout(data);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading || !workout) {
        return <div className="page">Laster økt...</div>;
    }

    const date = workout.scheduledDate
        ? new Date(workout.scheduledDate)
        : null;

    return (
        <div className="page workout-page">
            <header className="topbar">
                <button className="icon-button">&lt;</button>
                <div className="topbar-spacer" />
                <button className="icon-button">⋮</button>
            </header>

            <section className="workout-header">
                <h1 className="workout-title">{workout.title}</h1>
                <p className="workout-description">
                    {workout.description}
                </p>
                <button className="link-button">Vis mer ▾</button>

                <div className="workout-meta-row">
                    <div className="meta-box">
                        <div className="meta-label">Dato</div>
                        <div className="meta-value">
                            {date
                                ? date.toLocaleDateString("no-NO", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                : "-"}
                        </div>
                    </div>
                    <div className="meta-box">
                        <div className="meta-label">Start-tid</div>
                        <div className="meta-value">
                            {date
                                ? date.toLocaleTimeString("no-NO", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : "--:--"}
                        </div>
                    </div>
                    <div className="meta-box">
                        <div className="meta-label">Varighet</div>
                        <div className="meta-value">
                            {workout.duration ? `${workout.duration} min` : "-"}
                        </div>
                    </div>
                </div>
            </section>

            <ExerciseList exercises={workout.exercises} />

            <footer className="workout-footer">
                <button className="flat-button">Velg alle</button>
                <button className="primary-button">Start</button>
            </footer>
        </div>
    );
};

export default WorkoutPage;