import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = sessionStorage.getItem('userToken');
    const user = sessionStorage.getItem('user');
    const name = sessionStorage.getItem('username');
    const mobile = sessionStorage.getItem('mobileno');

    if (userToken && user && name && mobile) {
      setUserData({ token: userToken, token1: user, token2: name, token3: mobile});
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('mobileno');
    setUserData(null);
    navigate('/');
  };

  const handleMyBookings = (e) => {
    e.preventDefault();
    navigate('/mybook');
  };

  return (
    <div className="profile-container">
            <nav className='navbar navbar-expand-lg bg-light fixed-top'>
                <div className='container-fluid'>
                    <a href="/" className="navbar-brand">
                        <img src='https://png.pngtree.com/png-clipart/20230914/original/pngtree-theme-park-vector-png-image_12147439.png' alt="Logo" className="logo" id='logoimg' />
                        <h6 className='text-dark' id='logoname'>WONDERLA</h6>
                    </a>
                </div>
                <div className="container-fluid justify-content-end" id="vicky">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-dark active" href="/mybook" onClick={handleMyBookings}>MY BOOKINGS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="/" onClick={handleLogout}>LOGOUT</a>
                        </li>
                    </ul>
                </div>
            </nav>
      {userData && (
        <div className="profile-card" id="profile-card">
          <div className="profile-header" id="profile-header">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" 
              alt="User Avatar" 
              className="profile-img" 
              id="profile-img"
            />
            <h3 id="user-welcome">Welcome back, {userData.token2}</h3>
          </div>
          <div className="profile-info" id="profile-info">
            <p><strong>Name: </strong>{userData.token2}</p>
            <p><strong>Email ID:</strong> {userData.token}</p>
            <p><strong>Mobile Number:</strong> {userData.token3}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
