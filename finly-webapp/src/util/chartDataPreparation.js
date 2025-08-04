export const prepareIncomeChartData = (transactions) => {
  console.log('Received income data:', transactions); // Debug log

  if (!transactions || transactions.length === 0) {
    console.log('No transactions found');
    return [];
  }

  // Create a map to store daily totals
  const dailyTotals = new Map();

  // Sort transactions by date and calculate daily totals
  transactions.forEach((income) => {
    console.log('Processing income:', income); // Debug log for each income
    const date = income.date; // The date is already in ISO format from LocalDate
    const amount = parseFloat(income.amount); // Convert BigDecimal string to number
    console.log('Parsed date and amount:', { date, amount }); // Debug parsed values

    // Initialize or add to the daily total
    if (dailyTotals.has(date)) {
      dailyTotals.set(date, dailyTotals.get(date) + amount);
    } else {
      dailyTotals.set(date, amount);
    }
  });

  // Get the date range for the current month
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split('T')[0];
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split('T')[0];

  // Create a complete array of dates for the current month
  const allDates = [];
  const currentDate = new Date(firstDay);
  const endDate = new Date(lastDay);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    allDates.push({
      date: dateStr,
      amount: dailyTotals.get(dateStr) || 0
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return allDates;
};
