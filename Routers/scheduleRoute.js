const express = require("express");
const router = express.Router();
const ScheduleModel = require("../models/SheduleForm"); // Correct spelling of "Model"

// Get all schedules
router.get("/schedules", async (req, res) => {
  try {
    const schedules = await ScheduleModel.find();
    res.json({ status: "success", data: schedules });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Add a new schedule
// Add a new schedule
router.post("/addSchedule", async (req, res) => {
  try {
    const {
      pName,
      cDate,
      B,
      BB,
      M,
      L,
      pCode,
      Grade,
      totalCube,
      Day7,
      Day14,
      Day28,
    } = req.body;

    const newSchedule = await ScheduleModel.create({
      pName,
      cDate,
      B,
      BB,
      M,
      L,
      pCode,
      Grade,
      totalCube,
      Day7,
      Day14,
      Day28,
    });

    res.json({
      status: "success",
      ...newSchedule.toObject(), 
    });
  } catch (error) {
    console.error("Error adding schedule:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});


// Delete a schedule
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ScheduleModel.findByIdAndDelete(id);

    res.json({ status: "success", message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Update a schedule
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    pName,
    cDate,
    B,
    BB,
    M,
    L,
    pCode,
    Grade,
    totalCube,
    Day7,
    Day14,
    Day28,
  } = req.body;

  try {
    const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
      id,
      {
        pName,
        cDate,
        B,
        BB,
        M,
        L,
        pCode,
        Grade,
        totalCube,
        Day7,
        Day14,
        Day28,
      },
      { new: true }
    );
    res.json({ status: "success", data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;
