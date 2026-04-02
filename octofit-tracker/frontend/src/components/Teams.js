import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const endpoint = `${API_BASE}/teams/`;

  useEffect(() => {
    console.log('[Teams] endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Teams] fetched data:', data);
        const results = Array.isArray(data) ? data : data?.results || [];
        setTeams(results);
      })
      .catch((error) => console.error('[Teams] fetch error:', error));
  }, [endpoint]);

  return (
    <div className="container py-3">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <ul className="list-group">
          {teams.map((item, idx) => (
            <li key={item.id || idx} className="list-group-item">
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Teams;
