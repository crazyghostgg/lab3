import React, { useState } from "react";
import axios from "axios";

const WaterCalculator = () => {
  const [formData, setFormData] = useState({
    riverName: "Dnipro",
    Cbg: "", // Фонова концентрація
    Cd: "", // Концентрація стоків
    Qr: "", // Витрата річки
    Qd: "", // Витрата стоків
    n: "", // Коефіцієнт змішування
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Генерація синтетичних даних (Варіант 4)
  const generateSyntheticData = () => {
    const random = (min, max) => Math.random() * (max - min) + min;

    setFormData({
      riverName: "Random River " + Math.floor(Math.random() * 100),
      Cbg: random(0, 1).toFixed(3), // 0-1 мг/л
      Cd: random(0.1, 50).toFixed(2), // 0.1-50 мг/л
      Qr: random(1, 1000).toFixed(1), // 1-1000 м³/с
      Qd: random(0.01, 5).toFixed(3), // 0.01-5 м³/с
      n: random(1, 5).toFixed(2), // 1-5
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      // Конвертуємо рядки в числа
      const payload = {
        riverName: formData.riverName,
        Cbg: parseFloat(formData.Cbg),
        Cd: parseFloat(formData.Cd),
        Qr: parseFloat(formData.Qr),
        Qd: parseFloat(formData.Qd),
        n: parseFloat(formData.n),
      };

      const response = await axios.post(
        "http://localhost:5000/api/water/calc",
        payload
      );
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Помилка розрахунку");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
        Розрахунок змішування у воді (В4)
      </h2>

      <button
        type="button"
        onClick={generateSyntheticData}
        className="w-full mb-6 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        🎲 Згенерувати випадкові дані
      </button>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1">Назва річки</label>
          <input
            name="riverName"
            value={formData.riverName}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold">Cbg (фон, мг/л)</label>
            <input
              type="number"
              step="any"
              name="Cbg"
              value={formData.Cbg}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold">Cd (стік, мг/л)</label>
            <input
              type="number"
              step="any"
              name="Cd"
              value={formData.Cd}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold">Qr (річка, м³/с)</label>
            <input
              type="number"
              step="any"
              name="Qr"
              value={formData.Qr}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold">Qd (стік, м³/с)</label>
            <input
              type="number"
              step="any"
              name="Qd"
              value={formData.Qd}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold">
            n (коефіцієнт змішування)
          </label>
          <input
            type="number"
            step="any"
            name="n"
            value={formData.n}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold text-lg mt-2"
        >
          Розрахувати Cmax
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-bold text-lg mb-2 text-blue-800">
            📊 Результат розрахунку:
          </h3>
          <p>
            <strong>Cmax (Фінальна концентрація):</strong>{" "}
            {result.Cmax.toFixed(4)} мг/л
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Дата: {new Date(result.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default WaterCalculator;
