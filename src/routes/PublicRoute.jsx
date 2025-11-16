import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);

  if (user) {
    if (user.role === 'student') return <Navigate to="/" />;
    if (user.role === 'recruiter') return <Navigate to="/admin/companies" />;
  }

  return children;
};

export default PublicRoute;
