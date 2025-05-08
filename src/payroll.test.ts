import { calculatePayslip, Salary } from "./payroll";

describe("calculateSalary", () => {
test("calculate Salary for 16 year old with ALV and NBU", () => {

  const salary: Salary = {
    born: new Date("2009-01-01"),
    payday: new Date("2025-05-08"),
    gross: 700
  };


  const result = calculatePayslip(salary);

  expect(result.net).toBe(700-700 * 1.1 / 100 + 700 * 0.73 / 100);

});

});