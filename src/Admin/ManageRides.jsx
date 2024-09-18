// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import './ManageRides.css';
// import { MdAssignment, MdDashboard } from 'react-icons/md';
// import { FaHome, FaInfoCircle, FaPlus, FaList, FaCog, FaCalendar, FaSignOutAlt, FaUser, FaTransgender, FaBriefcase, FaAlignLeft } from 'react-icons/fa';


// function ManageRides() {
//   const [inputData, setInputData] = useState({
//     ridetype: '',
//     ridename: '',
//     starttime: '',
//     endtime: '',
//     rideimage: null // Change from '' to null to handle file inputs
//   });

//   const handleLogout = () => {
//     window.location.href = '/';
// };

// const handleBack = () => {
//     navigate('/adminhome');
// };
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const result = validateValues(inputData);

//     if (result === true) {
//         // Show loading spinner
//         Swal.fire({
//             title: 'Submitting...',
//             text: 'Please wait while we process your request.',
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });

//         const formData = new FormData();
//         formData.append('ridetype', inputData.ridetype);
//         formData.append('ridename', inputData.ridename);
//         formData.append('starttime', inputData.starttime);
//         formData.append('endtime', inputData.endtime);
//         if (inputData.rideimage) {
//             formData.append('rideimage', inputData.rideimage);
//         }

//         axios
//             .post("http://localhost:5678/ride", formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })
//             .then((res) => {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: 'Data added successfully!',
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 });
//                 console.log(res.data);
//                 // Optionally navigate to another route
//                 // navigate("/");
//             })
//             .catch((err) => {
//                 Swal.fire({
//                     title: 'Error!',
//                     text: 'An error occurred while adding data.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//                 console.log(err);
//             });
//     } else {
//         Swal.fire({
//             title: 'Invalid Input!',
//             text: 'Please enter valid inputs!',
//             icon: 'warning',
//             confirmButtonText: 'OK'
//         });
//     }
// };

// const validateValues = (inputData) => {
//   return inputData.ridetype.length > 0 &&
//          inputData.ridename.length > 0;
// };

//   return (
//     <div id="add2" className="d-flex w-100 vh-100 justify-content-center align-items-center">
//             <nav className="navbar navbar-expand-lg navbar bg-light fixed-top">
//       <a className="navbar-brand" href="/"><MdDashboard /> Admin Dashboard</a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav ml-auto">
//                         <li className="nav-item">
//                         <button type="button" className="btn btn-secondary" onClick={handleBack}>
//                             <FaHome className="me-2" /> HOME
//                         </button>
//                         </li>
//                         <li className="nav-item">
//                             <button className="btn btn-outline-light" onClick={handleLogout}>
//                                 <FaSignOutAlt /> LOGOUT
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//             <br></br>
//       <div className="w-50 border bg-light p-5" id='rideid'>
//         <form onSubmit={handleSubmit}>
//           <h1 role="heading">Add Ride Details</h1>
          
//           <div>
//             <label htmlFor="ridetype">Ride Type</label>
//             <input
//               type="text"
//               name="ridetype"
//               placeholder='Enter Ride Type'
//               className="form-control"
//               onChange={(e) => setInputData({ ...inputData, ridetype: e.target.value })}
//             />
//           </div>
          
//           <div>
//             <label htmlFor="ridename">Ride Name</label>
//             <input
//               type="text"
//               name="ridename"
//               placeholder='Enter Ride Name'
//               className="form-control"
//               onChange={(e) => setInputData({ ...inputData, ridename: e.target.value })}
//             />
//           </div>

//           <div>
//             <label htmlFor="starttime">Start Time:</label>
//             <input
//               type="time"
//               name="starttime"
//               className="form-control"
//               onChange={(e) => setInputData({ ...inputData, starttime: e.target.value })}
//             />
//           </div>

//           <div>
//             <label htmlFor="endtime">End Time:</label>
//             <input
//               type="time"
//               name="endtime"
//               className="form-control"
//               onChange={(e) => setInputData({ ...inputData, endtime: e.target.value })}
//             />
//           </div>

//           <div>
//             <label htmlFor="rideimage">Upload Image:</label>
//             <input
//               type="file"
//               name="rideimage"
//               accept="image/*"
//               className="form-control"
//               onChange={(e) => setInputData({ ...inputData, rideimage: e.target.files[0] })}
//             />
//           </div>

//           <br />

//           <button className="btn btn-info" role="submit" id="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ManageRides;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './ManageRides.css';
import { MdDashboard } from 'react-icons/md';
import { FaHome, FaSignOutAlt, FaImage, FaCalendarDay, FaCalendarAlt, FaTag } from 'react-icons/fa';

function ManageRides() {
  const [inputData, setInputData] = useState({
    ridetype: '',
    ridename: '',
    starttime: '',
    endtime: '',
    rideimage: null
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
      Swal.fire({
        title: 'Submitting...',
        text: 'Please wait while we process your request.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const formData = new FormData();
      formData.append('ridetype', inputData.ridetype);
      formData.append('ridename', inputData.ridename);
      formData.append('starttime', inputData.starttime);
      formData.append('endtime', inputData.endtime);
      if (inputData.rideimage) {
        formData.append('rideimage', inputData.rideimage);
      }

      axios
        .post("http://localhost:5678/ride", formData, {
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
    return inputData.ridetype.length > 0 &&
           inputData.ridename.length > 0 &&
           inputData.starttime.length > 0 &&
           inputData.endtime.length > 0;
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center" id='addridebg'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand" href="/" id='navfont'>WONDERLAA</a>
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

      <div className="w-50 bg-white p-4 rounded shadow-sm" id='rideid'>
        <h1 className="text-center mb-4">Make a Ride <i class="fa fa-plus-circle" aria-hidden="true"></i></h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="ridetype"><FaTag /> Ride Type</label>
            <input
              type="text"
              name="ridetype"
              placeholder='Enter Ride Type'
              className="form-control"
              onChange={(e) => setInputData({ ...inputData, ridetype: e.target.value })}
              value={inputData.ridetype}
            />
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="ridename"><FaTag /> Ride Name</label>
            <input
              type="text"
              name="ridename"
              placeholder='Enter Ride Name'
              className="form-control"
              onChange={(e) => setInputData({ ...inputData, ridename: e.target.value })}
              value={inputData.ridename}
            />
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="starttime"><FaCalendarDay /> Start Time</label>
            <input
              type="time"
              name="starttime"
              className="form-control"
              onChange={(e) => setInputData({ ...inputData, starttime: e.target.value })}
              value={inputData.starttime}
            />
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="endtime"><FaCalendarAlt /> End Time</label>
            <input
              type="time"
              name="endtime"
              className="form-control"
              onChange={(e) => setInputData({ ...inputData, endtime: e.target.value })}
              value={inputData.endtime}
            />
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="rideimage"><FaImage /> Upload Image</label>
            <input
              type="file"
              name="rideimage"
              accept="image/*"
              className="form-control"
              onChange={(e) => setInputData({ ...inputData, rideimage: e.target.files[0] })}
            />
          </div>

          <button className="btn btn-info w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ManageRides;
