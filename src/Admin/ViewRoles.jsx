import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './ViewRoles.css';

function ViewRoles() {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        window.location.href = '/';
    };

    const handleBack = () => {
        navigate('/adminhome');
    };

    useEffect(() => {
        axios
            .get('http://localhost:5678/role/allRoles')
            .then((response) => {
                if (response.data.length > 0) {
                    setColumns(Object.keys(response.data[0]));
                }
                setRecords(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        const conf = window.confirm('Do you want to delete?');
        if (conf) {
            axios
                .delete(`http://localhost:5678/role/${id}`)
                .then(() => {
                    alert('Record has been deleted');
                    setRecords(records.filter(record => record.roleid !== id)); // Update state without reloading
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container-fluid my-4" id='viewrole'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id='navtext'>
                <a className="navbar-brand" href="/">WONDERLAA</a>
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
            <h1 className="text-center mb-4" id='viewid'><i class="fa fa-user-circle-o" aria-hidden="true"></i> Role Details</h1>
            <div className="row">
                {records.map((d, i) => (
                    <div key={i} className="col-md-3 mb-4"> {/* Adjusted to col-md-3 for 4 cards per row */}
                        <div className="card">
                            <img
                                src={`data:image/jpeg;base64,${d.roleimage}`}
                                alt="Role"
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{d.personname}</h5>
                                <p className="card-text">
                                    <strong>Gender:</strong> {d.gender}<br />
                                    <strong>Role Name:</strong> {d.rolename}<br />
                                    <strong>Description:</strong> {d.description}
                                </p>
                                {/* <div className="d-flex justify-content-between">
                                    <Link
                                        to={`/updateroles/${d.roleid}`}
                                        className="btn btn-success btn-sm"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(d.roleid)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewRoles;
