import React, { useState, useEffect } from 'react';
import Expenses from './Expenses';
import Incomes from './Incomes';
import { Expense, Income, Category } from './TransactionsTypes'; // Import interfaces from TransactionsTypes

const Transactions: React.FC = () => {
  const [email, setEmail] = useState("example@example.com");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<string[]>([]);

  useEffect(() => {
    if (email) {
      fetch(`/api/expenses/${email}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Expense[]) => {
          console.log(data);
          const categoryNames = [...new Set(data.map(expense => expense.CategoryName.toLowerCase()))];
          setExpenseCategories(categoryNames);
          setExpenses(data);
        })
        .catch(error => console.error('Error fetching expenses:', error));

      fetch(`/api/incomes/${email}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Income[]) => {
          console.log(data);
          const categoryNames = [...new Set(data.map(income => income.CategoryName.toLowerCase()))];
          setIncomeCategories(categoryNames);
          setIncomes(data);
        })
        .catch(error => console.error('Error fetching incomes:', error));
    }
  }, [email]);

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
      console.log("New Category:", newCategory);
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
      };

      console.log("Updating Expense Data:", completeExpense);

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
      console.log("Updated Expense:", updatedExpense);
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
      console.log("New Expense Data:", newExpense);
      if (!newExpense.Date || isNaN(new Date(newExpense.Date).getTime())) {
        throw new RangeError("Invalid time value");
      }

      const completeExpense = {
        ...newExpense,
        Email: email, // Use current email state
        Amount: parseFloat(newExpense.Amount as any), // Ensure amount is a number
        Date: new Date(newExpense.Date).toISOString(), // Update date format to ISO-8601
      };

      console.log("Creating expense:", completeExpense);

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
      console.log("Created Expense:", createdExpense);
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
      };

      const response = await fetch(`/api/incomes/${completeIncome.IncomeID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeIncome),
      });
      const updatedIncome = await response.json();
      console.log("Updated Income:", updatedIncome);
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
      console.log("New Income Data:", newIncome);
      if (!newIncome.Date || isNaN(new Date(newIncome.Date).getTime())) {
        throw new RangeError("Invalid time value");
      }

      const completeIncome = {
        ...newIncome,
        Email: email, // Use current email state
        Amount: parseFloat(newIncome.Amount as any), // Ensure amount is a number
        Date: new Date(newIncome.Date).toISOString(), // Update date format to ISO-8601
      };

      console.log("Creating income:", completeIncome);

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
      console.log("Created Income:", createdIncome);
      setIncomes([...incomes, createdIncome]);
    } catch (error) {
      console.error("Error creating income:", error);
    }
  };

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Expenses
          expenses={expenses}
          updateExpense={updateExpense}
          deleteExpense={deleteExpense}
          createExpense={createExpense}
          addCategory={(categoryName: string) => addCategory(categoryName, 'expense')}
          categories={expenseCategories} // Pass expense categories prop
          userEmail={email} // Pass user email
        />
        <Incomes
          incomes={incomes}
          updateIncome={updateIncome}
          deleteIncome={deleteIncome}
          createIncome={createIncome}
          addCategory={(categoryName: string) => addCategory(categoryName, 'income')}
          categories={incomeCategories} // Pass income categories prop
          userEmail={email} // Pass user email
        />
      </div>
    </div>
  );
};

export default Transactions;
