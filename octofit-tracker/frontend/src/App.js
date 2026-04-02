import './App.css';
import { BrowserRouter as Router, NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="container my-4">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h1 className="card-title">Octofit Tracker</h1>
            <p className="card-text">React frontend connected to Django REST API with Codespace URL support.</p>
            <nav className="nav nav-pills flex-column flex-sm-row">
              <NavLink to="/activities" className="nav-link" activeclassname="active">
                Activities
              </NavLink>
              <NavLink to="/leaderboard" className="nav-link" activeclassname="active">
                Leaderboard
              </NavLink>
              <NavLink to="/teams" className="nav-link" activeclassname="active">
                Teams
              </NavLink>
              <NavLink to="/users" className="nav-link" activeclassname="active">
                Users
              </NavLink>
              <NavLink to="/workouts" className="nav-link" activeclassname="active">
                Workouts
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <Routes>
              <Route path="/" element={<Navigate to="/activities" replace />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/users" element={<Users />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
