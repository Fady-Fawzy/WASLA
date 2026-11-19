// Renders the WASLA starter shell and the reserved application routes.
import { Link, Route, Routes } from 'react-router';
import { plannedAreas } from './routes/plannedAreas.js';

export default function App() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>WASLA</h1>
              <p>Construction company management system</p>
              <nav aria-labelledby="planned-areas">
                <h2 id="planned-areas">Planned areas</h2>
                <ul>
                  {plannedAreas.map(({ path, label }) => (
                    <li key={path}><Link to={path}>{label}</Link></li>
                  ))}
                </ul>
              </nav>
            </>
          }
        />
        {plannedAreas.map(({ path, label }) => (
          <Route
            key={path}
            path={path}
            element={<RouteMessage heading={label} message="This area is planned for a later phase." />}
          />
        ))}
        <Route
          path="*"
          element={<RouteMessage heading="Page not found" message="This address has no page." />}
        />
      </Routes>
    </main>
  );
}

function RouteMessage({ heading, message }) {
  return (
    <>
      <h1>{heading}</h1>
      <p>{message}</p>
      <Link to="/">Back to WASLA</Link>
    </>
  );
}
