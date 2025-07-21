// src/App.jsx
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/goals';

function App() {
  const [goals, setGoals] = useState([]);
  const [newDeposit, setNewDeposit] = useState({ goalId: '', amount: '' });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setGoals(data);
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    const goal = goals.find(g => g.id === newDeposit.goalId);
    if (!goal) return;

    const updatedGoal = {
      ...goal,
      savedAmount: Number(goal.savedAmount) + Number(newDeposit.amount)
    };

    await fetch(`${API_URL}/${goal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
    });

    setNewDeposit({ goalId: '', amount: '' });
    fetchGoals();
  };

  const daysRemaining = (deadline) => {
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const isOverdue = (goal) => {
    return new Date(goal.deadline) < new Date() && goal.savedAmount < goal.targetAmount;
  };

  const isWarning = (goal) => {
    const days = daysRemaining(goal.deadline);
    return days <= 30 && goal.savedAmount < goal.targetAmount;
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>🎯 Smart Goal Planner</h1>

      <form onSubmit={handleDeposit} style={{ marginBottom: '2rem' }}>
        <h3>Make a Deposit</h3>
        <select
          value={newDeposit.goalId}
          onChange={e => setNewDeposit({ ...newDeposit, goalId: e.target.value })}
        >
          <option value="">Select Goal</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>{goal.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={newDeposit.amount}
          onChange={e => setNewDeposit({ ...newDeposit, amount: e.target.value })}
        />
        <button type="submit">Deposit</button>
      </form>

      <h2>Goals Overview</h2>
      {goals.map(goal => {
        const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
        return (
          <div key={goal.id} style={{ marginBottom: '1.5rem' }}>
            <h3>{goal.name}</h3>
            <p>Category: {goal.category}</p>
            <p>Target: ${goal.targetAmount} | Saved: ${goal.savedAmount}</p>
            <div style={{ background: '#ddd', height: '10px', width: '100%' }}>
              <div style={{ background: '#4caf50', height: '10px', width: `${progress}%` }} />
            </div>
            <p>
              {goal.savedAmount >= goal.targetAmount
                ? '✅ Goal Completed!'
                : isOverdue(goal)
                ? '❌ Overdue'
                : isWarning(goal)
                ? '⚠️ Deadline within 30 days!'
                : `${daysRemaining(goal.deadline)} days left`}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;

