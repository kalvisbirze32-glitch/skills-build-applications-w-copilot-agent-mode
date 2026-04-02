import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const endpoint = `${API_BASE}/leaderboard/`;

  useEffect(() => {
    console.log('[Leaderboard] endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Leaderboard] fetched data:', data);
        const results = Array.isArray(data) ? data : data?.results || [];
        setLeaderboard(results);
      })
      .catch((error) => console.error('[Leaderboard] fetch error:', error));
  }, [endpoint]);

  return (
    <div className="container py-3">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No leaderboard records available.</p>
      ) : (
        <ul className="list-group">
          {leaderboard.map((item, idx) => (
            <li key={item.id || idx} className="list-group-item">
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;
