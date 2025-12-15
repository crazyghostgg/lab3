const express = require("express");
const router = express.Router();
const WaterMixingCase = require("./WaterMixingCase");
const calculateWaterMixing = require("./waterCalculator");

// POST /api/water/calc
router.post("/calc", async (req, res) => {
  try {
    const inputData = req.body;

    // Розрахунок
    const results = calculateWaterMixing(inputData);

    // Збереження в БД
    const newRecord = new WaterMixingCase({
      ...inputData,
      ...results,
    });

    await newRecord.save();

    res.status(200).json({
      success: true,
      data: newRecord,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
