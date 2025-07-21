import { useState } from 'react';
import { updateGoal } from '../services/api';

function DepositForm({ goals, refreshGoals }) {
  const [goalId, setGoalId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selected = goals.find(g => g.id === goalId);
    if (!selected) return;
    const newAmount = parseFloat(selected.savedAmount) + parseFloat(amount);
    await updateGoal(goalId, { savedAmount: newAmount });
    setAmount('');
    setGoalId('');
    refreshGoals();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      <select value={goalId} onChange={(e) => setGoalId(e.target.value)} required>
        <option value="">Select a Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>{goal.name}</option>
        ))}
      </select>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
