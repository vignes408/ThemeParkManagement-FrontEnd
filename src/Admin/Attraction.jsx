import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaHome, FaInfoCircle, FaPlus, FaList, FaCog, FaCalendar, FaSignOutAlt, FaUser, FaTransgender, FaBriefcase, FaAlignLeft } from 'react-icons/fa';
import { MdAssignment, MdDashboard } from 'react-icons/md';
import 'sweetalert2/dist/sweetalert2.min.css';

function Attraction() {

    const [inputData, setInputData] = useState({
        email: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleLogout = () => {
        window.location.href = '/';
    };

    const handleBack = () => {
        navigate('/adminhome');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validateValues(inputData);

        if (result === true) {
            // Show loading spinner
            Swal.fire({
                title: 'Submitting...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            axios
                .post("http://localhost:5678/attract/addattract", inputData)
                .then((res) => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    console.log(res.data);
                })
                .catch((err) => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while adding data.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    console.log(err);
                });
        } else {
            Swal.fire({
                title: 'Invalid Input!',
                text: 'Please enter valid inputs!',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };

    const validateValues = (inputData) => {
        return inputData.email.length > 0 &&
               inputData.description.length > 0;
    };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-dark">
            <nav className="navbar navbar-expand-lg text-dark bg-light fixed-top">
                <a className="navbar-brand" href="/">WONDERLAA</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                        <button type="button" className="btn btn-dark" onClick={handleBack}>
                            <FaHome className="me-2" /> Back
                        </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-dark" onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="w-50 border rounded bg-light p-4 shadow-lg" id='rolehead'>
                <form onSubmit={handleSubmit}>
                    <h1 className="mb-4"><FaBriefcase /> Add Attraction Details</h1>
                    <div className="mb-3">
                        <label htmlFor="personname" className="form-label">
                            <FaUser className="me-2" /> Email ID
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter email id'
                            className="form-control"
                            onChange={(e) =>
                                setInputData({ ...inputData, email: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">
                            <FaInfoCircle className="me-2" /> Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            placeholder='Enter Description'
                            className="form-control"
                            onChange={(e) =>
                                setInputData({ ...inputData, description: e.target.value })
                            }
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                            <FaPlus className="me-2" /> Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Attraction
