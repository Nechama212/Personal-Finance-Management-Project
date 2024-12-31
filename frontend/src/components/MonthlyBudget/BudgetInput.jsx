import React, { useState } from 'react';

const BudgetInput = ({ onSave }) => {
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    onSave(amount);
  };

  return (
    <div>
      <label>Maximum amount for selected category</label>
      <input
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default BudgetInput;
