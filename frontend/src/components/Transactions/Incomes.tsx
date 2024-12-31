import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';

interface Income {
  IncomeID: number;
  Description: string;
  Amount: number;
  Date: string;
  CategoryName: string;
}

const Incomes: React.FC<{ incomes: Income[], updateIncome: (income: Income) => void, deleteIncome: (id: number) => void, createIncome: (newIncome: Omit<Income, 'IncomeID'>) => void, addCategory: (category: string) => void }> = ({ incomes, updateIncome, deleteIncome, createIncome, addCategory }) => {
  const [newIncome, setNewIncome] = useState<Omit<Income, 'IncomeID'>>({ Description: '', Amount: 0, Date: '', CategoryName: '' });
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showForm, setShowForm] = useState(false); // state to show/hide form

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      console.log("Updating income:", editingIncome);
      updateIncome(editingIncome);
      setEditingIncome(null);
    } else {
      console.log("Submitting new income:", newIncome);

      if (!newIncome.Date) {
        setError("Date is required.");
        return;
      }

      if (isNaN(newIncome.Amount)) {
        setError("Amount must be a valid number.");
        return;
      }

      setError(null);
      createIncome(newIncome);
      setNewIncome({ Description: '', Amount: 0, Date: '', CategoryName: '' });
    }
    setShowForm(false); // Close the form after submission
  };

  const startEditing = (income: Income) => {
    setEditingIncome(income);
    setShowForm(true); // Show form when editing an income
  };

  const handleAddCategory = () => {
    if (newCategory) {
      addCategory(newCategory);
      setNewCategory('');
    }
  };

  // Calculate total incomes amount
  const totalIncomes = useMemo(() => incomes.reduce((acc, income) => acc + income.Amount, 0), [incomes]);

  console.log("Rendering Incomes:", incomes);

  return (
    <div>
      <h2>Incomes</h2>
      <button onClick={() => setShowForm(true)}>Add Income</button>
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
            <strong>Category Name:</strong>
            <input
              type="text"
              name="CategoryName"
              value={editingIncome ? editingIncome.CategoryName : newIncome.CategoryName}
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
          <button type="submit">{editingIncome ? 'Update' : 'Create'}</button>
        </form>
      )}
    </div>
  );
};

export default Incomes;
