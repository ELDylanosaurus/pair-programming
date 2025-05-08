import { calculatePayslip, Salary, DEDUCTION_RATES } from "./payroll";

describe("calculate salary", () => {
    test("calculate salary for 16 year old with ALV and NBU", () => {
        const salary: Salary = {
            born: new Date("2009-01-01"),
            payday: new Date("2025-05-08"),
            gross: 700
        }
        const deductions = DEDUCTION_RATES.get("ALV") + DEDUCTION_RATES.get("NBU");

        const result = calculatePayslip(salary);


        expect(result.net).toBeCloseTo(salary.gross - salary.gross * deductions / 100, 1);
    })

    test("calculate salary for 18 year old with every deduction except PK", () => {
        const salary: Salary = {
            born: new Date("2007-01-01"),
            payday: new Date("2025-05-08"),
            gross: 1200
        }

        const result = calculatePayslip(salary);

        const deductions = 1.1 + 0.73 + 0.5 + 1.4 + 8.7;

        expect(result.net).toBeCloseTo(salary.gross - salary.gross * deductions / 100, 1)
    })

    test("calculate salary for 21 year old with every deduction", () => {
        const salary: Salary = {
            born: new Date("2004-01-01"),
            payday: new Date("2025-05-08"),
            gross: 5900
        }

        const result = calculatePayslip(salary);

        const deductions = 1.1 + 0.73 + 0.5 + 1.4 + 8.7 + 8.9;

        expect(result.net).toBeCloseTo(salary.gross - salary.gross * deductions / 100, 1)
    })
});