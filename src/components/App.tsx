import { Navigate, Route, Routes } from 'react-router';
import { routes } from '../logic/routes';

export function App() {
  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={<Navigate to={routes.utilities.path} replace />} />
          <Route {...routes.utilities} />
          <Route {...routes.recipes} />
        </Route>
      </Routes>
    </>
  );
}
