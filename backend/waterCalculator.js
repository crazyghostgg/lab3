const calculateWaterMixing = (data) => {
  const { Cbg, Cd, Qr, Qd, n } = data;

  // Валідація згідно з методичкою
  if (Qr <= 0 || Qd <= 0)
    throw new Error("Витрати води (Qr, Qd) мають бути більше 0");
  if (Cbg < 0 || Cd < 0)
    throw new Error("Концентрації не можуть бути від'ємними");
  if (n <= 0) throw new Error("Коефіцієнт змішування (n) має бути більше 0");

  // Формула: (Cbg*Qr + Cd*Qd) / (n*Qr + Qd)
  const numerator = Cbg * Qr + Cd * Qd;
  const denominator = n * Qr + Qd;

  const Cmax = numerator / denominator;

  return { Cmax };
};

module.exports = calculateWaterMixing;
