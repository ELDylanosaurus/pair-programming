export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

export function calculateProRataVacationDays(employment: Employment): number {
  const { startDate, untilDate, percentage, vacationDays } = employment;

  const isLeapYear = (year: number): boolean =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const year = startDate.getFullYear();
  const totalDaysInYear = isLeapYear(year) ? 366 : 365;

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysWorked = Math.floor((untilDate.getTime() - startDate.getTime()) / msPerDay) + 1;

  const proRata = (daysWorked / totalDaysInYear) * (percentage / 100);

  return vacationDays * proRata;
}