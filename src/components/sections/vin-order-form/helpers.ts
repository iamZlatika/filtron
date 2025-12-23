export const getYearsByDecade = (): Record<string, number[]> => {
  const currentYear = new Date().getFullYear();
  const decades: Record<string, number[]> = {};

  // 2020-е
  const years2020s = [];
  for (let year = currentYear; year >= 2020; year--) {
    years2020s.push(year);
  }
  if (years2020s.length > 0) {
    decades["2020-е"] = years2020s;
  }

  // 2010-е
  const years2010s = [];
  for (let year = 2019; year >= 2010; year--) {
    years2010s.push(year);
  }
  decades["2010-е"] = years2010s;

  // 2000-е
  const years2000s = [];
  for (let year = 2009; year >= 2000; year--) {
    years2000s.push(year);
  }
  decades["2000-е"] = years2000s;

  // 1990-е
  const years1990s = [];
  for (let year = 1999; year >= 1990; year--) {
    years1990s.push(year);
  }
  decades["1990-е"] = years1990s;

  // 1980-е
  const years1980s = [];
  for (let year = 1989; year >= 1980; year--) {
    years1980s.push(year);
  }
  decades["1980-е"] = years1980s;

  return decades;
};

export const CAR_BRANDS: Record<string, string[]> = {
  A: ["Acura", "Alfa Romeo", "Audi", "Abarth", "Aston Martin"],
  B: ["Bentley", "BMW", "Buick", "BYD", "Brilliance"],
  C: ["Cadillac", "Chevrolet", "Chrysler", "Citroen", "Chery", "Cupra"],
  D: ["Dacia", "Daewoo", "Daihatsu", "Dodge", "DS"],
  F: ["Ferrari", "Fiat", "Ford"],
  G: ["Genesis", "GMC", "Geely", "Great Wall"],
  H: ["Honda", "Hummer", "Hyundai", "Haval"],
  I: ["Infiniti", "Isuzu", "Iveco"],
  J: ["Jaguar", "Jeep"],
  K: ["Kia"],
  L: ["Lada", "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln"],
  M: ["Maserati", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi", "McLaren"],
  N: ["Nissan"],
  O: ["Opel"],
  P: ["Peugeot", "Porsche"],
  R: ["Renault", "Rolls-Royce", "Rivian"],
  S: ["Saab", "Seat", "Skoda", "Subaru", "Suzuki", "Smart"],
  T: ["Tesla", "Toyota"],
  V: ["Volkswagen", "Volvo"],
  Z: ["Zotye"],
};
