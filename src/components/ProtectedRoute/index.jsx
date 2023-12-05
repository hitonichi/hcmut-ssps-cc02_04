import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(user.role)) {
    return <div>You are not authorized to view this page</div>;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
