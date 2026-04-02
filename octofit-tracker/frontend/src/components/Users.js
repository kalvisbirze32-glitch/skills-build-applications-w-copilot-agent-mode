import React, { useEffect, useState } from 'react';

function Users() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('https://verbose-goldfish-pj54pvx5pw5xh774x-8000.app.github.dev/api/users/')
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch users');
				return res.json();
			})
			.then((data) => {
				setUsers(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading users...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>Users</h2>
			<ul>
				{Array.isArray(users) && users.length > 0 ? users.map((user) => (
					<li key={user.id}>{user.username} ({user.email})</li>
				)) : <li>No users found.</li>}
			</ul>
		</div>
	);
}

export default Users;
