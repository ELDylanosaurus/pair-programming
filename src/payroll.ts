export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

function calcAge(born: Date, payday: Date): number {
  return payday.getFullYear() - born.getFullYear()
}

export function calculatePayslip(salary: Salary): Payslip {
  const age = calcAge(salary.born, salary.payday)

  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: salary.gross,
  };
  
  if (result.salary.gross * 12 >= 2500) {

    result.totalDeductions = DEDUCTION_RATES.get("ALV") + DEDUCTION_RATES.get("NBU");

  }
  if (age >= 17) {
    result.totalDeductions += DEDUCTION_RATES.get("AHV") + DEDUCTION_RATES.get("IV")+ DEDUCTION_RATES.get("EO");
  }
  if(result.salary.gross * 12 >= 22680) {
    result.totalDeductions += DEDUCTION_RATES.get("PK");
  }

  result.net = result.salary.gross - result.salary.gross * result.totalDeductions / 100;
  return result
}
