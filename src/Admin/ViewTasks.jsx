// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
// import './ViewTasks.css'; 

// function ViewTasks() {
//   const [records, setRecords] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [recordsPerPage] = useState(5); // Number of records per page
//   const navigate = useNavigate();

//   useEffect(() => { 
//     axios
//       .get("http://localhost:5678/tasks/allTasks")
//       .then((response) => {
//         setRecords(response.data);
//         console.log(response.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     const conf = window.confirm("Do you want to delete this task?");
//     if (conf) {
//       axios
//         .delete("http://54.210.208.181:1600/employee/" + id)
//         .then(() => {
//           alert("Record has been deleted");
//           setRecords(records.filter(record => record.eid !== id)); // Update state without reloading
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected);
//   };

//   // Calculate the indexes for the current page
//   const indexOfLastRecord = (currentPage + 1) * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

//   return (
//     <div id="body">
//       <div className="container">
//         <h1 id="app2" className="text-center text-bg-primary py-2 rounded">
//           Tasks Assigned
//         </h1>

//         <div className="table-container">
//           <table className="table table-bordered table-striped w-100 border bg-white shadow rounded">
//             <thead className="table-dark">
//               <tr>
//                 <th>Task ID</th>
//                 <th>Task Name</th>
//                 <th>Task Description</th>
//                 <th>Assigned By</th>
//                 <th>Status</th>
//                 <th>Role ID</th>
//                 <th>Person Name</th>
//                 <th>Gender</th>
//                 <th>Role Name</th>
//                 <th>Role Description</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentRecords.map((d, i) => (
//                 <tr key={i}>
//                   <td>{d.taskid}</td>
//                   <td>{d.taskname}</td>
//                   <td>{d.taskdescription}</td>
//                   <td>{d.assignedby}</td>
//                   <td>{d.status}</td>
//                   <td>{d.role.roleid}</td>
//                   <td>{d.role.personname}</td>
//                   <td>{d.role.gender}</td>
//                   <td>{d.role.rolename}</td>
//                   <td>{d.role.description}</td>
//                   <td>
//                     <Link
//                       to={`/updateemployee/${d.eid}`}
//                       className="btn btn-sm btn-success me-2"
//                     >
//                       <i className="fas fa-edit"></i> Update
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(d.eid)}
//                       className="btn btn-sm btn-danger"
//                     >
//                       <i className="fas fa-trash-alt"></i> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <ReactPaginate
//           previousLabel={<i className="fas fa-chevron-left"></i>}
//           nextLabel={<i className="fas fa-chevron-right"></i>}
//           breakLabel={'...'}
//           pageCount={Math.ceil(records.length / recordsPerPage)}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={'pagination justify-content-center mt-4'}
//           pageClassName={'page-item'}
//           pageLinkClassName={'page-link'}
//           previousClassName={'page-item'}
//           previousLinkClassName={'page-link'}
//           nextClassName={'page-item'}
//           nextLinkClassName={'page-link'}
//           breakClassName={'page-item'}
//           breakLinkClassName={'page-link'}
//           activeClassName={'active'}
//         />
//       </div>
//     </div>
//   );
// }

// export default ViewTasks;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewTasks.css'; 

function ViewTasks() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(6);
  
  const navigate = useNavigate();

  const handleLogout = () => {
      window.location.href = '/';
  };

  const handleBack = () => {
      navigate('/adminhome');
  };

  useEffect(() => { 
    axios
      .get("http://localhost:5678/tasks/allTasks")
      .then((response) => {
        setRecords(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    const conf = window.confirm("Do you want to delete this task?");
    if (conf) {
      axios
        .delete("http://54.210.208.181:1600/employee/" + id)
        .then(() => {
          alert("Record has been deleted");
          setRecords(records.filter(record => record.eid !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastRecord = (currentPage + 1) * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div id="body">
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
            <br></br>
        <div className="container mt-5">
        <h1 className='text-center'>
          Tasks Assigned <i class="fa fa-list" aria-hidden="true"></i>
        </h1>
        <br></br>
        <div className="row">
          {currentRecords.map((d, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="card border-primary shadow-sm card-hover">
                <img
                  src={`data:image/jpeg;base64,${d.role.roleimage}`}
                  alt="Role"
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{d.taskname}</h5>
                  <h6 className="card-subtitle mb-2 text-dark">Task ID: {d.taskid}</h6>
                  <p className="card-subtitle"><strong>Task Description: </strong>{d.taskdescription}</p>
                  <p className="card-subtitle"><strong>Person Name:</strong> {d.role.personname}</p>
                  <p className="card-subtitle"><strong>Gender:</strong> {d.role.gender}</p>
                  <p className="card-subtitle"><strong>Role Name:</strong> {d.role.rolename}</p>
                  <p className="card-subtitle"><strong>Role Description:</strong> {d.role.description}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <Link
                      to={`/updateemployee/${d.eid}`}
                      className="btn btn-success btn-sm"
                    >
                      <i className="fas fa-edit"></i> Update
                    </Link>
                    <button
                      onClick={() => handleDelete(d.eid)}
                      className="btn btn-danger btn-sm"
                    >
                    <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={<i className="fas fa-chevron-left"></i>}
          nextLabel={<i className="fas fa-chevron-right"></i>}
          breakLabel={'...'}
          pageCount={Math.ceil(records.length / recordsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center mt-4'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}

export default ViewTasks;
