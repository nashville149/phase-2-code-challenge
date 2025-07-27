import { useState } from 'react';
import { updateGoal } from '../services/api';

function Deposit({ goals, refreshGoals }) {
  const [deposit, setDeposit] = useState({ goalId: '', amount: '' });

  const handleChange = (e) => {
    setDeposit({ ...deposit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goal = goals.find(g => g.id === deposit.goalId);
    if (!goal) return;

    const newSavedAmount = Number(goal.savedAmount) + Number(deposit.amount);
    await updateGoal(goal.id, { savedAmount: newSavedAmount });

    setDeposit({ goalId: '', amount: '' });
    refreshGoals();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      <select name="goalId" value={deposit.goalId} onChange={handleChange} required>
        <option value="">Select Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>{goal.name}</option>
        ))}
      </select>
      <input name="amount" type="number" placeholder="Amount" value={deposit.amount} onChange={handleChange} required />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default Deposit;