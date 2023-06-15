import React, { useState } from 'react';
import Style from '/styles/WorkoutContainer.module.css';

const Exercise = ({ exercise }) => {
  const [setsReps, setSetsReps] = useState({ sets: exercise.sets, reps: exercise.reps });
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  const handleSetsRepsChange = (event) => {
    const value = parseInt(event.target.value);
    const name = event.target.name;
    if (!isNaN(value) && value >= 0) {
      setSetsReps(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSaveClick = () => {
    setIsSaving(true);
  };
  

  return (
    <div>
    <h3 className={Style.h3}>{exercise.name}</h3>
    {editing ? (
      <div>
        <div>
          <label>Sets:</label>
          <input
            type="number"
            name="sets"
            value={setsReps.sets}
            onChange={handleSetsRepsChange}
            className={Style.inputBlack}
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            name="reps"
            value={setsReps.reps}
            onChange={handleSetsRepsChange}
            className={Style.inputBlack}
          />
        </div>
        {isSaving ? (
          <button className={Style.button}>Saving...</button>
        ) : (
          <button className={Style.button} onClick={handleSaveClick}>
            Save
          </button>
        )}
      </div>
    ) : (
      <div>
        <p className={Style.p}>
          {exercise.sets} {exercise.reps}
        </p>
        <button onClick={handleEditClick}>Edit</button>
      </div>
    )}
    <img src={exercise.imageUrl} alt={exercise.name} />
  </div>
  );
};

const WorkoutContainer = ({ workoutName, category }) => {
  const workout = category.find((workout) => workout.name === workoutName);
  const exercises = workout ? workout.exercises : [];

  return (
    <div className={Style.container}>
    <h2 className={Style.h2}>{workoutName}</h2>
    <div className={Style.exercisesContainer}>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <Exercise exercise={exercise} />
        </div>
      ))}
    </div>
    <div className={Style.buttonContainer}>
      <button className={Style.button}>Save</button>
    </div>
  </div>
  );
};

export default WorkoutContainer;
