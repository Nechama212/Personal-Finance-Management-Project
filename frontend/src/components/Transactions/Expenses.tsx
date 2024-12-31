import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';

interface Expense {
  ExpenseID: number;
  Description: string;
  Amount: number;
  Date: string;
  CategoryName: string;
}

const Expenses: React.FC<{ expenses: Expense[], updateExpense: (expense: Expense) => void, deleteExpense: (id: number) => void, createExpense: (newExpense: Omit<Expense, 'ExpenseID'>) => void, addCategory: (category: string) => void }> = ({ expenses, updateExpense, deleteExpense, createExpense, addCategory }) => {
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'ExpenseID'>>({ Description: '', Amount: 0, Date: '', CategoryName: '' });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showForm, setShowForm] = useState(false); // state to show/hide form

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
    setShowForm(false); // Close the form after submission
  };

  const startEditing = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true); // Show form when editing an expense
  };

  const handleAddCategory = () => {
    if (newCategory) {
      addCategory(newCategory);
      setNewCategory('');
    }
  };

  // Calculate total expenses amount
  const totalExpenses = useMemo(() => expenses.reduce((acc, expense) => acc + expense.Amount, 0), [expenses]);

  console.log("Rendering Expenses:", expenses);

  return (
    <div>
      <h2>Expenses</h2>
      <button onClick={() => setShowForm(true)}>Add Expense</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.ExpenseID}>
              <td>{format(new Date(expense.Date), 'dd-MM-yyyy')}</td>
              <td>{expense.Description}</td>
              <td>₪{expense.Amount}</td>
              <td>{expense.CategoryName}</td>
              <td>
                <button onClick={() => startEditing(expense)}>Update</button>
                <button onClick={() => deleteExpense(expense.ExpenseID)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}><strong>Total</strong></td>
            <td><strong>₪{totalExpenses}</strong></td>
            <td colSpan={2}></td>
          </tr>
        </tbody>
      </table>
      {showForm && (
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
          <label>
            <strong>Add New Category:</strong>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="button" onClick={handleAddCategory}>Add Category</button>
          </label>
          <button type="submit">{editingExpense ? 'Update' : 'Create'}</button>
        </form>
      )}
    </div>
  );
};

export default Expenses;
