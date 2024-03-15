import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';



const ProtectedRoute = ({ children, allowedRoles = ['admin'] }) => {
  const navigate = useNavigate();  
  useEffect(()=>{
    const user = JSON.parse(Cookies.get('userInfo') || null); // Default to empty object

    if (!user) {
      // Redirect if no user info
      navigate('/login');
    } else if (!allowedRoles.includes(user.role)) {
      // Redirect if role is not allowed
      navigate('/');
    }
  })

  return children;
};

export default ProtectedRoute;
