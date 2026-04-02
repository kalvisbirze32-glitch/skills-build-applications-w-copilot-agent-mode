import React, { useEffect, useState } from 'react';

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('https://verbose-goldfish-pj54pvx5pw5xh774x-8000.app.github.dev/api/leaderboard/')
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch leaderboard');
				return res.json();
			})
			.then((data) => {
				setLeaderboard(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading leaderboard...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>Leaderboard</h2>
			<ol>
				{Array.isArray(leaderboard) && leaderboard.length > 0 ? leaderboard.map((entry) => (
					<li key={entry.id}>{entry.user?.username || entry.user}: {entry.points} pts</li>
				)) : <li>No leaderboard data found.</li>}
			</ol>
		</div>
	);
}

export default Leaderboard;
