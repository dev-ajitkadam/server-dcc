const express = require("express");
const router = express.Router();
const ScheduleModel = require("../models/SheduleForm");
const { status } = require("init");

// Get all schedules
router.get("/schedules", async (req, res) => {
  try {
    const schedules = await ScheduleModel.find();
    res.json({ status: "success", data: schedules });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

//Get one shedule
router.get("/schedules/:Tid", async (req, res) => {
  try {
    const { Tid } = req.params

    const schedules = await ScheduleModel.findById(Tid)
    res.json({ status: "success", data: schedules })
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message })
  }
})

router.get("/status/:Tid/:Days", async (req, res) => {
  try {
    const { Tid, Days } = req.params;

    const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
      Tid,
      { $set: { [Days]: "Completed" } },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ status: "error", message: "Schedule not found" });
    }

    res.status(200).json({ status: "success", data: updatedSchedule });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});



// Add a new schedule
router.post("/addSchedule", async (req, res) => {
  try {
    const {
      pName,
      t_id,
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
      Day7ID,
      Day14ID,
      Day28ID,
      Day7Date,
      Day14Date,
      Day28Date,
      siteEngName,
      siteEngEmail,
    } = req.body;

    const newSchedule = await ScheduleModel.create({
      pName,
      t_id,
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
      Day7ID,
      Day14ID,
      Day28ID,
      Day7Date,
      Day14Date,
      Day28Date,
      siteEngName,
      siteEngEmail,
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
    Day7ID,
    Day14ID,
    Day28ID,
    Day7Date,
    Day14Date,
    Day28Date,
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
        Day7ID,
        Day14ID,
        Day28ID,
        Day7Date,
        Day14Date,
        Day28Date,
      },
      { new: true }
    );
    res.json({ status: "success", data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

router.patch("/update-fields/:id/:days/:TestId", async (req, res) => {
  try {
    const { id, days, TestId } = req.params;

    const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
      id,
      { $set: { [days]: TestId } }, // Corrected dynamic field update
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ status: "error", message: "Schedule not found" });
    }

    res.status(200).json({ status: "success", data: updatedSchedule });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});



module.exports = router;
