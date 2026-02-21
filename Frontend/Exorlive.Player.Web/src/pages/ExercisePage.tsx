import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ExerciseDto } from "../types";
import { useWorkoutPlayer } from "../context/WorkoutPlayerContext";
import "../styles/ExercisePage.css";

const ExercisePage = () => {
  const navigate = useNavigate();
  const {
    queue,
    currentIndex,
    setCurrentIndex,
    toggleCompleted,
  } = useWorkoutPlayer();

  const currentId = queue[currentIndex];

  const [exercise, setExercise] = useState<ExerciseDto | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [tab, setTab] = useState<"now" | "history">("now");

  useEffect(() => {
    if (!currentId) return;

    const load = async () => {
      const res = await fetch(`/api/exercises/${currentId}`);
      if (!res.ok) return;
      const data: ExerciseDto = await res.json();
      setExercise(data);
      setIsPlaying(false);
    };

    load();
  }, [currentId]);

  const goToIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= queue.length) {
      navigate("/", { replace: true });
      return;
    }
    setCurrentIndex(newIndex);
    const nextId = queue[newIndex];
    navigate(`/exercises/${nextId}`, { replace: true });
  };

  const handleSkip = () => {
    goToIndex(currentIndex + 1);
  };

  const handleDone = () => {
    if (!currentId) return;
    toggleCompleted(currentId);
    goToIndex(currentIndex + 1);
  };

  if (!currentId || !exercise) {
    return <div className="page">Laster øvelse...</div>;
  }

  return (
    <div className="page exercise-page">
      <header className="topbar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <div className="topbar-spacer" />
        <button
          className="icon-button"
          onClick={() => setShowInfo((v) => !v)}
        >
          i
        </button>
      </header>

      <div className={`video-container ${isPlaying ? "playing" : "preview"}`}>
        {!isPlaying && (
          <>
            <div className="video-preview-image">
              <img src={exercise.thumbnailUrl} alt={exercise.title} />
            </div>
            <button
              className="play-overlay"
              onClick={() => setIsPlaying(true)}
            >
              ▶
            </button>
          </>
        )}

        {isPlaying && (
          <video
            src={exercise.videoUrl}
            controls
            autoPlay
            className="video-player"
          />
        )}
      </div>

      <section className="exercise-header">
        <h1 className="exercise-title">{exercise.title}</h1>
        <p className="exercise-subtitle">
          {exercise.description?.slice(0, 80)}...
        </p>

        {showInfo ? (
          <div className="info-section">
            <div className="info-tabs">
              <span className="info-tab-active">OVERSIKT</span>
            </div>
            <div className="info-body">
              <p>{exercise.description}</p>
            </div>
          </div>
        ) : (
          <div className="tabs">
            <button
              className={`tab ${tab === "now" ? "tab-active" : ""}`}
              onClick={() => setTab("now")}
            >
              Nå
            </button>
            <button
              className={`tab ${tab === "history" ? "tab-active" : ""}`}
              onClick={() => setTab("history")}
            >
              Treningshistorie
            </button>
          </div>
        )}
      </section>

      {!showInfo && (
        <section className="exercise-body">
          {tab === "now" && (
            <div className="sets-section">
              {exercise.sets.map((s) => (
                <div key={s.setNumber} className="set-card">
                  <div className="set-header">
                    <span>
                      Set {s.setNumber}/{exercise.sets.length}
                    </span>
                  </div>
                  <div className="set-body">
                    <div className="set-label">Repetisjoner</div>
                    <div className="set-value">{s.repetitions}</div>
                  </div>
                </div>
              ))}
              <button className="add-set-btn">+ Legg til sett</button>
            </div>
          )}

          {tab === "history" && (
            <div className="history-section">
              <p>Treningshistorikk vises her (ikke implementert).</p>
            </div>
          )}
        </section>
      )}

      <footer className="exercise-footer">
        <div className="footer-buttons">
          <button className="ghost-btn" onClick={handleSkip}>
            Hopp over
          </button>
          <button className="primary-btn" onClick={handleDone}>
            Utført
          </button>
        </div>

        <div className="stepper">
          {queue.map((_, i) => (
            <span
              key={i}
              className={`step-dot ${i === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default ExercisePage;