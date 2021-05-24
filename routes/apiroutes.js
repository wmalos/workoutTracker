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
app.get("/api/workouts/range", ({}, res) => {
  db.Workout.aggregate([
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
app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then((data) => {
        console.log("workout data", data);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(

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