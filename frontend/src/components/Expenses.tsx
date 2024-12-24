import React, { useState } from 'react';
import { format } from 'date-fns';

interface Expense {
  ExpenseID: number;
  Description: string;
  Amount: number;
  Date: string;
  CategoryName: string;
}

const Expenses: React.FC<{ expenses: Expense[], updateExpense: (expense: Expense) => void, deleteExpense: (id: number) => void, createExpense: (newExpense: Omit<Expense, 'ExpenseID'>) => void }> = ({ expenses, updateExpense, deleteExpense, createExpense }) => {
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'ExpenseID'>>({ Description: '', Amount: 0, Date: '', CategoryName: '' });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingExpense) {
      setEditingExpense({ ...editingExpense, [name]: name === 'Amount' ? parseFloat(value) : value });
    } else {
      setNewExpense(prev => ({ ...prev, [name]: name === 'Amount' ? parseFloat(value) : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingExpense) {
      console.log("Updating expense:", editingExpense);
      updateExpense(editingExpense);
      setEditingExpense(null);
    } else {
      console.log("Submitting new expense:", newExpense);

      if (!newExpense.Date) {
        setError("Date is required.");
        return;
      }

      if (isNaN(newExpense.Amount)) {
        setError("Amount must be a valid number.");
        return;
      }

      setError(null);
      createExpense(newExpense);
      setNewExpense({ Description: '', Amount: 0, Date: '', CategoryName: '' });
    }
  };

  const startEditing = (expense: Expense) => {
    setEditingExpense(expense);
  };

  console.log("Rendering Expenses:", expenses);

  return (
    <div>
      <h2>Expenses</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {expenses.map(expense => (
          <li key={expense.ExpenseID} style={{ marginBottom: '20px' }}>
            <strong>Date:</strong> {format(new Date(expense.Date), 'dd-MM-yyyy')}, <strong>Description:</strong> {expense.Description}, <strong>Amount:</strong> ₪{expense.Amount}, <strong>Category:</strong> {expense.CategoryName}
            <div>
              <button onClick={() => startEditing(expense)}>Update</button>
              <button onClick={() => deleteExpense(expense.ExpenseID)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h3>{editingExpense ? 'Update Expense' : 'Create Expense'}</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>
          <strong>Description:</strong>
          <input
            type="text"
            name="Description"
            value={editingExpense ? editingExpense.Description : newExpense.Description}
            onChange={handleChange}
          />
        </label>
        <label>
          <strong>Amount:</strong>
          <input
            type="number"
            name="Amount"
            value={editingExpense ? editingExpense.Amount : newExpense.Amount}
            onChange={handleChange}
          />
        </label>
        <label>
          <strong>Date:</strong>
          <input
            type="date"
            name="Date"
            value={editingExpense ? editingExpense.Date : newExpense.Date}
            onChange={handleChange}
          />
        </label>
        <label>
          <strong>Category Name:</strong>
          <input
            type="text"
            name="CategoryName"
            value={editingExpense ? editingExpense.CategoryName : newExpense.CategoryName}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{editingExpense ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default Expenses;
