import { deleteGoal } from '../services/api';

function GoalList({ goals, refreshGoals }) {
  const handleDelete = async (id) => {
    await deleteGoal(id);
    refreshGoals();
  };

  return (
    <div>
      <h2>Your Goals</h2>
      {goals.map(goal => {
        const progress = (goal.savedAmount / goal.targetAmount) * 100;
        const remaining = goal.targetAmount - goal.savedAmount;
        const deadline = new Date(goal.deadline);
        const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
        const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
        const isWarning = daysLeft <= 30 && goal.savedAmount < goal.targetAmount;

        return (
          <div key={goal.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{goal.name}</h3>
            <p>Category: {goal.category}</p>
            <p>Target: ${goal.targetAmount}</p>
            <p>Saved: ${goal.savedAmount}</p>
            <p>Remaining: ${remaining}</p>
            <progress value={progress} max="100" />
            <p>Deadline: {goal.deadline} ({daysLeft} days left)</p>
            {isWarning && !isOverdue && <p style={{ color: 'orange' }}>⚠️ Deadline approaching!</p>}
            {isOverdue && <p style={{ color: 'red' }}>❌ Overdue!</p>}
            {goal.savedAmount >= goal.targetAmount && <p style={{ color: 'green' }}>✅ Goal Complete!</p>}
            <button onClick={() => handleDelete(goal.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
