const API_URL = 'http://localhost:3000/goals';

export const getGoals = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error('Failed to fetch goals');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const addGoal = async (goal) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goal)
    });
    if (!res.ok) {
      throw new Error('Failed to add goal');
    }
    return res.json();
  } catch (error) {
    console.error('Error adding goal:', error);
    throw error;
  }
};

export const deleteGoal = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error('Failed to delete goal');
    }
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

export const updateGoal = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error('Failed to update goal');
    }
    return res.json();
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};
