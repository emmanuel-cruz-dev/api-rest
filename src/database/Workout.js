const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
  try {
    return DB.workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);

    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewWorkout = (newWorkout) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`,
      };
    }

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);

    return newWorkout;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneWorkout = (workoutId, changes) => {
  const indexForUpdated = DB.workouts.findIndex(
    (workout) => workout.id == workoutId
  );

  if (!indexForUpdated === -1) return;

  const updatedWorkout = {
    ...DB.workouts[indexForUpdated],
    ...changes,
    updatedAt: new Date().toLocaleString("es-US", { timeZone: "UTC" }),
  };

  DB.workouts[indexForUpdated] = updatedWorkout;
  saveToDatabase(DB);
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDeleted = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (indexForDeleted === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    DB.workouts.splice(indexForDeleted, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
