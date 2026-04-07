import React, { useEffect, useState } from 'react';

function Teams() {
	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`)
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch teams');
				return res.json();
			})
			.then((data) => {
				setTeams(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading teams...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>Teams</h2>
			<ul>
				{Array.isArray(teams) && teams.length > 0 ? teams.map((team) => (
					<li key={team.id}>{team.name}</li>
				)) : <li>No teams found.</li>}
			</ul>
		</div>
	);
}

export default Teams;
