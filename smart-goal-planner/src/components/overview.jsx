function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((acc, g) => acc + g.savedAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <div>
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Completed Goals: {completedGoals}</p>
    </div>
  );
}

export default Overview;
