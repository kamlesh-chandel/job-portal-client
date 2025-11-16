import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);

  if (!user || user.role !== 'student') {
    return <Navigate to="/" />;
  }

  return children;
};

export default StudentRoute;
