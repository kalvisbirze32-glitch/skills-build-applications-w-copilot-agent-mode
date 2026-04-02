import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const endpoint = `${API_BASE}/activities/`;

  useEffect(() => {
    console.log('[Activities] endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Activities] fetched data:', data);
        const results = Array.isArray(data) ? data : data?.results || [];
        setActivities(results);
      })
      .catch((error) => console.error('[Activities] fetch error:', error));
  }, [endpoint]);

  return (
    <div className="container py-3">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities available.</p>
      ) : (
        <ul className="list-group">
          {activities.map((item, idx) => (
            <li key={item.id || idx} className="list-group-item">
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Activities;
