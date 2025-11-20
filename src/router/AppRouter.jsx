import { Home } from '@/pages/Home';
import { Jobs } from '@/pages/Jobs';
import { Login } from '@/pages/Login';
import { Profile } from '@/pages/Profile';
import {  SavedJobs } from '@/pages/Saved';
import { Signup } from '@/pages/Signup';
import PublicRoute from '@/routes/PublicRoute';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout.jsx';
import { AdminJobs } from '@/pages/admin/AdminJobs.jsx';
import { AdminCompanies } from '../pages/admin/AdminCompanies';
import ProtectedRoute from '@/routes/ProtectedRoute';
import CompanyCreate from '@/pages/admin/CreateCompany.jsx';
import CreateJob from '@/pages/admin/CreateJob.jsx';
import { Applicants } from '@/pages/admin/Applicants.jsx';
import JobDescription from '@/pages/JobDescription.jsx';
import { EditProfile } from '@/pages/EditProfile.jsx';

export const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/signup',
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },

  {
    path: '/',
    element: (
      <ProtectedRoute roles={['student']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },

      {
        path: 'jobs',
        element: (
          <ProtectedRoute roles={['student']}>
            <Jobs />
          </ProtectedRoute>
        ),
      },
      {
        path: 'jobs/:id',
        element: (
          <ProtectedRoute roles={['student']}>
            <JobDescription />
          </ProtectedRoute>
        ),
      },
      {
        path: 'jobs/saved',
        element: (
          <ProtectedRoute roles={['student']}>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute roles={['student']}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/edit',
        element: (
          <ProtectedRoute roles={['student']}>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute roles={['recruiter']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'companies', element: <AdminCompanies /> },
      { path: 'jobs', element: <AdminJobs /> },
      { path: 'jobs/create', element: <CreateJob /> },
      {
        path: 'company/create',
        element: <CompanyCreate />,
      },
      {
        path: 'submission/applicants/:job_id',
        element: <Applicants />,
      },
    ],
  },
]);
