const mongoose = require("mongoose");

const WaterMixingCaseSchema = new mongoose.Schema({
  riverName: { type: String, default: "Dnipro" }, // Назва річки (опціонально)

  // Вхідні параметри
  Cbg: { type: Number, required: true }, // Фонова концентрація
  Cd: { type: Number, required: true }, // Концентрація у стоках
  Qr: { type: Number, required: true }, // Витрата річки
  Qd: { type: Number, required: true }, // Витрата стоків
  n: { type: Number, required: true }, // Коефіцієнт змішування

  // Результат
  Cmax: { type: Number }, // Фінальна концентрація

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WaterMixingCase", WaterMixingCaseSchema);
