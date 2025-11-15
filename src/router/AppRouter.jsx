import { Home } from '@/pages/Home';
import { Jobs } from '@/pages/Jobs';
import { Login } from '@/pages/Login';
import { Profile } from '@/pages/Profile';
import { Saved } from '@/pages/Saved';
import { Signup } from '@/pages/Signup';
import PublicRoute from '@/routes/PublicRoute';
import { createBrowserRouter } from 'react-router-dom';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element:
      <PublicRoute>
        <Signup />
      </PublicRoute>

  },
  {
    path: '/login',
    element:
      <PublicRoute>
        <Login />
      </PublicRoute>
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/jobs/saved',
    element: <Saved />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);
