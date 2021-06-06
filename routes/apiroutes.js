const router = require("express").Router();
const { db } = require("../models/workout");
const Workout = require("../models/workout");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.get("/api/workouts/range", ({}, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
      .then((data) => {
        console.log("workout data", data);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
  router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(

      req.params.id,
      { $push: { exercises: req.body } }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });


module.exports = router;