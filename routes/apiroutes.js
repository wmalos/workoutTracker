const router = require("express").Router();
const { db } = require("../models/workout");
const Workout = require("../models/workout");

router.get("/api/workouts", (req, res) => {
    Workout.aggregate( [
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration"}
            }
        },
    ]).then (data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})


module.exports = router;