import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useSelector(state => state.auth);

  if (!user || !roles.includes(user.role)) {
    return <Navigate to={user?.role === 'recruiter' ? '/admin/companies' : '/login'} />;
  }

  return children;
};

export default ProtectedRoute;
