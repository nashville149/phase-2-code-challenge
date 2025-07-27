import Goal from './Goal';

function GoalList({ goals, refreshGoals }) {
  return (
    <div className="goal-list">
      <h2>Your Goals</h2>
      {goals.map(goal => (
        <Goal key={goal.id} goal={goal} refreshGoals={refreshGoals} />
      ))}
    </div>
  );
}

export default GoalList;

