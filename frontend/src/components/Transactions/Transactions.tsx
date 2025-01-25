import React, { useState, useEffect } from 'react';
import Expenses from './Expenses';
import Incomes from './Incomes';
import { Expense, Income } from './TransactionsTypes'; // Import interfaces from TransactionsTypes
import { useUser } from '../../context/UserContext'; // Import the User context

const Transactions: React.FC = () => {
  const { email } = useUser(); // Get email from context
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<string[]>([]);

  // Fetch data when the email is available
  useEffect(() => {
    if (email) {
      // Fetch expenses
      fetch(`/api/expenses/${email}`)
        .then(response => response.json())
        .then((data: Expense[]) => {
          const categoryNames = [...new Set(data.map(expense => expense.CategoryName.toLowerCase()))];
          setExpenseCategories(categoryNames);
          setExpenses(data);
        })
        .catch(error => console.error('Error fetching expenses:', error));

      // Fetch incomes
      fetch(`/api/incomes/${email}`)
        .then(response => response.json())
        .then((data: Income[]) => {
          const categoryNames = [...new Set(data.map(income => income.CategoryName.toLowerCase()))];
          setIncomeCategories(categoryNames);
          setIncomes(data);
        })
        .catch(error => console.error('Error fetching incomes:', error));
    }
  }, [email]);

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      console.error("Invalid date value:", date);
      return '';
    }
    return d.toISOString().split('T')[0]; // Return date in "yyyy-MM-dd" format
  };

  const addCategory = async (categoryName: string, type: 'expense' | 'income') => {
    const endpoint = type === 'expense' ? '/api/categories/expense' : '/api/categories/income';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CategoryName: categoryName, Email: email }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error creating category:", errorMessage);
        return;
      }

      const newCategory = await response.json();
      if (type === 'expense') {
        setExpenseCategories([...expenseCategories, newCategory.name.toLowerCase()]);
      } else {
        setIncomeCategories([...incomeCategories, newCategory.name.toLowerCase()]);
      }
    } catch (error) {
      console.error(`Error creating ${type} category:`, error);
    }
  };

  const updateExpense = async (expense: Expense) => {
    try {
      const completeExpense = {
        ...expense,
        Email: email, // Use current email state
        Date: formatDate(expense.Date), // Format date to "yyyy-MM-dd"
      };

      if (!completeExpense.Date) {
        console.error("Invalid date for expense:", completeExpense);
        return;
      }

      const response = await fetch(`/api/expenses/${completeExpense.ExpenseID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeExpense),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error updating expense:", errorMessage);
        return;
      }

      const updatedExpense = await response.json();
      setExpenses(expenses.map(e => (e.ExpenseID === updatedExpense.ExpenseID ? updatedExpense : e)));
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });
      setExpenses(expenses.filter(e => e.ExpenseID !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const createExpense = async (newExpense: Omit<Expense, 'ExpenseID'>) => {
    try {
      if (!newExpense.Date || isNaN(new Date(newExpense.Date).getTime())) {
        console.error("Invalid date for expense:", newExpense.Date);
        return;
      }

      const completeExpense = {
        ...newExpense,
        Email: email, // Use current email state
        Amount: parseFloat(newExpense.Amount as any), // Ensure amount is a number
        Date: formatDate(newExpense.Date), // Format date to "yyyy-MM-dd"
      };

      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeExpense),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error creating expense:", errorMessage);
        return;
      }

      const createdExpense = await response.json();
      setExpenses([...expenses, createdExpense]);
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  const updateIncome = async (income: Income) => {
    try {
      const completeIncome = {
        ...income,
        Email: email, // Use current email state
        Date: formatDate(income.Date), // Format date to "yyyy-MM-dd"
      };

      const response = await fetch(`/api/incomes/${completeIncome.IncomeID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeIncome),
      });

      const updatedIncome = await response.json();
      setIncomes(incomes.map(i => (i.IncomeID === updatedIncome.IncomeID ? updatedIncome : i)));
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  const deleteIncome = async (id: number) => {
    try {
      await fetch(`/api/incomes/${id}`, {
        method: 'DELETE',
      });
      setIncomes(incomes.filter(i => i.IncomeID !== id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const createIncome = async (newIncome: Omit<Income, 'IncomeID'>) => {
    try {
      if (!newIncome.Date || isNaN(new Date(newIncome.Date).getTime())) {
        console.error("Invalid date for income:", newIncome.Date);
        return;
      }

      const completeIncome = {
        ...newIncome,
        Email: email, // Use current email state
        Amount: parseFloat(newIncome.Amount as any), // Ensure amount is a number
        Date: formatDate(newIncome.Date), // Format date to "yyyy-MM-dd"
      };

      const response = await fetch('/api/incomes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeIncome),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error creating income:", errorMessage);
        return;
      }

      const createdIncome = await response.json();
      setIncomes([...incomes, createdIncome]);
    } catch (error) {
      console.error("Error creating income:", error);
    }
  };

  return (
    <div>
      <h1>Transactions</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Expenses
          expenses={expenses}
          updateExpense={updateExpense}
          deleteExpense={deleteExpense}
          createExpense={createExpense}
          addCategory={(categoryName: string) => addCategory(categoryName, 'expense')}
          categories={expenseCategories}
          userEmail={email}
        />
        <Incomes
          incomes={incomes}
          updateIncome={updateIncome}
          deleteIncome={deleteIncome}
          createIncome={createIncome}
          addCategory={(categoryName: string) => addCategory(categoryName, 'income')}
          categories={incomeCategories}
          userEmail={email}
        />
      </div>
    </div>
  );
};

export default Transactions;