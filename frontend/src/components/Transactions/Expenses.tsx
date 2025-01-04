import React, { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import CategorySelector from '../MonthlyBudget/CategorySelector'; // Import CategorySelector
import { Expense, Category } from './TransactionsTypes';

const Expenses: React.FC<{ 
  expenses: Expense[], 
  updateExpense: (expense: Expense) => void, 
  deleteExpense: (id: number) => void, 
  createExpense: (newExpense: Omit<Expense, 'ExpenseID'>) => void, 
  addCategory: (categoryName: string) => void,
  categories: string[],
  userEmail: string
}> = ({ expenses, updateExpense, deleteExpense, createExpense, addCategory, categories, userEmail }) => {
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'ExpenseID'>>({ Description: '', Amount: 0, Date: '', CategoryName: '' });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showForm, setShowForm] = useState(false); // state to show/hide form
  const [showAddCategory, setShowAddCategory] = useState(false); // Show add category form
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expenseCategories, setExpenseCategories] = useState<string[]>(categories); // Add setExpenseCategories

  useEffect(() => {
    if (userEmail) {
      fetch(`/api/expenses/${userEmail}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Expense[]) => {
          const categoryNames = [...new Set(data.map(expense => expense.CategoryName.toLowerCase()))];
          setExpenseCategories(categoryNames);
        })
        .catch(error => console.error('Error fetching expense categories:', error));
    }
  }, [userEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      updateExpense({ ...editingExpense, CategoryName: selectedCategory || editingExpense.CategoryName });
      setEditingExpense(null);
    } else {
      if (!newExpense.Date) {
        setError("Date is required.");
        return;
      }

      if (isNaN(newExpense.Amount)) {
        setError("Amount must be a valid number.");
        return;
      }

      setError(null);
      createExpense({ ...newExpense, CategoryName: selectedCategory || newExpense.CategoryName });
      setNewExpense({ Description: '', Amount: 0, Date: '', CategoryName: '' });
    }
    setShowForm(false); // Close the form after submission
  };

  const startEditing = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true); // Show form when editing an expense
  };

  const handleCategorySelect = (category: string) => {
    if (category === 'Other') {
      setShowAddCategory(true);
    } else {
      setSelectedCategory(category);
      setShowAddCategory(false);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory && !expenseCategories.includes(newCategory.toLowerCase())) {
      try {
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ CategoryName: newCategory, Email: userEmail }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error("Error creating category:", errorMessage);
          return;
        }

        const addedCategory = await response.json();
        setExpenseCategories([...expenseCategories, addedCategory.CategoryName.toLowerCase()]);
        setSelectedCategory(addedCategory.CategoryName.toLowerCase());
        setShowAddCategory(false);
        setNewCategory('');
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
  };

  const totalExpenses = useMemo(() => expenses.reduce((acc, expense) => acc + expense.Amount, 0), [expenses]);

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
            <strong>Category:</strong>
            <CategorySelector 
              categories={[...expenseCategories.map(category => category.toLowerCase()), 'Other']} 
              onSelect={handleCategorySelect} 
            />
          </label>
          {showAddCategory && (
            <div>
              <label>
                <strong>Add New Category:</strong>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="button" onClick={handleAddCategory}>Add Category</button>
              </label>
            </div>
          )}
          <button type="submit">{editingExpense ? 'Update' : 'Create'}</button>
        </form>
      )}
    </div>
  );
};

export default Expenses;
