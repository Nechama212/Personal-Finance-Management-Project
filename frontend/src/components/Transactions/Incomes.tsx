import React, { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import CategorySelector from '../MonthlyBudget/CategorySelector'; // Import CategorySelector
import { Income, Category } from './TransactionsTypes';

const Incomes: React.FC<{ 
  incomes: Income[], 
  updateIncome: (income: Income) => void, 
  deleteIncome: (id: number) => void, 
  createIncome: (newIncome: Omit<Income, 'IncomeID'>) => void, 
  addCategory: (categoryName: string) => void,
  categories: string[],
  userEmail: string
}> = ({ incomes, updateIncome, deleteIncome, createIncome, addCategory, categories, userEmail }) => {
  const [newIncome, setNewIncome] = useState<Omit<Income, 'IncomeID'>>({ Description: '', Amount: 0, Date: '', CategoryName: '', UserEmail: userEmail });
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showForm, setShowForm] = useState(false); // state to show/hide form
  const [showAddCategory, setShowAddCategory] = useState(false); // Show add category form
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [incomeCategories, setIncomeCategories] = useState<string[]>(categories); // Add setIncomeCategories

  useEffect(() => {
    if (userEmail) {
      fetch(`/api/incomes/${userEmail}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Income[]) => {
          const categoryNames = [...new Set(data.map(income => income.CategoryName.toLowerCase()))];
          setIncomeCategories(categoryNames);
        })
        .catch(error => console.error('Error fetching income categories:', error));
    }
  }, [userEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingIncome) {
      setEditingIncome({ ...editingIncome, [name]: name === 'Amount' ? parseFloat(value) : value });
    } else {
      setNewIncome(prev => ({ ...prev, [name]: name === 'Amount' ? parseFloat(value) : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingIncome) {
      updateIncome({ ...editingIncome, CategoryName: selectedCategory || editingIncome.CategoryName });
      setEditingIncome(null);
    } else {
      if (!newIncome.Date) {
        setError("Date is required.");
        return;
      }

      if (isNaN(newIncome.Amount)) {
        setError("Amount must be a valid number.");
        return;
      }

      setError(null);
      createIncome({ ...newIncome, CategoryName: selectedCategory || newIncome.CategoryName });
      setNewIncome({ Description: '', Amount: 0, Date: '', CategoryName: '', UserEmail: userEmail });
    }
    setShowForm(false); // Close the form after submission
  };

  const startEditing = (income: Income) => {
    setEditingIncome(income);
    setShowForm(true); // Show form when editing an income
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
    if (newCategory && !incomeCategories.includes(newCategory.toLowerCase())) {
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
        setIncomeCategories([...incomeCategories, addedCategory.CategoryName.toLowerCase()]);
        setSelectedCategory(addedCategory.CategoryName.toLowerCase());
        setShowAddCategory(false);
        setNewCategory('');
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
  };

  const totalIncomes = useMemo(() => incomes.reduce((acc, income) => acc + income.Amount, 0), [incomes]);
  const formattedTotalIncomes = totalIncomes.toFixed(2); // Format to 2 decimal places

  return (
    <div>
      <h2>Incomes</h2>
      <button onClick={() => setShowForm(true)}>Add Income</button>
      {/* Scrollable table with adjusted height */}
      <div
        style={{
          overflowY: incomes.length > 10 ? 'auto' : 'visible',
          maxHeight: '400px', // Adjusted height to match Expenses table
        }}
      >
        <table style={{ width: '300px', borderCollapse: 'collapse' }}>
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
            {incomes.map(income => (
              <tr key={income.IncomeID}>
                <td>{format(new Date(income.Date), 'dd-MM-yyyy')}</td>
                <td>{income.Description}</td>
                <td>₪{income.Amount}</td>
                <td>{income.CategoryName}</td>
                <td>
                  <button onClick={() => startEditing(income)}>Update</button>
                  <button onClick={() => deleteIncome(income.IncomeID)}>Delete</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}><strong>Total</strong></td>
              <td><strong>₪{totalIncomes}</strong></td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <h3>{editingIncome ? 'Update Income' : 'Create Income'}</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label>
            <strong>Description:</strong>
            <input
              type="text"
              name="Description"
              value={editingIncome ? editingIncome.Description : newIncome.Description}
              onChange={handleChange}
            />
          </label>
          <label>
            <strong>Amount:</strong>
            <input
              type="number"
              name="Amount"
              value={editingIncome ? editingIncome.Amount : newIncome.Amount}
              onChange={handleChange}
            />
          </label>
          <label>
            <strong>Date:</strong>
            <input
              type="date"
              name="Date"
              value={editingIncome ? editingIncome.Date : newIncome.Date}
              onChange={handleChange}
            />
          </label>
          <label>
            <strong>Category:</strong>
            <CategorySelector 
              categories={[...incomeCategories.map(category => category.toLowerCase()), 'Other']} 
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
          <button type="submit">{editingIncome ? 'Update' : 'Create'}</button>
        </form>
      )}
    </div>
  );
};

export default Incomes;