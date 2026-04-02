import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `${API_BASE}/workouts/`;

  useEffect(() => {
    console.log('[Workouts] endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Workouts] fetched data:', data);
        const results = Array.isArray(data) ? data : data?.results || [];
        setWorkouts(results);
      })
      .catch((error) => console.error('[Workouts] fetch error:', error));
  }, [endpoint]);

  return (
    <div className="container py-3">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <ul className="list-group">
          {workouts.map((item, idx) => (
            <li key={item.id || idx} className="list-group-item">
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Workouts;
