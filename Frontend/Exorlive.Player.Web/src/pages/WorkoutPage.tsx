import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { WorkoutDetail } from "../types";
import ExerciseList from "../components/ExerciseList";
import WorkoutOptionsMenu from "../components/WorkoutOptionsMenu";
import { useWorkoutPlayer } from "../context/WorkoutPlayerContext";
import "../styles/WorkoutPage.css";

const DEFAULT_WORKOUT_ID = 1;

const WorkoutPage = () => {
    const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [showFinishDialog, setShowFinishDialog] = useState(false);

    const navigate = useNavigate();

    const {
        queue,
        setQueue,
        currentIndex,
        setCurrentIndex,
        completedIds,
        toggleCompleted,
        clearCompleted,
    } = useWorkoutPlayer();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/workouts/${DEFAULT_WORKOUT_ID}`);
                const data: WorkoutDetail = await res.json();
                setWorkout(data);

                // bygg kø av alle øvelser
                const ids = data.exercises.map((e) => e.exerciseId);
                setQueue(ids);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [setQueue]);

    if (loading || !workout) {
        return <div className="page">Laster økt...</div>;
    }

    const date = workout.scheduledDate
        ? new Date(workout.scheduledDate)
        : null;

    const hasCompleted = completedIds.length > 0;
    const allCompleted = completedIds.length === workout.exercises.length;

    const toggleSelectAll = () => {
        if (completedIds.length === workout.exercises.length) {
            clearCompleted();
        } else {
            workout.exercises.forEach((e) => {
                if (!completedIds.includes(e.exerciseId)) {

                    toggleCompleted(e.exerciseId);

                }
            });
        }
    };

    const handleStartOrFinish = () => {
        if (!workout) return;

        if (!hasCompleted) {
            // Start: ingen ferdig -> første øvelse
            setCurrentIndex(0);
            const firstId = workout.exercises[0].exerciseId;
            navigate(`/exercises/${firstId}`);
        } else {
            // Fullfør-flyt
            if (!allCompleted) {
                setShowFinishDialog(true);
            } else {
                // alle ferdig – her kan man evt. vise "økten er fullført"
                // for nå gjør jeg ingenting her
            }
        }
    };

    return (
        <div className="page workout-page">
            <header className="topbar">
                <button className="icon-button">&lt;</button>
                <div className="topbar-spacer" />
                <WorkoutOptionsMenu />
            </header>

            <section className="workout-header">
                <h1 className="workout-title">{workout.title}</h1>
                <p className="workout-description">{workout.description}</p>
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

            <ExerciseList
                exercises={workout.exercises}
                completedIds={completedIds}
                onToggleCompleted={toggleCompleted}
            />

            <footer className="workout-footer">
                <button className="flat-button" onClick={toggleSelectAll}>
                    Velg alle
                </button>
                <button className="primary-button" onClick={handleStartOrFinish}>
                    {hasCompleted ? "Fullfør" : "Start"}
                </button>
            </footer>

            {showFinishDialog && (
                <div className="dialog-backdrop" onClick={() => setShowFinishDialog(false)}>
                    <div
                        className="dialog"
                        onClick={(e) => e.stopPropagation()} // hindrer klik på bakgrunn i å boble
                    >
                        <h3>Er du sikker?</h3>
                        <p>
                            Alle øvelsene er ikke markert som ferdig. Avslutte økten likevel?
                        </p>
                        <div className="dialog-buttons">
                            <button onClick={() => setShowFinishDialog(false)}>
                                Tilbake
                            </button>
                            <button
                                className="primary-button"
                                onClick={() => {
                                    setShowFinishDialog(false);
                                    alert("Fullfør: ikke implementert ennå");
                                }}
                            >
                                Ja
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutPage;