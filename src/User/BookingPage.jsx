// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

// function BookingPage() {
//     const [inputData, setInputData] = useState({
//         selectdate: '',
//         tickettype: '',
//         name: '',
//         email: '',
//         phonenumber: '',
//         pincode: '',
//         adultcount: 0,
//         childrencount: 0,
//         amount: 0
//     });
//     const [regid, setRegid] = useState(null);
//     const navigate = useNavigate();

//     const ticketPrices = {
//         regular: {
//             adult: 950,
//             children: 600
//         },
//         fast: {
//             adult: 1250,
//             children: 800
//         },
//         college: {
//             adult: 600,
//             children: 0
//         }
//     };

//     useEffect(() => {
//         // Fetch regid from session storage
//         const storedRegid = sessionStorage.getItem('regid');
//         setRegid(storedRegid);
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         const result = validateValues(inputData);

//         if (result === true) {
//             // Special case for college tickets
//             if (inputData.tickettype === 'college') {
//                 Swal.fire({
//                     title: 'College ID Ticket',
//                     text: 'Please bring your college ID with you for verification at the park.',
//                     icon: 'info',
//                     confirmButtonText: 'OK'
//                 });
//             }

//             Swal.fire({
//                 title: 'Submitting...',
//                 text: 'Please wait while we process your request.',
//                 allowOutsideClick: false,
//                 didOpen: () => {
//                     Swal.showLoading();
//                 }
//             });

//             const dataToSend = { ...inputData, regid };

//             axios.post("http://localhost:5678/book", dataToSend)
//                 .then((res) => {
//                     Swal.fire({
//                         title: 'Success!',
//                         text: 'Booking was added successfully!',
//                         icon: 'success',
//                         confirmButtonText: 'OK'
//                     });
//                     navigate("/payment", { state: { ...inputData } }); // Navigate to PaymentPage
//                 })
//                 .catch((err) => {
//                     Swal.fire({
//                         title: 'Error!',
//                         text: 'An error occurred while adding data.',
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                     console.log(err);
//                 });
//         } else {
//             Swal.fire({
//                 title: 'Invalid Input!',
//                 text: 'Please enter valid inputs!',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };

//     const validateValues = (inputData) => {
//         const currentDate = new Date();
//         const selectedDate = new Date(inputData.selectdate);
        
//         // Check if the date is valid and not in the past
//         if (isNaN(selectedDate.getTime()) || selectedDate < currentDate) {
//             Swal.fire({
//                 title: 'Invalid Date!',
//                 text: 'Please select a valid future date.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//             });
//             return false;
//         }

//         // Check other form values
//         return inputData.selectdate.length > 0 &&
//             inputData.tickettype.length > 0 &&
//             inputData.name.length > 0 &&
//             inputData.email.length > 0 &&
//             inputData.phonenumber.length > 0 &&
//             inputData.pincode.length > 0 &&
//             inputData.amount > 0 &&
//             inputData.adultcount >= 0 &&
//             inputData.childrencount >= 0;
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setInputData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const incrementTicketCount = (type) => {
//         setInputData(prevData => ({
//             ...prevData,
//             [type]: prevData[type] + 1
//         }));
//     };

//     const decrementTicketCount = (type) => {
//         setInputData(prevData => ({
//             ...prevData,
//             [type]: Math.max(0, prevData[type] - 1)
//         }));
//     };

//     useEffect(() => {
//         const { tickettype, adultcount, childrencount } = inputData;
//         const prices = ticketPrices[tickettype] || { adult: 0, children: 0 };
//         const amount = (prices.adult * adultcount) + (prices.children * childrencount);
//         setInputData(prevData => ({
//             ...prevData,
//             amount
//         }));
//     }, [inputData.tickettype, inputData.adultcount, inputData.childrencount]);

//     return (
//         <div className="container my-4">
//             <div className='row'>
//                 <div className='col-md-6'>
//                     <div className='card'>
//                         <div className='card-body'>
//                             <h5 className="card-title">Plan Your Visit</h5>
//                             <p className="card-text">Plan your day of 7 hours with a breathtaking experience of continuous enjoyment and fantastic thrills over every ride.</p>
//                             <h5 className="mt-4">Hours of Fun</h5>
//                             <table className="table table-striped table-dark">
//                                 <thead>
//                                     <tr>
//                                         <th scope="col"></th>
//                                         <th scope="col">Park Timings</th>
//                                         <th scope="col">Water Park</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <th scope="row">Weekdays</th>
//                                         <td>11:00 AM - 06:00 PM</td>
//                                         <td>12:30 PM - 05:00 PM</td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row">Weekends & Holidays</th>
//                                         <td>11:00 AM - 07:00 PM</td>
//                                         <td>12:00 PM - 06:00 PM</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <h5 className="mt-4">Grab Your Tickets!</h5>
//                             <p>Wonderla provides regular tickets, fast track tickets for queue skipping, and special offer tickets designed exclusively for students, birthday celebrations, and women. Make your choice below:</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='col-md-6'>
//                     <div className='card'>
//                         <div className='card-body'>
//                             <h5 className="card-title">Grab Your Tickets</h5>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3">
//                                     <input
//                                         type="date"
//                                         name="selectdate"
//                                         className="form-control"
//                                         onChange={handleInputChange}
//                                         value={inputData.selectdate}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <select
//                                         className='form-control'
//                                         name='tickettype'
//                                         onChange={handleInputChange}
//                                         value={inputData.tickettype}
//                                         required
//                                     >
//                                         <option value='' disabled>Select your Ticket Type</option>
//                                         <option value='regular'>Regular Ticket</option>
//                                         <option value='fast'>Fast Track Ticket</option>
//                                         <option value='college'>College ID Ticket</option>
//                                     </select>
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         placeholder='Enter Name'
//                                         className="form-control"
//                                         onChange={handleInputChange}
//                                         value={inputData.name}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         name="email"
//                                         placeholder='Enter Email ID'
//                                         className="form-control"
//                                         onChange={handleInputChange}
//                                         value={inputData.email}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         name="phonenumber"
//                                         placeholder='Enter Phone Number'
//                                         className="form-control"
//                                         onChange={handleInputChange}
//                                         value={inputData.phonenumber}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         placeholder='Enter Pin Code'
//                                         className="form-control"
//                                         onChange={handleInputChange}
//                                         value={inputData.pincode}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="adultcount" className="form-label">Adult Ticket Count</label>
//                                     <div className="input-group">
//                                         <input
//                                             type="number"
//                                             name="adultcount"
//                                             className="form-control"
//                                             readOnly
//                                             value={inputData.adultcount}
//                                         />
//                                         <button
//                                             type="button"
//                                             className="btn btn-outline-secondary"
//                                             onClick={() => incrementTicketCount('adultcount')}
//                                         >
//                                             +
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="btn btn-outline-secondary"
//                                             onClick={() => decrementTicketCount('adultcount')}
//                                             disabled={inputData.adultcount <= 0}
//                                         >
//                                             -
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="childrencount" className="form-label">Children Ticket Count</label>
//                                     <div className="input-group">
//                                         <input
//                                             type="number"
//                                             name="childrencount"
//                                             className="form-control"
//                                             readOnly={inputData.tickettype === 'college'}
//                                             value={inputData.childrencount}
//                                             onChange={handleInputChange}
//                                         />
//                                         <button
//                                             type="button"
//                                             className="btn btn-outline-secondary"
//                                             onClick={() => incrementTicketCount('childrencount')}
//                                             disabled={inputData.tickettype === 'college'}
//                                         >
//                                             +
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="btn btn-outline-secondary"
//                                             onClick={() => decrementTicketCount('childrencount')}
//                                             disabled={inputData.childrencount <= 0 || inputData.tickettype === 'college'}
//                                         >
//                                             -
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="number"
//                                         name="amount"
//                                         className="form-control"
//                                         readOnly
//                                         value={inputData.amount}
//                                     />
//                                 </div>
//                                 <button className="btn btn-info w-100" type="submit" id="submit">Submit</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default BookingPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './BookingPage.css'; 

function BookingPage() {
    const [inputData, setInputData] = useState({
        selectdate: '',
        tickettype: '',
        name: '',
        email: '',
        phonenumber: '',
        pincode: '',
        adultcount: 0,
        childrencount: 0,
        amount: 0
    });
    const [regid, setRegid] = useState(null);
    const navigate = useNavigate();

    const ticketPrices = {
        regular: {
            adult: 950,
            children: 600
        },
        fast: {
            adult: 1250,
            children: 800
        },
        college: {
            adult: 600,
            children: 0
        }
    };

    useEffect(() => {
        const storedRegid = sessionStorage.getItem('regid');
        setRegid(storedRegid);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = validateValues(inputData);

        if (result === true) {
            if (inputData.tickettype === 'college') {
                Swal.fire({
                    title: 'College ID Ticket',
                    text: 'Please bring your college ID with you for verification at the park.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            }

            Swal.fire({
                title: 'Submitting...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const dataToSend = { ...inputData, regid };

            axios.post("http://localhost:5678/book", dataToSend)
                .then((res) => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Booking was added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate("/payment", { state: { ...inputData } }); // Navigate to PaymentPage
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
        const currentDate = new Date();
        const selectedDate = new Date(inputData.selectdate);

        if (isNaN(selectedDate.getTime()) || selectedDate < currentDate) {
            Swal.fire({
                title: 'Invalid Date!',
                text: 'Please select a valid future date.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }

        return inputData.selectdate.length > 0 &&
            inputData.tickettype.length > 0 &&
            inputData.name.length > 0 &&
            inputData.email.length > 0 &&
            (inputData.phonenumber.length > 0 && inputData.phonenumber.length === 10) &&
            inputData.pincode.length > 0 &&
            inputData.amount > 0 &&
            inputData.adultcount >= 0 &&
            inputData.childrencount >= 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const incrementTicketCount = (type) => {
        setInputData(prevData => ({
            ...prevData,
            [type]: prevData[type] + 1
        }));
    };

    const decrementTicketCount = (type) => {
        setInputData(prevData => ({
            ...prevData,
            [type]: Math.max(0, prevData[type] - 1)
        }));
    };

    useEffect(() => {
        const { tickettype, adultcount, childrencount } = inputData;
        const prices = ticketPrices[tickettype] || { adult: 0, children: 0 };
        const amount = (prices.adult * adultcount) + (prices.children * childrencount);
        setInputData(prevData => ({
            ...prevData,
            amount
        }));
    }, [inputData.tickettype, inputData.adultcount, inputData.childrencount]);

    // Get today's date for the date input min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container my-4">
            <nav className='navbar navbar-expand-lg bg-light fixed-top'>
                <div className='container-fluid'>
                    <a href="/" className="navbar-brand">
                        <img src='https://png.pngtree.com/png-clipart/20230914/original/pngtree-theme-park-vector-png-image_12147439.png' alt="Logo" className="logo" id='logoimg' />
                        <h6 className='text-dark' id='logoname'>WONDERLA</h6>
                    </a>
                </div>
                <div className="container-fluid justify-content-end" id="vicky">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-dark active" href="/">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="https://www.google.com/maps/@?api=1&map_action=map">ABOUT</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='container-fluid' id='paymark'>
                <marquee>Discover wonderful adventures at WonderLAAA and explore the awstruck rides and events Grab your offers!!!</marquee>
            </div>
            <br></br>
            <div class="stepper-wrapper">
  <div class="stepper-item active">
    <div class="step-counter">1</div>
    <div class="step-name">Booking Information</div>
  </div>
  <div class="stepper-item">
    <div class="step-counter">2</div>
    <div class="step-name">Payment Details</div>
  </div>
  <div class="stepper-item">
    <div class="step-counter">3</div>
    <div class="step-name">Ticket Confirmation</div>
  </div>
</div>
            <div className="row mt-5 container">
                <div className="col-md-6" id="bookform">
                    <div className="card shadow-lg border-primary">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Plan Your Visit</h5>
                            <p className="card-text">Enjoy a 7-hour adventure with endless excitement and thrilling rides. Plan your visit today!</p>
                            <h5 className="mt-4">Hours of Fun</h5>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Park Timings</th>
                                        <th scope="col">Water Park</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Weekdays</th>
                                        <td>11:00 AM - 06:00 PM</td>
                                        <td>12:30 PM - 05:00 PM</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Weekends & Holidays</th>
                                        <td>11:00 AM - 07:00 PM</td>
                                        <td>12:00 PM - 06:00 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <h5 className="mt-4">Grab Your Tickets!</h5> */}
                            <h5>Know your Ticket rates</h5>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Adult Ticket</th>
                                        <th scope="col">Children Ticket</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Regular Ticket</th>
                                        <td>Rs.950</td>
                                        <td>Rs.600</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Fast track Ticket</th>
                                        <td>Rs.1250</td>
                                        <td>Rs.800</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">College ID Ticket</th>
                                        <td>Rs.600</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Choose from regular, fast track, or college ID tickets for an unforgettable experience:</p>
                            <p>Note:<p id='colid'>*For Adult Ticket age should be above 18</p></p>
                            <p id='colid'>*For College ID ticket please bring the ID for proof for verification</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" id="bookform1">
                    <div className="card shadow-lg border-primary">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Book Your Tickets</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label" role='daterole'>Select Date</label>
                                    <input
                                        type="date"
                                        id='bookalign'
                                        name="selectdate"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        value={inputData.selectdate}
                                        min={today} 
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id='bookalign'
                                            placeholder='Enter Name'
                                            className="form-control"
                                            onChange={handleInputChange}
                                            value={inputData.name}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id='bookalign'
                                            placeholder='Enter Email ID'
                                            className="form-control"
                                            onChange={handleInputChange}
                                            value={inputData.email}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phonenumber"
                                            id='bookalign'
                                            placeholder='Enter Phone Number'
                                            className="form-control"
                                            onChange={handleInputChange}
                                            value={inputData.phonenumber}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Pin Code</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            id='bookalign'
                                            placeholder='Enter Pin Code'
                                            className="form-control"
                                            onChange={handleInputChange}
                                            value={inputData.pincode}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ticket Type</label>
                                    <select
                                        className='form-select'
                                        name='tickettype'
                                        id='bookalign'
                                        onChange={handleInputChange}
                                        value={inputData.tickettype}
                                        required
                                    >
                                        <option value='' disabled>Select your Ticket Type</option>
                                        <option value='regular'>Regular Ticket</option>
                                        <option value='fast'>Fast Track Ticket</option>
                                        <option value='college'>College ID Ticket</option>
                                    </select>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Adult Ticket Count</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="adultcount"
                                                id='bookalign'
                                                className="form-control"
                                                readOnly
                                                value={inputData.adultcount}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => decrementTicketCount('adultcount')}
                                            >-</button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => incrementTicketCount('adultcount')}
                                            >+</button>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Children Ticket Count</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="childrencount"
                                                id='bookalign'
                                                className="form-control"
                                                readOnly
                                                value={inputData.childrencount}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => decrementTicketCount('childrencount')}
                                            >-</button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => incrementTicketCount('childrencount')}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Total Amount</label>
                                    <input
                                        type="text"
                                        name="amount"
                                        id='bookalign'
                                        className="form-control"
                                        readOnly
                                        value={`₹ ${inputData.amount}`}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;
