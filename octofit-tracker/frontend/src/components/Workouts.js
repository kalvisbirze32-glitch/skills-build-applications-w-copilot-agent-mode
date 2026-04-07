import React, { useEffect, useState } from 'react';

function Workouts() {
	const [workouts, setWorkouts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`)
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch workouts');
				return res.json();
			})
			.then((data) => {
				setWorkouts(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading workouts...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>Workouts</h2>
			<ul>
				{Array.isArray(workouts) && workouts.length > 0 ? workouts.map((workout) => (
					<li key={workout.id}>{workout.name}: {workout.description}</li>
				)) : <li>No workouts found.</li>}
			</ul>
		</div>
	);
}

export default Workouts;
