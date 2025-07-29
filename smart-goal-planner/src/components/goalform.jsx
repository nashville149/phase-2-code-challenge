import { useState } from 'react';
import { addGoal } from '../services/api';

function GoalForm({ refreshGoals }) {
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addGoal({
      ...goal,
      targetAmount: Number(goal.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    });
    setGoal({ name: '', targetAmount: '', category: '', deadline: '' });
    refreshGoals();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      <input name="name" placeholder="Goal Name" value={goal.name} onChange={handleChange} required />
      <input name="targetAmount" type="number" placeholder="Target Amount" value={goal.targetAmount} onChange={handleChange} required />
            <select name="category" value={goal.category} onChange={handleChange} required>
        <option value="" disabled>Select Category</option>
        <option value="Savings">Savings</option>
        <option value="Travel">Travel</option>
        <option value="Investment">Investment</option>
        <option value="Retirement">Retirement</option>
      </select>
      <input name="deadline" type="date" value={goal.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
