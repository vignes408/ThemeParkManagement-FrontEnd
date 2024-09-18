import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaSignOutAlt} from 'react-icons/fa';
import './ViewRides.css';

function ViewRides() {
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
      .get('http://localhost:5678/ride/allRides')
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
          setRecords(records.filter(record => record.rideid !== id)); // Update state without reloading
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-fluid" id='ridebg'>
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
      <div className="row">
      <h1 className="text-center text-dark" id="heading">
        <i class="fa fa-list" aria-hidden="true"></i> Ride Info 
      </h1>
        {records.map((d, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="card shadow-sm rounded">
              <img
                src={`data:image/jpeg;base64,${d.rideimage}`}
                alt="Ride"
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{d.ridename}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {d.ridetype}<br />
                  <strong>Start Time:</strong> {d.starttime}<br />
                  <strong>End Time:</strong> {d.endtime}
                </p>
                <div className="d-flex justify-content-between">
                  <Link to={`/updaterides/${d.rideid}`} className="btn btn-success">
                    Update <i className="fas fa-edit"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(d.rideid)}
                    className="btn btn-danger"
                  >
                    Delete <i className="fas fa-trash-alt"></i>
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

export default ViewRides;
