import React, { useEffect, useState } from 'react';
import './Analytics.css';
import ExpensesByCategoryChart from './ExpensesByCategoryChart';
import ExpensesByMonthChart from './ExpensesByMonthChart';
import { useUser } from '../../context/UserContext'; 

interface Expense {
  ExpenseID: number;
  CategoryID: number;
  CategoryName: string;
  Amount: number;
  Date: Date;
  Description?: string;
}

interface Income {
  IncomeID: number;
  Amount: number;
  Date: Date;
  Description?: string;
}

const Analytics: React.FC = () => {
  const { email } = useUser(); // Get email from context
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // Store selected month
  const [selectedYear, setSelectedYear] = useState<string>(''); // Store selected year

  // Fetch data when email is available
  useEffect(() => {
    if (email) {
      // Fetch expenses
      fetch(`/api/expenses/${email}`)
        .then(response => response.json())
        .then((data: Expense[]) => setExpenses(data))
        .catch(error => console.error('Error fetching expenses:', error));

      // Fetch incomes
      fetch(`/api/incomes/${email}`)
        .then(response => response.json())
        .then((data: Income[]) => setIncomes(data))
        .catch(error => console.error('Error fetching incomes:', error));
    }
  }, [email]);

  // Calculate total expenses and incomes
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.Amount, 0);
  const totalIncomes = incomes.reduce((acc, income) => acc + income.Amount, 0);

  // Calculate savings or deficit (minus if expenses > incomes)
  const savings = totalIncomes - totalExpenses;

  // Display saving or deficit as a label
  const savingsLabel = savings >= 0 ? `Saving: ${savings.toFixed(2)}₪` : `Deficit: ${Math.abs(savings).toFixed(2)}₪`;

  // Filter expenses based on selected month and year
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.Date);
    const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' });
    const expenseYear = expenseDate.getFullYear().toString();

    const isMonthMatch = selectedMonth ? expenseMonth === selectedMonth : true;
    const isYearMatch = selectedYear ? expenseYear === selectedYear : true;

    return isMonthMatch && isYearMatch;
  });

  // Extract unique months and years from expenses
  const uniqueMonths = Array.from(
    new Set(
      expenses.map((expense) =>
        new Date(expense.Date).toLocaleString('en-US', { month: 'long' })
      )
    )
  );

  const uniqueYears = Array.from(
    new Set(
      expenses.map((expense) => new Date(expense.Date).getFullYear().toString())
    )
  );

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      {email && (
        <>
          {/* Display Expense and Income Summary */}
          <div className="summary-container">
            <h2>Expense and Income Summary</h2>
            <div className="summary-box">
              <p>Total Expenses: {totalExpenses.toFixed(2)}₪</p>
              <p>Total Incomes: {totalIncomes.toFixed(2)}₪</p>
              <p>{savingsLabel}</p> {/* Displaying either "Saving" or "Deficit" */}
            </div>
          </div>

          {/* Month and Year selection */}
          <div className="filter-container">
            <div className="month-selector">
              <label htmlFor="month">Select Month:</label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {uniqueMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="year-selector">
              <label htmlFor="year">Select Year:</label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Display Charts */}
          <div className="charts-container">
            <div className="chart">
              <ExpensesByCategoryChart expensesByCategory={filteredExpenses} />
            </div>
            <div className="chart">
              <ExpensesByMonthChart monthlyExpenses={filteredExpenses} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;