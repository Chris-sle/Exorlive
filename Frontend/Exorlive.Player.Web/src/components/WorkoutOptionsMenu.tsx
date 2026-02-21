import { useState } from "react";

const WorkoutOptionsMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="options-wrapper">
      <button
        className="icon-button"
        onClick={() => setOpen((o) => !o)}
      >
        ⋮
      </button>

      {open && (
        <div className="options-menu">
          <button className="options-item">Legg til program til plan</button>
          <button className="options-item">Last ned som PDF</button>
        </div>
      )}
    </div>
  );
};

export default WorkoutOptionsMenu;