import { useEffect, useState } from 'react';
import { getGoals } from './services/api';
import GoalList from './components/goallist';
import GoalForm from './components/goalform';
import Deposit from './components/deposit';
import Overview from './components/overview';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const data = await getGoals();
    setGoals(data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>🎯 Smart Goal Planner</h1>
      </header>
      <main>
        <div className="main-content">
          <div className="forms-section">
            <Overview goals={goals} />
            <GoalForm refreshGoals={fetchGoals} />
            <Deposit goals={goals} refreshGoals={fetchGoals} />
          </div>
          <div className="goals-section">
            <GoalList goals={goals} refreshGoals={fetchGoals} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

