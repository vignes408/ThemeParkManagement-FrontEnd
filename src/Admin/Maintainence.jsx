import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaSignOutAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';
import './Maintainence.css';

function Maintainence() {
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
            .get('http://localhost:5678/maintain/allMaintain')
            .then((response) => {
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
                .delete(`http://localhost:5678/ride/${id}`)
                .then(() => {
                    alert('Record has been deleted');
                    setRecords(records.filter(record => record.rideid !== id));
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container" id='mainid'>
            <nav className="navbar navbar-expand-lg navbar bg-light fixed-top">
                <a className="navbar-brand" href="/" id='adminnav'>WONDERLA</a>
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
            <br>
            </br>
            <br>
            </br>
            <div className="row">
            <h1 id="headingmain" className="my-4 text-center text-dark">
                Maintainence Details
            </h1>
                {records.map((d, i) => (
                    <div className="col-md-4 mb-4" key={i}>
                        <div className={`card shadow-sm rounded card-${d.mainid}`} style={{ backgroundColor: '#f8f9fa', border: '1px solid #e3e3e3' }}>
                            <img
                                src={`data:image/jpeg;base64,${d.ride.rideimage}`}
                                alt="Ride"
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title text-primary">
                                    <FaEdit className="me-2" /> {d.task}
                                </h5>
                                <p className="card-text">
                                    <strong>Task Number: </strong>{d.mainid}<br />
                                    <strong>Maintainence Task:</strong> {d.task}<br />
                                    <strong>Description:</strong> {d.description}<br />
                                    <strong>Ride Type:</strong> {d.ride.ridetype}<br />
                                    <strong>Ride Name:</strong> {d.ride.ridename}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/updaterides/${d.rideid}`} className="btn btn-primary">
                                        <FaEdit className="me-2" /> Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(d.rideid)}
                                        className="btn btn-danger"
                                    >
                                        <FaTrashAlt className="me-2" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Maintainence;
