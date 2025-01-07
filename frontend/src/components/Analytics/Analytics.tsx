import React, { useEffect, useState } from 'react';
import ExpensesSummary from './ExpensesSummary';
import IncomesSummary from './IncomesSummary';
import ExpensesByCategoryChart from './ExpensesByCategoryChart';
import ExpensesByMonthChart from './ExpensesByMonthChart'; // ייבוא רכיב הגרף הוצאות לפי חודשים
import AnalyticsMetrics from './AnalyticsMetrics';

interface Expense {
  ExpenseID: number;
  CategoryID: number;
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
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  useEffect(() => {
    if (userEmail) {
      // Fetch expenses
      fetch(`/api/expenses/${userEmail}`)
        .then(response => response.json())
        .then((data: Expense[]) => {
          console.log("Expenses data:", data);
          setExpenses(data);
        })
        .catch(error => console.error('Error fetching expenses:', error));

      // Fetch incomes
      fetch(`/api/incomes/${userEmail}`)
        .then(response => response.json())
        .then((data: Income[]) => {
          console.log("Incomes data:", data);
          setIncomes(data);
        })
        .catch(error => console.error('Error fetching incomes:', error));

      // Fetch analytics data
      fetch(`/api/analytics/${userEmail}`)
        .then(response => response.json())
        .then(data => {
          console.log("Analytics data:", data);
          setAnalytics(data);
        })
        .catch(error => console.error('Error fetching analytics:', error));

      // Fetch categories
      fetch(`/api/categories/`)
        .then(response => response.json())
        .then(data => {
          console.log("Categories data:", data);
          setCategories(data);  // Save categories to state
        })
        .catch(error => console.error('Error fetching categories:', error));
    }
  }, [userEmail]);

  const monthlyExpenses = analytics.filter(item => item.Metric === 'monthly_expenses');

  // Group expenses by category for the pie chart
  const expensesByCategory = expenses.reduce<Record<string, number>>((acc, expense) => {
    
    const category = categories.find(cat => cat.CategoryID === expense.CategoryID);
    const categoryName = category ? category.CategoryName : `Category ${expense.CategoryID}`; // אם לא מצאנו, נשתמש בשם "Category {ID}"
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += expense.Amount;
    return acc;
  }, {});

  const expensesByCategoryArray = Object.entries(expensesByCategory).map(([CategoryName, Amount]) => ({ CategoryName, Amount }));

  return (
    <div className="analytics">
      <h1>Analytics</h1>
      <label htmlFor="emailInput">Enter your email:</label>
      <input
        type="email"
        id="emailInput"
        value={userEmail}
        onChange={handleEmailChange}
        placeholder="example@example.com"
      />
      <ExpensesSummary expenses={expenses} />
      <IncomesSummary incomes={incomes} />
      {/* Display Pie Chart for Expenses by Category */}
      <ExpensesByCategoryChart expensesByCategory={expensesByCategoryArray} />
      {/* Display Line Chart for Expenses by Month */}
      <ExpensesByMonthChart monthlyExpenses={monthlyExpenses} />
      <AnalyticsMetrics analytics={analytics} />
    </div>
  );
};

export default Analytics;