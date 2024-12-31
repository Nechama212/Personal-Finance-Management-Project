import React, { useState, FC } from 'react';

interface BudgetInputProps {
  onSave: (amount: number) => void;
}

const BudgetInput: FC<BudgetInputProps> = ({ onSave }) => {
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(parseFloat(amount));
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default BudgetInput;
