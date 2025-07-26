const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const { mode } = req.query;

  try {
    const allWorkouts = workoutService.getAllWorkouts({ mode });
    res.json({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) return;

  const workout = workoutService.getOneWorkout(workoutId);
  res.json({ status: "OK", data: workout });
};

const createNewWorkout = (req, res) => {
  const { body } = req;

  if (
    !body ||
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    return res.status(400).json({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercices', 'trainerTips'",
      },
    });
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).json({ status: "OK", data: createdWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.json({ status: "OK", data: updatedWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).json({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
