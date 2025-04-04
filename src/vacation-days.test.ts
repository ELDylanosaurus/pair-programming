import { calculateProRataVacationDays, Employment } from "./vacation-days";

test("100% employment gives all vacation days", () => {
  const fullTime: Employment = {
    startDate: new Date("2025-01-01"),
    untilDate: new Date("2025-12-31"),
    percentage: 100,
    vacationDays: 25,
  };
  expect(calculateProRataVacationDays(fullTime)).toBe(25);
});

test("50% employment gives half vacation days", () => {
  const partTime: Employment = {
    startDate: new Date("2025-01-01"),
    untilDate: new Date("2025-12-31"),
    percentage: 50,
    vacationDays: 25,
  };
  expect(calculateProRataVacationDays(partTime)).toBe(12.5);
});

test("partial year 100% employment", () => {
  const shortTerm: Employment = {
    startDate: new Date("2025-01-01"),
    untilDate: new Date("2025-06-30"),
    percentage: 100,
    vacationDays: 25,
  };
  expect(calculateProRataVacationDays(shortTerm)).toBeCloseTo(12.4, 1);
});

test("partial year 70% employment", () => {
  const partShort: Employment = {
    startDate: new Date("2025-01-01"),
    untilDate: new Date("2025-03-31"),
    percentage: 70,
    vacationDays: 25,
  };
  expect(calculateProRataVacationDays(partShort)).toBeCloseTo(4.35, 1);
});