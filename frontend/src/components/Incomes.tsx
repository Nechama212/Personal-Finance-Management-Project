import React, { useState } from 'react';
import { format } from 'date-fns';

interface Income {
  IncomeID: number;
  Description: string;
  Amount: number;
  Date: string;
  CategoryName: string;
}

const Incomes: React.FC<{ incomes: Income[], updateIncome: (income: Income) => void, deleteIncome: (id: number) => void, createIncome: (newIncome: Omit<Income, 'IncomeID'>) => void }> = ({ incomes, updateIncome, deleteIncome, createIncome }) => {
  const [newIncome, setNewIncome] = useState<Omit<Income, 'IncomeID'>>({ Description: '', Amount: 0, Date: '', CategoryName: '' });
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  };

  const startEditing = (income: Income) => {
    setEditingIncome(income);
  };

  console.log("Rendering Incomes:", incomes);

  return (
    <div>
      <h2>Incomes</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {incomes.map(income => (
          <li key={income.IncomeID} style={{ marginBottom: '20px' }}>
            <strong>Date:</strong> {format(new Date(income.Date), 'dd-MM-yyyy')}, <strong>Description:</strong> {income.Description}, <strong>Amount:</strong> ₪{income.Amount}, <strong>Category:</strong> {income.CategoryName}
            <div>
              <button onClick={() => startEditing(income)}>Update</button>
              <button onClick={() => deleteIncome(income.IncomeID)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
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
        <button type="submit">{editingIncome ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default Incomes;
