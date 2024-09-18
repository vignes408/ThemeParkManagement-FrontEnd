// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function AssignTasks() {
//   const navigate = useNavigate();
//   const [records, setRecords] = useState([]);
//   const [inputData, setInputData] = useState({
//     taskname: '',
//     taskdescription: '',
//     assignedby: '',
//     status: '',
//     role: {
//       personname: '',
//       gender: '',
//       rolename: '',
//       description: ''
//     }
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const res = await axios.get("http://localhost:5678/role/allRoles");
//       console.log(res.data);
//       setRecords(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     if (e.target.name === "personname") {
//       console.log(e.target.value);
//       const selectedRole = records.find(record => record.personname === e.target.value);
//       setInputData((prevState) => ({
//         ...prevState,
//         role: selectedRole
//       }));
//     } else {
//       setInputData({ ...inputData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let result = validateValues(inputData);

//     if (result === true) {
//       console.log("Submitting data:", inputData); // Debugging line
//       axios
//         .post('http://localhost:5678/tasks', inputData)
//         .then((res) => {
//           Swal.fire({
//             icon: 'success',
//             title: 'Success',
//             text: 'Data added Successfully',
//           });
//           navigate('/');
//         })
//         .catch((err) => {
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Something went wrong!',
//           });
//           console.log(err);
//         });
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Incomplete Form',
//         text: 'Please fill all the fields',
//       });
//     }
//   };

//   const validateValues = (inputData) => {
//     if (inputData.taskname.length === 0) {
//       Swal.fire('Enter Valid Details');
//       return false;
//     } else if (inputData.taskdescription.length === 0) {
//       Swal.fire('Enter Valid Details');
//       return false;
//     } else if (inputData.assignedby.length === 0) {
//       return false;
//     } else {
//       return true;
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <form onSubmit={handleSubmit} className='passenger-form'>
//         <h3 className="mb-4">Task Details</h3>
//         <div className='form-group mb-3'>
//           <label htmlFor='taskname'>Task Name:</label>
//           <input
//             type='text'
//             className='form-control'
//             name='taskname'
//             placeholder='Enter the task name'
//             required
//             onChange={handleChange}
//           />
//         </div>

//         <div className='form-group mb-3'>
//           <label htmlFor='taskdescription'>Task Description:</label>
//           <input
//             type='text'
//             className='form-control'
//             name='taskdescription'
//             onChange={handleChange}
//             placeholder='Enter Description about task'
//             required
//           />
//         </div>
//         <div className='form-group mb-3'>
//           <label htmlFor='assignedby'>Assigned By:</label>
//           <input
//             type='text'
//             className='form-control'
//             name='assignedby'
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className='form-group mb-3'>
//           <label htmlFor='status'>Status:</label>
//           <input
//             type='text'
//             className='form-control'
//             name='status'
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className='form-group mb-3'>
//           <label htmlFor="personname">Person Name</label>
//           <select
//             className="form-select"
//             required="required"
//             name="personname"
//             title="Select Person"
//             onChange={handleChange}
//           >
//             <option value="" selected="selected">
//               Select Assignee
//             </option>
//             {records.map((item) => (
//               <option value={item.personname} key={item.personname}>
//                 {item.personname}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type='submit' className='btn btn-primary'>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default AssignTasks;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTasks, FaUser, FaClipboard, FaUserTie, FaCheckCircle } from 'react-icons/fa';
import { FaHome, FaSignOutAlt} from 'react-icons/fa';
import { MdAssignment, MdDashboard } from 'react-icons/md';
import './AssignTaks.css';


function AssignTasks() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [inputData, setInputData] = useState({
    taskname: '',
    taskdescription: '',
    role: {
      personname: '',
      gender: '',
      rolename: '',
      description: ''
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5678/role/allRoles");
      console.log(res.data);
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "personname") {
      console.log(e.target.value);
      const selectedRole = records.find(record => record.personname === e.target.value);
      setInputData((prevState) => ({
        ...prevState,
        role: selectedRole
      }));
    } else {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
  };
  const handleLogout = () => {
    window.location.href = '/';
};

const handleBack = () => {
    navigate('/adminhome');
};
  const handleSubmit = (e) => {
    e.preventDefault();
    let result = validateValues(inputData);

    if (result === true) {
      console.log("Submitting data:", inputData); // Debugging line
      axios
        .post('http://localhost:5678/tasks', inputData)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Data added Successfully',
          });
          navigate('/adminhome');
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong!',
          });
          console.log(err);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill all the fields',
      });
    }
  };

  const validateValues = (inputData) => {
    if (inputData.taskname.length === 0) {
      Swal.fire('Enter Valid Details');
      return false;
    } else if (inputData.taskdescription.length === 0) {
      Swal.fire('Enter Valid Details');
      return false;
    }else {
      return true;
    }
  };

  return (
    <div id='taskid'>
    <div className="container mt-5 d-flex justify-content-center">
      <nav className="navbar navbar-expand-lg navbar bg-light fixed-top">
      <a className="navbar-brand" href="/" id='headnav'>WONDERLAA</a>
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
      <form onSubmit={handleSubmit} className='passenger-form' style={{ width: '50%' }} id='taskform'>
        <h3 className="mb-4 text-center" role='taskhead'><FaTasks /> Task Details</h3>
        <div className='form-group mb-3'>
          <label htmlFor='taskname' role='tasknamerole'><FaClipboard /> Task Name:</label>
          <input
            type='text'
            className='form-control'
            name='taskname'
            placeholder='Enter the task name'
            required
            onChange={handleChange}
          />
        </div>

        <div className='form-group mb-3'>
          <label htmlFor='taskdescription' role='taskdesc'><FaClipboard /> Task Description:</label>
          <input
            type='text'
            className='form-control'
            name='taskdescription'
            onChange={handleChange}
            placeholder='Enter Description about task'
            required
          />
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="personname" role='taskperson'><FaUser /> Person Name</label>
          <select
            className="form-select"
            required="required"
            name="personname"
            title="Select Person"
            onChange={handleChange}
          >
            <option value="" selected="selected">
              Select Assignee
            </option>
            {records.map((item) => (
              <option value={item.personname} key={item.personname}>
                {item.personname}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' className='btn btn-primary w-100' role='tasksubmit'><FaClipboard /> Submit</button>
      </form>
    </div>
    </div>
  );
}

export default AssignTasks;
