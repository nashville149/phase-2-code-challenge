import { useState } from 'react';
import { updateGoal, deleteGoal } from '../services/api';

function Goal({ goal, refreshGoals }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedGoal(goal);
  };

  const handleSave = async () => {
    await updateGoal(goal.id, editedGoal);
    setIsEditing(false);
    refreshGoals();
  };

  const handleDelete = async () => {
    await deleteGoal(goal.id);
    refreshGoals();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal({ ...editedGoal, [name]: value });
  };

  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;
  const deadline = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
  const isWarning = daysLeft <= 30 && goal.savedAmount < goal.targetAmount;

  return (
    <div className="goal">
      {isEditing ? (
        <div>
          <input type="text" name="name" value={editedGoal.name} onChange={handleChange} />
          <input type="number" name="targetAmount" value={editedGoal.targetAmount} onChange={handleChange} />
          <input type="text" name="category" value={editedGoal.category} onChange={handleChange} />
          <input type="date" name="deadline" value={editedGoal.deadline} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{goal.name}</h3>
          <p>Category: {goal.category}</p>
          <p>Target: ${goal.targetAmount}</p>
          <p>Saved: ${goal.savedAmount}</p>
          <p>Remaining: ${remaining > 0 ? remaining : 0}</p>
          <progress value={progress} max="100" />
          <p>Deadline: {goal.deadline} ({daysLeft} days left)</p>
          {isWarning && !isOverdue && <p className="warning">⚠️ Deadline approaching!</p>}
          {isOverdue && <p className="overdue">❌ Overdue!</p>}
          {goal.savedAmount >= goal.targetAmount && <p className="complete">✅ Goal Complete!</p>}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Goal;
