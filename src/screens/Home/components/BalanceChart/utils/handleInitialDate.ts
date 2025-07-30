import * as dateFns from "date-fns";

export const handleInitialRangeDate = () => {
  const threeMonthsBefore = 3;
  const totalMonths = 11;
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth();
  const monthSubtraction = thisMonth - threeMonthsBefore;
  const rangeInThePastYear = monthSubtraction < 0;
  const fromYear = rangeInThePastYear ? thisYear - 1 : thisYear;
  const fromMonth = rangeInThePastYear
    ? totalMonths + monthSubtraction
    : thisMonth - monthSubtraction;
  const fromDay = 1;

  const from = new Date(fromYear, fromMonth, fromDay);
  const to = new Date(thisYear, thisMonth, dateFns.getDaysInMonth(new Date()));

  return { from, to };
};
