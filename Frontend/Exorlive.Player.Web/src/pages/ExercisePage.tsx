import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ExerciseDto } from "../types";

const ExercisePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<ExerciseDto | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/exercises/${id}`);
      if (!res.ok) return;
      const data: ExerciseDto = await res.json();
      setExercise(data);
    };
    load();
  }, [id]);

  if (!exercise) return <div className="page">Laster øvelse...</div>;

  return (
    <div className="page exercise-page">
      <header className="topbar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
      </header>

      {/* Videoområde */}
      <div className={`video-container ${isPlaying ? "playing" : "preview"}`}>
        {!isPlaying && (
          <>
            {/* liten topp med to stillbilder */}
            <div className="video-preview-images">
              <img src={exercise.thumbnailUrl} alt={exercise.title} />
              <img src={exercise.thumbnailUrl} alt={exercise.title} />
            </div>

            {/* stor play-knapp overlay */}
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

      {/* Tittel og tekst */}
      <section className="exercise-header">
        <h1 className="exercise-title">{exercise.title}</h1>
        <p className="exercise-description">{exercise.description}</p>

        <div className="tabs">
          <button className="tab tab-active">Nå</button>
          <button className="tab">Treningshistorie</button>
        </div>
      </section>

      {/* Sett-listen */}
      <section className="sets-section">
        {exercise.sets.map((s) => (
          <div key={s.setNumber} className="set-card">
            <div className="set-header">
              <span>Set {s.setNumber}/{exercise.sets.length}</span>
              <button className="set-remove">✕</button>
            </div>
            <div className="set-body">
              <div className="set-label">Repetisjoner</div>
              <div className="set-value">{s.repetitions}</div>
            </div>
          </div>
        ))}

        <button className="add-set-btn">+ Legg til sett</button>
      </section>

      {/* Navigasjonsknapper nederst */}
      <footer className="exercise-footer">
        <button className="ghost-btn">Hopp over</button>
        <button className="primary-btn">Utført</button>
      </footer>
    </div>
  );
};

export default ExercisePage;