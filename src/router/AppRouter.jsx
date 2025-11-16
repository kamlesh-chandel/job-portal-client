import { Home } from '@/pages/Home';
import { Jobs } from '@/pages/Jobs';
import { Login } from '@/pages/Login';
import { Profile } from '@/pages/Profile';
import { Saved } from '@/pages/Saved';
import { Signup } from '@/pages/Signup';
import PublicRoute from '@/routes/PublicRoute';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout.jsx';
import RecruiterRoute from '../routes/RecruiterRoute.jsx';
import StudentRoute from '@/routes/StudentRoute.jsx';
import { AdminJobs } from '@/pages/admin/AdminJobs.jsx';
import { AdminCompanies } from '../pages/admin/AdminCompanies';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'signup',
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: 'jobs',
        element: (
          <StudentRoute>
            <Jobs />
          </StudentRoute>
        ),
      },
      {
        path: 'jobs/saved',
        element: (
          <StudentRoute>
            <Saved />
          </StudentRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <StudentRoute>
            <Profile />
          </StudentRoute>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <RecruiterRoute>
        <Layout />
      </RecruiterRoute>
    ),
    children: [
      { path: 'companies', element: <AdminCompanies /> },
      { path: 'jobs', element: <AdminJobs /> },
    ],
  },
]);
