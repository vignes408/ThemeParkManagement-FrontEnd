// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './RegisterPage.css';

// function RegisterPage() {
//     const [inputData, setInputData] = useState({
//         username: '',
//         email: '',
//         mobileno: '',
//         password: '',
//         repassword: ''
//     });

//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();
//     const location = useLocation();
//     const flight = location.state?.flight;

//     const passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}/;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         let result = validateValues(inputData);

//         if (result === true) {
//             setLoading(true);
//             Swal.fire({
//                 title: 'Processing...',
//                 text: 'Please wait while we process your registration.',
//                 allowOutsideClick: false,
//                 onOpen: () => {
//                     Swal.showLoading();
//                 }
//             });

//             axios
//                 .post("http://localhost:5678/addregister", inputData)
//                 .then((res) => {
//                     setLoading(false);
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Registration Done Successfully!',
//                         text: 'Redirecting to login page...',
//                         timer: 2000,
//                         timerProgressBar: true,
//                         willClose: () => navigate("/userlogin")
//                     });
//                 })
//                 .catch((err) => {
//                     setLoading(false);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Registration Failed',
//                         text: 'An error occurred. Please try again.'
//                     });
//                     console.log(err);
//                 });
//         } else {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Validation Error',
//                 text: 'Please enter valid inputs!'
//             });
//         }
//     };

//     const validateValues = (inputData) => {
//         if (inputData.username.length === 0) {
//             Swal.fire('Error', 'Please enter a valid passenger name.', 'error');
//             return false;
//         } else if (inputData.email.length === 0 || !/\S+@\S+\.\S+/.test(inputData.email)) {
//             Swal.fire('Error', 'Please enter a valid email address.', 'error');
//             return false;
//         } else if (inputData.mobileno.length === 0) {
//             Swal.fire('Error', 'Please enter a valid mobile number.', 'error');
//             return false;
//         } else if (!passPattern.test(inputData.password)) {
//             Swal.fire('Error', 'Password must be between 6 to 20 characters, include at least one numeric digit, one uppercase letter, one lowercase letter, and one special character.', 'error');
//             return false;
//         } else if (inputData.password !== inputData.repassword) {
//             Swal.fire('Error', 'Passwords do not match.', 'error');
//             return false;
//         } else {
//             return true;
//         }
//     };

//     return (
//         <div className="register-page" id="add2">
//             <div className="form-container">
//                 <img src='https://as2.ftcdn.net/v2/jpg/05/47/85/29/1000_F_547852976_en8HiPl2E1jdTDWN9hGYITysQaE3U8sP.webp' alt="Registration Image" className="form-image"/>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="passname" className="form-label">User Name</label>
//                         <div className="input-group">
//                             <FontAwesomeIcon icon={faUser} className="input-icon" />
//                             <input
//                                 type="text"
//                                 name="username"
//                                 className="form-control"
//                                 placeholder="Enter User Name"
//                                 onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
//                             />
//                         </div>
//                     </div>
                    
//                     <div className="form-group">
//                         <label htmlFor="passusername" className="form-label">User Email ID</label>
//                         <div className="input-group">
//                             <FontAwesomeIcon icon={faUser} className="input-icon" />
//                             <input
//                                 type="text"
//                                 name="email"
//                                 className="form-control"
//                                 placeholder="Enter email Id"
//                                 onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
//                             />
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="email" className="form-label">Mobile Number:</label>
//                         <div className="input-group">
//                             <FontAwesomeIcon icon={faUser} className="input-icon" />
//                             <input
//                                 type="number"
//                                 name="mobileno"
//                                 placeholder="Enter your Mobile Number"
//                                 className="form-control"
//                                 onChange={(e) => setInputData({ ...inputData, mobileno: e.target.value })}
//                             />
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <div className="input-group">
//                             <FontAwesomeIcon icon={faLock} className="input-icon" />
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter Password"
//                                 className="form-control"
//                                 onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
//                             />
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="repassword" className="form-label">Re-Enter Password</label>
//                         <div className="input-group">
//                             <FontAwesomeIcon icon={faLock} className="input-icon" />
//                             <input
//                                 type="password"
//                                 name="repassword"
//                                 placeholder="Re-Enter Password"
//                                 className="form-control"
//                                 onChange={(e) => setInputData({ ...inputData, repassword: e.target.value })}
//                             />
//                         </div>
//                     </div>

//                     <button className="btn btn-info submit-button" type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default RegisterPage;


import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterPage.css';

function RegisterPage() {
    const [inputData, setInputData] = useState({
        username: '',
        email: '',
        mobileno: '',
        password: '',
        repassword: ''
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const flight = location.state?.flight;

    const passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}/;

    const handleSubmit = (e) => {
        e.preventDefault();
        let result = validateValues(inputData);

        if (result === true) {
            setLoading(true);
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we process your registration.',
                allowOutsideClick: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            });

            axios
                .post("http://localhost:5678/addregister", inputData)
                .then((res) => {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Done Successfully!',
                        text: 'Redirecting to login page...',
                        timer: 2000,
                        timerProgressBar: true,
                        willClose: () => navigate("/userlogin")
                    });
                })
                .catch((err) => {
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: 'An error occurred. Please try again.'
                    });
                    console.log(err);
                });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Validation Error',
                text: 'Please enter valid inputs!'
            });
        }
    };

    const validateValues = (inputData) => {
        if (inputData.username.length === 0) {
            Swal.fire('Error', 'Please enter a valid passenger name.', 'error');
            return false;
        } else if (inputData.email.length === 0 || !/\S+@\S+\.\S+/.test(inputData.email)) {
            Swal.fire('Error', 'Please enter a valid email address.', 'error');
            return false;
        } else if (inputData.mobileno.length === 0) {
            Swal.fire('Error', 'Please enter a valid mobile number.', 'error');
            return false;
        } else if (!passPattern.test(inputData.password)) {
            Swal.fire('Error', 'Password must be between 6 to 20 characters, include at least one numeric digit, one uppercase letter, one lowercase letter, and one special character.', 'error');
            return false;
        } else if (inputData.password !== inputData.repassword) {
            Swal.fire('Error', 'Passwords do not match.', 'error');
            return false;
        } else {
            return true;
        }
    };

    return (
        <div className="register-page" id="add2">
            <div className="form-container animate__animated animate__fadeIn">
                <img src='https://as2.ftcdn.net/v2/jpg/05/47/85/29/1000_F_547852976_en8HiPl2E1jdTDWN9hGYITysQaE3U8sP.webp' alt="Registration Image" className="form-image"/>
                <h3>Register Yourself</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="passname" className="form-label">User Name</label>
                        <div className="input-group">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                type="text"
                                name="username"
                                id="regform"
                                className="form-control"
                                placeholder="Enter User Name"
                                onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="passusername" className="form-label">User Email ID</label>
                        <div className="input-group">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                type="text"
                                name="email"
                                id="regform"
                                className="form-control"
                                placeholder="Enter email Id"
                                onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Mobile Number:</label>
                        <div className="input-group">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                type="number"
                                name="mobileno"
                                id="regform"
                                placeholder="Enter your Mobile Number"
                                className="form-control"
                                onChange={(e) => setInputData({ ...inputData, mobileno: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input
                                type="password"
                                id="regform"
                                name="password"
                                placeholder="Enter Password"
                                className="form-control"
                                onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="repassword" className="form-label">Re-Enter Password</label>
                        <div className="input-group">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input
                                type="password"
                                name="repassword"
                                id="regform"
                                placeholder="Re-Enter Password"
                                className="form-control"
                                onChange={(e) => setInputData({ ...inputData, repassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <button className="btn btn-info submit-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
