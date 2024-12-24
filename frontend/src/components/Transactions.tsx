import React, { useState, useEffect } from 'react';
import Expenses from './Expenses';
import Incomes from './Incomes';

interface Expense {
  ExpenseID: number;
  Description: string;
  Amount: number;
  Date: string;
  CategoryName: string;
}

interface Income {
  IncomeID: number;
  Description: string;
  Amount: number;
  Date: string;
  CategoryName: string;
}

const Transactions: React.FC = () => {
  const [email, setEmail] = useState("example@example.com");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`/api/expenses/${email}`);
        const data = await response.json();
        console.log("Fetched Expenses:", data);
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    const fetchIncomes = async () => {
      try {
        const response = await fetch(`/api/incomes/${email}`);
        const data = await response.json();
        console.log("Fetched Incomes:", data);
        setIncomes(data);
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    };

    fetchExpenses();
    fetchIncomes();
  }, [email]);

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
        />
        <Incomes
          incomes={incomes}
          updateIncome={updateIncome}
          deleteIncome={deleteIncome}
          createIncome={createIncome}
        />
      </div>
    </div>
  );
};

export default Transactions;
