interface Expense {
  Amount: number;
  Date: Date;
  CategoryName: string;
}

interface Income {
  Amount: number;
  Date: Date;
  CategoryName: string;
}

export const calculateMonthlySummary = (
  expenses: Expense[],
  incomes: Income[],
  month: number,
  year: number
): { totalExpenses: number; totalIncomes: number; balance: number } => {
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.Date);
    return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
  });

  const filteredIncomes = incomes.filter(income => {
    const incomeDate = new Date(income.Date);
    return incomeDate.getMonth() === month && incomeDate.getFullYear() === year;
  });

  const totalExpenses = filteredExpenses.reduce((acc, expense) => acc + expense.Amount, 0);
  const totalIncomes = filteredIncomes.reduce((acc, income) => acc + income.Amount, 0);
  const balance = totalIncomes - totalExpenses;

  return { totalExpenses, totalIncomes, balance };
};