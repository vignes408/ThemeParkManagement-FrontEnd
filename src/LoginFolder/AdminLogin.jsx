// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
  
//   const handleLogin = (event) => {
//     event.preventDefault();
    
//     // Check for default credentials
//     if (username === 'admin' && password === 'admin') {
//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful',
//         text: 'Redirecting to admin home...',
//         timer: 2000,
//         timerProgressBar: true,
//         showConfirmButton: false,
//       }).then(() => {
//         navigate('/adminhome');
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Credentials',
//         text: 'Please check your username and password.',
//       });
//     }
//   };

//   return (
//     <div className="login-container d-flex flex-column justify-content-center align-items-center vh-100" id='back'>
//       <div className="login-card card shadow-sm" style={{ width: '400px' }}>
//         <div className="card-body">
//           <h3 className="text-center mb-4">Admin Login</h3>
//           <form onSubmit={handleLogin}>
//             <div className="mb-3 position-relative">
//               <label htmlFor="username" className="form-label">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 className="form-control ps-5"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3 position-relative">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control ps-5"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               <i className="fas fa-sign-in-alt"></i> Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = (event) => {
    event.preventDefault();
    
    // Check for default credentials
    if (username === 'admin' && password === 'admin') {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Redirecting to admin home...',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate('/adminhome');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Credentials',
        text: 'Please check your username and password.',
      });
    }
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center vh-100" id='back'>
      <div className="login-card card shadow-sm animate__animated animate__fadeIn" style={{ width: '400px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Admin Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3 position-relative">
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
                <input
                  type="text"
                  id="user"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  id="pass"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100" style={{ background: 'linear-gradient(45deg, #007bff, #00d4ff)' }}>
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
