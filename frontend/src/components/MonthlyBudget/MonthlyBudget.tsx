import React, { useState, useEffect, FC } from 'react';
import CategorySelector from './CategorySelector';
import BudgetInput from './BudgetInput';
import { Expense, Budget } from './MonthlyBudgetTypes'; // Correct path

const MonthlyBudget: FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [monthlyBudgets, setMonthlyBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showBudgetForm, setShowBudgetForm] = useState<boolean>(false);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false); // Show add category form
  const [newCategory, setNewCategory] = useState<string>(''); // New category input

  useEffect(() => {
    if (userEmail) {
      fetch(`/api/expenses/${userEmail}`)
        .then(response => response.json())
        .then((data: Expense[]) => {
          const categoryNames = [...new Set(data.map(expense => expense.CategoryName.toLowerCase()))];
          setCategories(categoryNames);
          setExpenses(data);
        })
        .catch(error => console.error('Error fetching expense categories:', error));

      fetch(`/api/monthlyBudgets/${userEmail}`)
        .then(response => response.json())
        .then((data: Budget[]) => {
          if (Array.isArray(data)) {
            setMonthlyBudgets(data);
          } else {
            console.error('Error: Data is not an array', data);
          }
        })
        .catch(error => console.error('Error fetching budgets:', error));
    }
  }, [userEmail]);

  const handleCategorySelect = (category: string) => {
    if (category === 'Other') {
      setShowAddCategory(true);
    } else {
      setSelectedCategory(category.toLowerCase());
      setShowAddCategory(false);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory && !categories.includes(newCategory.toLowerCase())) {
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
        setCategories([...categories, addedCategory.CategoryName.toLowerCase()]);
        setSelectedCategory(addedCategory.CategoryName.toLowerCase());
        setShowAddCategory(false);
        setNewCategory('');
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
  };

  const handleBudgetSave = (amount: number) => {
    const categoryExists = monthlyBudgets.some(budget => budget.CategoryName.toLowerCase() === selectedCategory);
    if (categoryExists) {
      alert('Category already exists in your budgets.');
      return;
    }

    const data = {
      Email: userEmail,
      CategoryName: selectedCategory,
      BudgetAmount: parseFloat(amount.toString()),
      SpentAmount: 0,
      BudgetMonth: new Date().toISOString()
    };

    fetch('/api/monthlyBudgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => { throw new Error(error.error) });
        }
        return response.json();
      })
      .then(data => {
        alert('Budget saved successfully!');
        if (Array.isArray(monthlyBudgets)) {
          setMonthlyBudgets([...monthlyBudgets, data]);
        }
        setShowBudgetForm(false);
      })
      .catch(error => console.error('Error saving budget:', error));
  };

  const handleBudgetDelete = (budgetId: number) => {
    fetch(`/api/monthlyBudgets/${budgetId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setMonthlyBudgets(monthlyBudgets.filter(budget => budget.BudgetID !== budgetId));
        } else {
          console.error('Error deleting budget');
        }
      })
      .catch(error => console.error('Error deleting budget:', error));
  };

  const calculateSpentAmount = (categoryName: string) => {
    const lowerCategoryName = categoryName.toLowerCase();
    return expenses
      .filter(expense => expense.CategoryName.toLowerCase() === lowerCategoryName)
      .reduce((total, expense) => total + expense.Amount, 0);
  };

  const isOverBudget = (budget: Budget) => {
    const spentAmount = calculateSpentAmount(budget.CategoryName);
    return spentAmount > budget.BudgetAmount;
  };

  return (
    <div>
      <h2>Monthly Budget</h2>
      <input 
        type="email" 
        placeholder="Enter your email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)} 
      />
      {userEmail && (
        <>
          <button onClick={() => setShowBudgetForm(true)}>Create Monthly Budget</button>
          
          {showBudgetForm && (
            <div>
              <CategorySelector 
                categories={["Select Category", ...categories, "Other"]}
                onSelect={handleCategorySelect} 
              />
              {selectedCategory && selectedCategory !== "Select Category" && !showAddCategory && (
                <BudgetInput onSave={handleBudgetSave} />
              )}
              {showAddCategory && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter new category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button onClick={handleAddCategory}>Add Category</button>
                </div>
              )}
            </div>
          )}

          <h3>Your Monthly Budgets</h3>
          <ul>
            {Array.isArray(monthlyBudgets) && monthlyBudgets.map((budget, index) => (
              <li key={index}>
                {new Date(budget.BudgetMonth).toLocaleDateString()} - {budget.CategoryName}: ₪{budget.BudgetAmount} (Spent: ₪{calculateSpentAmount(budget.CategoryName)})
                <button onClick={() => handleBudgetDelete(budget.BudgetID)}>Delete</button>
                {isOverBudget(budget) && (
                  <p style={{ color: 'red' }}>Over budget!</p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MonthlyBudget;
