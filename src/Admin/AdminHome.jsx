import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaHome, FaInfoCircle, FaPlus, FaList, FaCog, FaCalendar, FaSignOutAlt } from 'react-icons/fa';
import { MdAssignment, MdDashboard } from 'react-icons/md';
import './AdminHome.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminHome() {
  const [records, setRecords] = useState([]);
  const [rideStats, setRideStats] = useState({});
  const [rideTimings, setRideTimings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5678/ride/allRides')
      .then((response) => {
        setRecords(response.data);
        calculateStats(response.data);
        calculateTimings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calculateStats = (data) => {
    const rideTypes = data.reduce((acc, ride) => {
      acc[ride.ridetype] = (acc[ride.ridetype] || 0) + 1;
      return acc;
    }, {});

    setRideStats(rideTypes);
  };

  const calculateTimings = (data) => {
    const timings = data.map(ride => ({
      name: ride.ridename,
      start: new Date(`1970-01-01T${ride.starttime}Z`).getTime(),
      end: new Date(`1970-01-01T${ride.endtime}Z`).getTime()
    }));

    setRideTimings(timings);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const barChartData = {
    labels: Object.keys(rideStats),
    datasets: [
      {
        label: 'Number of Rides',
        data: Object.values(rideStats),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(rideStats),
    datasets: [
      {
        label: 'Ride Types',
        data: Object.values(rideStats),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: rideTimings.map(ride => ride.name),
    datasets: [
      {
        label: 'Start Time',
        data: rideTimings.map(ride => ride.start),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'End Time',
        data: rideTimings.map(ride => ride.end),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="container-fluid" id='homebg'>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="navbar">
        <a className="navbar-brand" href="/" id="navbar-brand"> Admin Dashboard</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn btn-light" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li><a href="/"><FaHome /> Home</a></li>
          {/* <li><a href="#about"><FaInfoCircle /> About</a></li> */}
          <li><a href="/addrole"><FaPlus /> Roles Assign</a></li>
          <li><a href="/viewroles"><FaList /> Roles Manage</a></li>
          <li><a href="/addtask"><MdAssignment /> Assign Tasks</a></li>
          <li><a href="/viewtasks"><MdAssignment /> Tasks Info</a></li>
          <li><a href="/addrides"><FaPlus /> Rides Assign</a></li>
          <li><a href="/viewrides"><FaList /> Rides Display</a></li>
          <li><a href="/viewmaintain"><FaCog /> Maintenance Mangement</a></li>
          <li><a href="/viewevents"><FaCalendar /> Events</a></li>
          <li><a href='/allbook'><FaList /> Booking Management</a></li>
          <li><a href='/attract'><FaList /> Attraction</a></li>
          <li><a href='/sendall'><FaList /> Attraction Email's</a></li>
        </ul>
      </div>
<br>
</br>
<br></br>
<br></br>
      <div className="main-content">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg rounded">
              <div className="card-body">
                <h5 className="card-title">Ride Statistics</h5>
                <div className="chart-container">
                  <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg rounded">
              <div className="card-body">
                <h5 className="card-title">Ride Types</h5>
                <div className="chart-container">
                  <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <div className="card shadow-lg rounded">
              <div className="card-body">
                <h5 className="card-title">Ride Timings</h5>
                <div className="chart-container">
                  <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
          <h4>Rides Available</h4>
          {records.map((d, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="card shadow-lg rounded">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
