import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

function Users() {
  const [users, setUsers] = useState([]);
  const endpoint = `${API_BASE}/users/`;

  useEffect(() => {
    console.log('[Users] endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Users] fetched data:', data);
        const results = Array.isArray(data) ? data : data?.results || [];
        setUsers(results);
      })
      .catch((error) => console.error('[Users] fetch error:', error));
  }, [endpoint]);

  return (
    <div className="container py-3">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul className="list-group">
          {users.map((item, idx) => (
            <li key={item.id || idx} className="list-group-item">
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
