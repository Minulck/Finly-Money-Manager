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

export const prepareExpenseChartData = (transactions) => {
  console.log('Received expense data:', transactions);

  if (!transactions || transactions.length === 0) {
    console.log('No expense transactions found');
    return [];
  }

  // Create a map to store daily totals
  const dailyTotals = new Map();

  // Sort transactions by date and calculate daily totals
  transactions.forEach((expense) => {
    const date = expense.date;
    const amount = parseFloat(expense.amount);

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

export const prepareBalanceChartData = (incomeData, expenseData, timePeriod = 'daily') => {
  console.log('Preparing balance chart data for period:', timePeriod);

  const incomeMap = new Map();
  const expenseMap = new Map();

  // Process income data
  if (incomeData && incomeData.length > 0) {
    incomeData.forEach((income) => {
      const date = income.date;
      const amount = parseFloat(income.amount);
      incomeMap.set(date, (incomeMap.get(date) || 0) + amount);
    });
  }

  // Process expense data
  if (expenseData && expenseData.length > 0) {
    expenseData.forEach((expense) => {
      const date = expense.date;
      const amount = parseFloat(expense.amount);
      expenseMap.set(date, (expenseMap.get(date) || 0) + amount);
    });
  }

  // Get date range based on time period
  const now = new Date();
  let startDate, endDate, dateKey;

  switch (timePeriod) {
    case 'weekly':
      // Get current week (Monday to Sunday)
      const currentDay = now.getDay();
      const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
      startDate = new Date(now.setDate(diff));
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      break;
    case 'monthly':
      // Get current year's months
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31);
      break;
    case 'daily':
    default:
      // Get current month's days
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
  }

  const balanceData = [];
  let runningBalance = 0;
  const processedDates = new Set();

  if (timePeriod === 'monthly') {
    // Group by months
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(now.getFullYear(), month, 1);
      const monthEnd = new Date(now.getFullYear(), month + 1, 0);
      const monthKey = `${now.getFullYear()}-${String(month + 1).padStart(2, '0')}`;

      let monthIncome = 0;
      let monthExpense = 0;

      // Calculate income for this month
      for (const [date, amount] of incomeMap) {
        const incomeDate = new Date(date);
        if (incomeDate >= monthStart && incomeDate <= monthEnd) {
          monthIncome += amount;
        }
      }

      // Calculate expense for this month
      for (const [date, amount] of expenseMap) {
        const expenseDate = new Date(date);
        if (expenseDate >= monthStart && expenseDate <= monthEnd) {
          monthExpense += amount;
        }
      }

      const monthBalance = monthIncome - monthExpense;
      runningBalance += monthBalance;

      balanceData.push({
        date: monthKey,
        amount: runningBalance,
        period: monthStart.toLocaleString('default', { month: 'short' })
      });
    }
  } else if (timePeriod === 'weekly') {
    // Group by weeks
    const currentDate = new Date(startDate);
    let weekNumber = 1;

    while (currentDate <= endDate) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekStart.getDate() + 6);

      let weekIncome = 0;
      let weekExpense = 0;

      // Calculate income for this week
      for (const [date, amount] of incomeMap) {
        const incomeDate = new Date(date);
        if (incomeDate >= weekStart && incomeDate <= weekEnd) {
          weekIncome += amount;
        }
      }

      // Calculate expense for this week
      for (const [date, amount] of expenseMap) {
        const expenseDate = new Date(date);
        if (expenseDate >= weekStart && expenseDate <= weekEnd) {
          weekExpense += amount;
        }
      }

      const weekBalance = weekIncome - weekExpense;
      runningBalance += weekBalance;

      balanceData.push({
        date: weekStart.toISOString().split('T')[0],
        amount: runningBalance,
        period: `Week ${weekNumber}`
      });

      currentDate.setDate(currentDate.getDate() + 7);
      weekNumber++;
    }
  } else {
    // Daily grouping
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayIncome = incomeMap.get(dateStr) || 0;
      const dayExpense = expenseMap.get(dateStr) || 0;
      const dayBalance = dayIncome - dayExpense;
      
      runningBalance += dayBalance;

      balanceData.push({
        date: dateStr,
        amount: runningBalance
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  console.log('Balance data prepared:', balanceData);
  return balanceData;
};
