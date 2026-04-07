import React, { useEffect, useState } from 'react';

function Activities() {
	const [activities, setActivities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`)
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch activities');
				return res.json();
			})
			.then((data) => {
				setActivities(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading activities...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>Activities</h2>
			<ul>
				{Array.isArray(activities) && activities.length > 0 ? activities.map((a) => (
					<li key={a.id}>{a.user?.username || a.user} - {a.workout?.name || a.workout} ({a.duration} min)</li>
				)) : <li>No activities found.</li>}
			</ul>
		</div>
	);
}

export default Activities;
