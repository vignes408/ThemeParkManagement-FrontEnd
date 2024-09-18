import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaHome, FaInfoCircle, FaPlus, FaUser, FaTransgender, FaBriefcase, FaAlignLeft, FaImage, FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import 'sweetalert2/dist/sweetalert2.min.css';
import './ManageRole.css';

function ManageRole() {
    const [inputData, setInputData] = useState({
        personname: '',
        gender: '',
        rolename: '',
        description: '',
        roleimage: null
    });

    const [genderOptions] = useState([
        { value: '', label: 'Select Gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ]);

    const [roleOptions] = useState([
        { value: '', label: 'Select Role' },
        { value: 'Assistant Manager', label: 'Assistant Manager' },
        { value: 'Park Manager', label: 'Park Manager' },
        { value: 'Ride Operators', label: 'Ride Operators' },
        { value: 'Attraction Manager', label: 'Attraction Manager' },
        { value: 'Technicians', label: 'Technicians' },
        { value: 'Cleaning Staff', label: 'Cleaning Staff' },
        { value: 'GroundsKeeping', label: 'GroundsKeeping' },
        { value: 'Security Guards', label: 'Security Guards' },
    ]);

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
            const formData = new FormData();
            formData.append('personname', inputData.personname);
            formData.append('gender', inputData.gender);
            formData.append('rolename', inputData.rolename);
            formData.append('description', inputData.description);
            if (inputData.roleimage) {
                formData.append('roleimage', inputData.roleimage);
            }

            Swal.fire({
                title: 'Submitting...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            axios
                .post("http://localhost:5678/role", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
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
        return inputData.personname.length > 0 &&
               inputData.gender.length > 0 &&
               inputData.rolename.length > 0 &&
               inputData.description.length > 0;
    };

    return (
        <div
            id="manage-role-form"
            className="d-flex w-100 vh-100 justify-content-center align-items-center"
        >
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a className="navbar-brand" href="/">WONDERLA</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button type="button" className="btn btn-dark" onClick={handleBack}>
                                <FaHome className="me-2" /> HOME
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-dark" onClick={handleLogout}>
                                <FaSignOutAlt /> LOGOUT
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="w-50 border rounded bg-light p-4 shadow-lg" id='role-form-container'>
                <form onSubmit={handleSubmit}>
                    <h1 className="mb-4 text-center text-primary"><i class="fa fa-user-plus" aria-hidden="true"></i> Add Role Details</h1>
                    <div className="mb-3">
                        <label htmlFor="personname" className="form-label" role='personrole'>
                            <FaUser className="me-2" /> Person Name
                        </label>
                        <input
                            type="text"
                            name="personname"
                            placeholder='Enter Person Name'
                            className="form-control"
                            onChange={(e) =>
                                setInputData({ ...inputData, personname: e.target.value })
                            }
                            value={inputData.personname}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label" role='genderrole'>
                            <FaTransgender className="me-2" /> Gender
                        </label>
                        <select
                            name="gender"
                            className="form-select"
                            onChange={(e) =>
                                setInputData({ ...inputData, gender: e.target.value })
                            }
                            value={inputData.gender}
                        >
                            {genderOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="rolename" className="form-label" role='rolename'>
                            <FaAlignLeft className="me-2" /> Role Name
                        </label>
                        <select
                            name="rolename"
                            className="form-select"
                            onChange={(e) =>
                                setInputData({ ...inputData, rolename: e.target.value })
                            }
                            value={inputData.rolename}
                        >
                            {roleOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="form-label" role='descrole'>
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
                            value={inputData.description}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="roleimage" className="form-label d-flex align-items-center" role='roleimage'>
                            <FaImage className="me-2" /> Upload Image
                        </label>
                        <input
                            type="file"
                            name="roleimage"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => setInputData({ ...inputData, roleimage: e.target.files[0] })}
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
    );
}

export default ManageRole;
