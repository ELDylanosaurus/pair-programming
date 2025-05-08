import { calculatePayslip, Salary } from "./payroll";

describe("calculate salary", () => {
    test("calculate salary for 16 year old with ALV and NBU", () => {
        const salary: Salary = {
            born: new Date("2009-01-01"),
            payday: new Date("2025-05-08"),
            gross: 700
        }

        const result = calculatePayslip(salary);

        expect(result.net).toBeCloseTo(700 - 700 * 1.1 /100 - 700 * 0.73 / 100, 1)
    })
});