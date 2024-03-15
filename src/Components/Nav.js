import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


const Navbar = () => {
    let username
    let role
    const userInfoString = Cookies.get('userInfo');
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString); // Parse JSON string from cookie
    username = userInfo.username; // Extract username attribute
    role = userInfo.role;
  }

  const handleLogout = () => {
    Cookies.remove('userInfo'); // Remove cookie on logout click
    window.location.reload(); // Reload page to reflect logout
  };

  return (
    <nav className="navbar">
        <div className='nav-brand-container'>
        <Link to="/" className="navbar-brand">Home</Link>
        {role === 'admin' && 
        <Link to="/admin" className="navbar-brand">Admin</Link>}
        </div>
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link">{username}</span>
            </li>
            <li className="nav-item">
              <button className="btn nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;
