const express = require("express");
const router = express.Router();
const FormModel = require("../models/formData");

// Route to add test data
router.post("/addTest", async (req, res) => {
  try {
    const {
      cName,
      cAddress,
      pName,
      address,
      tName,
      pId,
      gConcrete,
      DateOfReceipt,
      member,
      dateCasting,
      Building,
      TestingD,
      Level,
      Age,
      WitnessBy,
      SizeLength1,
      SizeLength2,
      SizeLength3,
      SizeWidth1,
      SizeWidth2,
      SizeWidth3,
      SizeHeight1,
      SizeHeight2,
      SizeHeight3,
      Weight1,
      Weight2,
      Weight3,
      Load1,
      Load2,
      Load3,
      CrossArea1,
      CrossArea2,
      CrossArea3,
      Density1,
      Density2,
      Density3,
      CompressiveStrength1,
      CompressiveStrength2,
      CompressiveStrength3,
      Remark1,
      Remark2,
      Remark3,
      Siteeng,
      CompressiveAvgStrength,
      RGN
    } = req.body;
    await FormModel.create({
      cName,
      cAddress,
      pName,
      address,
      tName,
      pId,
      gConcrete,
      DateOfReceipt,
      member,
      dateCasting,
      Building,
      TestingD,
      Level,
      Age,
      WitnessBy,
      SizeLength1,
      SizeLength2,
      SizeLength3,
      SizeWidth1,
      SizeWidth2,
      SizeWidth3,
      SizeHeight1,
      SizeHeight2,
      SizeHeight3,
      Weight1,
      Weight2,
      Weight3,
      Load1,
      Load2,
      Load3,
      CrossArea1,
      CrossArea2,
      CrossArea3,
      Density1,
      Density2,
      Density3,
      CompressiveStrength1,
      CompressiveStrength2,
      CompressiveStrength3,
      Remark1,
      Remark2,
      Remark3,
      Siteeng,
      CompressiveAvgStrength,
      RGN
    });
    res.json({ status: "success" });
  } catch (error) {
    console.error("Error adding test data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get test data
router.get("/getTestdata", async (req, res) => {
  try {
    const formData = await FormModel.find();
    res.json(formData);
  } catch (error) {
    console.error("Error fetching test data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/testdata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Find and update the document
    const updatedForm = await FormModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedForm) {
      return res.status(404).json({ error: 'Test data not found' });
    }

    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/testdata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForm = await FormModel.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ error: 'Test data not found' });
    }

    res.status(200).json({ message: 'Test data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
