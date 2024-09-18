// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './UserLogin.css';

// const UserLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [userData, setUserData] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();


//   useEffect(() => {
//     const userToken = sessionStorage.getItem('userToken');
//     const user = sessionStorage.getItem('user');
    
//     if (userToken && user) {
//       setUserData({ token: userToken, token1: user });
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5678/addregister/login', formData);
//       console.log('API Response:', response.data);

//       const { email, password, regid } = response.data;
//       if (email && password) {
//         sessionStorage.setItem('userToken', email);
//         sessionStorage.setItem('user', password);
//         sessionStorage.setItem('regid', regid);
//         setUserData({ token: email, token1: password, token2: regid });

//         Swal.fire({
//           icon: 'success',
//           title: 'Login Successful',
//           text: 'Redirecting to search page...',
//           timer: 2000,
//           timerProgressBar: true,
//           willClose: () => navigate('/book')
//         });
//       } else {
//         console.error('Token or user is missing in the response');
//         Swal.fire({
//           icon: 'error',
//           title: 'Login Failed',
//           text: 'Invalid Username or Password.'
//         });
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Failed',
//         text: 'Invalid Username or Password.'
//       });
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem('userToken');
//     sessionStorage.removeItem('user');
//     setUserData(null);
//     navigate('/login');
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center vh-100 border bg-transparent" id='back'>
//       <div className="card shadow-sm" style={{ width: '400px' }}>
//         <div className="card-body">
//           <h3 className="text-center mb-4">User Login</h3>
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Username</label>
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               <i className="fas fa-sign-in-alt"></i> Login
//             </button>
//             <br />
//             <p className="mt-3 text-center">Don't have an account? <a href='/register'>Register Here</a></p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserLogin.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userToken = sessionStorage.getItem('userToken');
    const user = sessionStorage.getItem('user');
    
    if (userToken && user) {
      setUserData({ token: userToken, token1: user });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5678/addregister/login', formData);
      console.log('API Response:', response.data);

      const { email, password, regid, mobileno, username } = response.data;
      if (email && password) {
        sessionStorage.setItem('userToken', email);
        sessionStorage.setItem('user', password);
        sessionStorage.setItem('regid', regid);
        sessionStorage.setItem('mobileno',mobileno);
        sessionStorage.setItem('username', username);
        setUserData({ token: email, token1: password, token2: regid, token3: mobileno, token4: username});
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting to search page...',
          timer: 2000,
          timerProgressBar: true,
          willClose: () => navigate('/book')
        });
      } else {
        console.error('Token or user is missing in the response');
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid Username or Password.'
        });
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid Username or Password.'
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('user');
    setUserData(null);
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100" id='back'>
      <div className="card shadow-sm animate__animated animate__fadeIn" style={{ width: '400px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">User Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3 position-relative">
              <label htmlFor="email" className="form-label">Email ID</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
                <input
                  type="text"
                  id="email1"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  type="password"
                  id="password1"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100" style={{ background: 'linear-gradient(45deg, #007bff, #00d4ff)' }}>
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
            <br />
            <p className="mt-3 text-center">Don't have an account? <a href='/register'>Register Here</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
