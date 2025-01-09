import React, { useEffect, useState } from 'react';
import './Analytics.css';
import ExpensesByCategoryChart from './ExpensesByCategoryChart';
import ExpensesByMonthChart from './ExpensesByMonthChart';

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
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [userEmail, setUserEmail] = useState<string>('');

  // Fetch data when userEmail changes
  useEffect(() => {
    if (userEmail) {
      // Fetch expenses
      fetch(`/api/expenses/${userEmail}`)
        .then(response => response.json())
        .then((data: Expense[]) => setExpenses(data))
        .catch(error => console.error('Error fetching expenses:', error));

      // Fetch incomes
      fetch(`/api/incomes/${userEmail}`)
        .then(response => response.json())
        .then((data: Income[]) => setIncomes(data))
        .catch(error => console.error('Error fetching incomes:', error));
    }
  }, [userEmail]);

  // Calculate total expenses and incomes
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.Amount, 0);
  const totalIncomes = incomes.reduce((acc, income) => acc + income.Amount, 0);

  // Calculate savings or deficit (minus if expenses > incomes)
  const savings = totalIncomes - totalExpenses;

  // Display saving or deficit as a label
  const savingsLabel = savings >= 0 ? `Saving: ${savings.toFixed(2)}₪` : `Deficit: ${Math.abs(savings).toFixed(2)}₪`;

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      <label htmlFor="emailInput">Enter your email:</label>
      <input
        type="email"
        id="emailInput"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="example@example.com"
      />

      {/* Expense and Income Summary */}
      <div className="summary-container">
        <h2>Expense and Income Summary</h2>
        <div className="summary-box">
          <p>Total Expenses: {totalExpenses.toFixed(2)}₪</p>
          <p>Total Incomes: {totalIncomes.toFixed(2)}₪</p>
          <p>{savingsLabel}</p> {/* Displaying either "Saving" or "Deficit" */}
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart">
          <ExpensesByCategoryChart expensesByCategory={expenses} />
        </div>
        <div className="chart">
          <ExpensesByMonthChart monthlyExpenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;