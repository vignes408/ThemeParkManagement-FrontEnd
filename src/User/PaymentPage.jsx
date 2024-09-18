// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import { FaCreditCard, FaGooglePay, FaApplePay } from 'react-icons/fa';
// import { MdPayment } from 'react-icons/md';
// import axios from 'axios';
// import './PaymentPage.css';

// function PaymentPage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [inputData, setInputData] = useState({
//         email: '',
//         amount: '',
//     });

//     const [bookingDetails, setBookingDetails] = useState({
//         name: '',
//         email: '',
//         phonenumber: '',
//         amount: 0,
//         selectdate: '',
//         tickettype: '',
//         adultcount: 0,
//         childerencount: 0,
//     });

//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [cardDetails, setCardDetails] = useState({
//         cardNumber: '',
//         cvv: '',
//         expiryMonth: '',
//         expiryYear: ''
//     });

//     const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms acceptance

//     useEffect(() => {
//         const state = location.state || {};
//         setBookingDetails({
//             name: state.name || '',
//             email: state.email || '',
//             tickettype: state.tickettype || '',
//             selectdate: state.selectdate || '',
//             adultcount: state.adultcount || 0,
//             childerencount: state.childrencount || 0,
//             phonenumber: state.phonenumber || '',
//             amount: state.amount || 0
//         });

//         setInputData({
//             email: state.email || '',
//             amount: state.amount || ''
//         });
//     }, [location.state]);

//     const handleCardDetailsChange = (e) => {
//         const { name, value } = e.target;
//         setCardDetails(prevDetails => ({
//             ...prevDetails,
//             [name]: value
//         }));
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setInputData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const validateCardDetails = () => {
//         const { cardNumber, cvv, expiryMonth, expiryYear } = cardDetails;
//         const cardNumberRegex = /^\d{16}$/; // Basic validation for 16 digits card number
//         const cvvRegex = /^\d{3}$/; // Basic validation for 3 digits CVV

//         // Validate card number
//         if (!cardNumberRegex.test(cardNumber)) {
//             Swal.fire({
//                 title: 'Invalid Card Number',
//                 text: 'Card number must be 16 digits long.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return false;
//         }

//         // Validate CVV
//         if (!cvvRegex.test(cvv)) {
//             Swal.fire({
//                 title: 'Invalid CVV',
//                 text: 'CVV must be 3 digits long.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return false;
//         }

//         // Validate expiry date
//         const currentMonth = new Date().getMonth() + 1; // Months are 0-based
//         const currentYear = new Date().getFullYear();

//         const expiryMonthNum = parseInt(expiryMonth, 10);
//         const expiryYearNum = parseInt(expiryYear, 10);

//         if (isNaN(expiryMonthNum) || isNaN(expiryYearNum)) {
//             Swal.fire({
//                 title: 'Invalid Expiry Date',
//                 text: 'Expiry month and year must be numeric.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return false;
//         }

//         if (expiryYearNum < currentYear || (expiryYearNum === currentYear && expiryMonthNum < currentMonth)) {
//             Swal.fire({
//                 title: 'Expired Card',
//                 text: 'Card expiry date cannot be in the past.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return false;
//         }

//         return true;
//     };

//     const handlePayment = () => {
//         // Validate input data
//         if (!inputData.email || !inputData.amount) {
//             Swal.fire({
//                 title: 'Missing Information',
//                 text: 'Please provide both email and amount.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         if (!paymentMethod) {
//             Swal.fire({
//                 title: 'Payment Method Required',
//                 text: 'Please select a payment method.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         if (!termsAccepted) { // Check if terms are accepted
//             Swal.fire({
//                 title: 'Terms and Conditions Required',
//                 text: 'Please accept the terms and conditions to proceed.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         if (paymentMethod === 'creditCard') {
//             if (!validateCardDetails()) {
//                 return;
//             }
//         }

//         const dataToSend = {
//             email: inputData.email,
//             amount: inputData.amount,
//             paymentMethod,
//             cardDetails: paymentMethod === 'creditCard' ? cardDetails : null
//         };

//         Swal.fire({
//             title: 'Processing Payment...',
//             text: 'Please wait while we process your payment.',
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });

//         axios.post("http://localhost:5678/pay", dataToSend)
//             .then(() => {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: 'Payment processed successfully!',
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 });
//                 navigate("/ticket", {
//                     state: { bookingDetails } // Pass booking details to TicketDetails page
//                 });
//             })
//             .catch((err) => {
//                 Swal.fire({
//                     title: 'Error!',
//                     text: 'An error occurred while processing the payment.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//                 console.log(err);
//             });
//     };

//     return (
//         <div className="payment-container">
//             <nav className='navbar navbar-expand-lg bg-light fixed-top'>
//                 <div className='container-fluid'>
//                     <a href="/" className="navbar-brand">
//                         <img src='https://png.pngtree.com/png-clipart/20230914/original/pngtree-theme-park-vector-png-image_12147439.png' alt="Logo" className="logo" id='logoimg' />
//                         <h6 className='text-dark' id='logoname'>WONDERLA</h6>
//                     </a>
//                 </div>
//                 <div className="container-fluid justify-content-end" id="vicky">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <a className="nav-link text-dark active" href="/">HOME</a>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//             <div className="payment-cards">
//                 <input
//                     type="hidden"
//                     name="email"
//                     value={inputData.email}
//                 />
//                 <input
//                     type="hidden"
//                     name="amount"
//                     value={inputData.amount}
//                 />

//                 {/* Payment Summary Card */}
//                 <div className="payment-summary card">
//                     <h5 className="card-title">Booking Summary</h5>
//                     <p className="card-text">Review your booking details below.</p>
//                     <p><strong>Booker Name: </strong> {bookingDetails.name}</p>
//                     <p><strong>Email:</strong> {bookingDetails.email}</p>
//                     <p><strong>Phone Number:</strong> {bookingDetails.phonenumber}</p>
//                     <p><strong>Booked Date:</strong> {bookingDetails.selectdate}</p>
//                     <p><strong>Ticket Type: </strong>{bookingDetails.tickettype}</p>
//                     <p><strong>Adult Admit: </strong> {bookingDetails.adultcount}</p>
//                     <p><strong>Children Admit: </strong>{bookingDetails.childerencount}</p>
//                     <p><strong>Total Amount:</strong> ₹{bookingDetails.amount}</p>
//                 </div>

//                 {/* Payment Method Selection */}
//                 <div className="payment-method card">
//                     <h5 className="card-title">Payment Method</h5>
//                     <div className="mb-3">
//                         <div className="form-check">
//                             <input
//                                 type="radio"
//                                 id="creditCard"
//                                 name="paymentMethod"
//                                 className="form-check-input"
//                                 checked={paymentMethod === 'creditCard'}
//                                 onChange={() => setPaymentMethod('creditCard')}
//                             />
//                             <label htmlFor="creditCard" className="form-check-label">
//                                 <FaCreditCard /> Credit Card
//                             </label>
//                         </div>
//                         <div className="form-check">
//                             <input
//                                 type="radio"
//                                 id="googlePay"
//                                 name="paymentMethod"
//                                 className="form-check-input"
//                                 checked={paymentMethod === 'googlePay'}
//                                 onChange={() => setPaymentMethod('googlePay')}
//                             />
//                             <label htmlFor="googlePay" className="form-check-label">
//                                 <FaGooglePay /> Google Pay
//                             </label>
//                         </div>
//                         <div className="form-check">
//                             <input
//                                 type="radio"
//                                 id="applePay"
//                                 name="paymentMethod"
//                                 className="form-check-input"
//                                 checked={paymentMethod === 'applePay'}
//                                 onChange={() => setPaymentMethod('applePay')}
//                             />
//                             <label htmlFor="applePay" className="form-check-label">
//                                 <FaApplePay /> Apple Pay
//                             </label>
//                         </div>
//                     </div>

//                     {/* Show card details form only if Credit Card is selected */}
//                     {paymentMethod === 'creditCard' && (
//                         <div className="card-details">
//                             <div className="mb-3">
//                                 <input
//                                     type="text"
//                                     name="cardNumber"
//                                     placeholder="Card Number"
//                                     className="form-control"
//                                     value={cardDetails.cardNumber}
//                                     onChange={handleCardDetailsChange}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <input
//                                     type="text"
//                                     name="cvv"
//                                     placeholder="CVV"
//                                     className="form-control"
//                                     value={cardDetails.cvv}
//                                     onChange={handleCardDetailsChange}
//                                 />
//                             </div>
//                             <div className="row mb-3">
//                                 <div className="col-md-6">
//                                     <input
//                                         type="text"
//                                         name="expiryMonth"
//                                         placeholder="Expiry Month (MM)"
//                                         className="form-control"
//                                         value={cardDetails.expiryMonth}
//                                         onChange={handleCardDetailsChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <input
//                                         type="text"
//                                         name="expiryYear"
//                                         placeholder="Expiry Year (YYYY)"
//                                         className="form-control"
//                                         value={cardDetails.expiryYear}
//                                         onChange={handleCardDetailsChange}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Terms and Conditions Checkbox */}
//                     <div className="form-check mb-3">
//                         <input
//                             type="checkbox"
//                             id="termsConditions"
//                             className="form-check-input"
//                             checked={termsAccepted}
//                             onChange={() => setTermsAccepted(prev => !prev)}
//                         />
//                         <label htmlFor="termsConditions" className="form-check-label">
//                             I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
//                         </label>
//                     </div>

//                     <button
//                         className="btn btn-primary w-100"
//                         onClick={handlePayment}
//                     >
//                         <MdPayment /> Proceed to Payment
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PaymentPage;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import { FaCreditCard, FaGooglePay, FaApplePay } from 'react-icons/fa';
// import { MdPayment, MdError } from 'react-icons/md';
// import axios from 'axios';
// import './PaymentPage.css'; 

// function PaymentPage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [inputData, setInputData] = useState({
//         email: '',
//         amount: '',
//     });

//     const [bookingDetails, setBookingDetails] = useState({
//         name: '',
//         email: '',
//         phonenumber: '',
//         amount: 0,
//         selectdate: '',
//         tickettype: '',
//         adultcount: 0,
//         childerencount: 0,
//     });

//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [cardDetails, setCardDetails] = useState({
//         cardNumber: '',
//         cvv: '',
//         expiryMonth: '',
//         expiryYear: ''
//     });

//     const [termsAccepted, setTermsAccepted] = useState(false);

//     useEffect(() => {
//         const state = location.state || {};
//         setBookingDetails({
//             name: state.name || '',
//             email: state.email || '',
//             tickettype: state.tickettype || '',
//             selectdate: state.selectdate || '',
//             adultcount: state.adultcount || 0,
//             childerencount: state.childrencount || 0,
//             phonenumber: state.phonenumber || '',
//             amount: state.amount || 0
//         });

//         setInputData({
//             email: state.email || '',
//             amount: state.amount || ''
//         });
//     }, [location.state]);

//     const handleCardDetailsChange = (e) => {
//         const { name, value } = e.target;
//         setCardDetails(prevDetails => ({
//             ...prevDetails,
//             [name]: value
//         }));
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setInputData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const validateCardDetails = () => {
//         const { cardNumber, cvv, expiryMonth, expiryYear } = cardDetails;
//         const cardNumberRegex = /^\d{16}$/;
//         const cvvRegex = /^\d{3}$/;

//         if (!cardNumberRegex.test(cardNumber)) {
//             Swal.fire({
//                 title: 'Invalid Card Number',
//                 text: 'Card number must be 16 digits long.',
//                 icon: 'error',
//                 confirmButtonText: 'OK',
//                 iconHtml: <MdError />
//             });
//             return false;
//         }

//         if (!cvvRegex.test(cvv)) {
//             Swal.fire({
//                 title: 'Invalid CVV',
//                 text: 'CVV must be 3 digits long.',
//                 icon: 'error',
//                 confirmButtonText: 'OK',
//                 iconHtml: <MdError />
//             });
//             return false;
//         }

//         const currentMonth = new Date().getMonth() + 1;
//         const currentYear = new Date().getFullYear();

//         const expiryMonthNum = parseInt(expiryMonth, 10);
//         const expiryYearNum = parseInt(expiryYear, 10);

//         if (isNaN(expiryMonthNum) || isNaN(expiryYearNum)) {
//             Swal.fire({
//                 title: 'Invalid Expiry Date',
//                 text: 'Expiry month and year must be numeric.',
//                 icon: 'error',
//                 confirmButtonText: 'OK',
//                 iconHtml: <MdError />
//             });
//             return false;
//         }

//         if (expiryYearNum < currentYear || (expiryYearNum === currentYear && expiryMonthNum < currentMonth)) {
//             Swal.fire({
//                 title: 'Expired Card',
//                 text: 'Card expiry date cannot be in the past.',
//                 icon: 'error',
//                 confirmButtonText: 'OK',
//                 iconHtml: <MdError />
//             });
//             return false;
//         }

//         return true;
//     };

//     const handlePayment = () => {
//         if (!inputData.email || !inputData.amount) {
//             Swal.fire({
//                 title: 'Missing Information',
//                 text: 'Please provide both email and amount.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK',
//                 iconHtml: <MdError />
//             });
//             return;
//         }

//         if (!paymentMethod) {
//             Swal.fire({
//                 title: 'Payment Method Required',
//                 text: 'Please select a payment method.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK',
//                 iconHtml: <MdError />
//             });
//             return;
//         }

//         if (!termsAccepted) {
//             Swal.fire({
//                 title: 'Terms and Conditions Required',
//                 text: 'Please accept the terms and conditions to proceed.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK',
//                 iconHtml: <MdError />
//             });
//             return;
//         }

//         if (paymentMethod === 'creditCard') {
//             if (!validateCardDetails()) {
//                 return;
//             }
//         }

//         const dataToSend = {
//             email: inputData.email,
//             amount: inputData.amount,
//             paymentMethod,
//             cardDetails: paymentMethod === 'creditCard' ? cardDetails : null
//         };

//         Swal.fire({
//             title: 'Processing Payment...',
//             text: 'Please wait while we process your payment.',
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });

//         axios.post("http://localhost:5678/pay", dataToSend)
//             .then(() => {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: 'Payment processed successfully!',
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 });
//                 navigate("/ticket", {
//                     state: { bookingDetails }
//                 });
//             })
//             .catch((err) => {
//                 Swal.fire({
//                     title: 'Error!',
//                     text: 'An error occurred while processing the payment.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//                 console.log(err);
//             });
//     };

//     return (
//         <div className="container mt-5 pt-5">
//             <nav className='navbar navbar-expand-lg bg-light fixed-top'>
//                 <div className='container-fluid'>
//                     <a href="/" className="navbar-brand">
//                         <img src='https://png.pngtree.com/png-clipart/20230914/original/pngtree-theme-park-vector-png-image_12147439.png' alt="Logo" className="logo" id='logoimg' />
//                         <h6 className='text-dark' id='logoname'>WONDERLA</h6>
//                     </a>
//                 </div>
//                 <div className="container-fluid justify-content-end" id="vicky">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <a className="nav-link text-dark active" href="/">HOME</a>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//             <div className='container' id='markpay'>
//                 <marquee>Payment are not refundable! and No ticket Cancellation available</marquee>
//             </div>
//             <br></br>
//             <div class="stepper-wrapper">
//                 <div class="stepper-item completed">
//                 <div class="step-counter">1</div>
//                 <div class="step-name">Booking Information</div>
//             </div>
//             <div class="stepper-item completed">
//                 <div class="step-counter">2</div>
//                 <div class="step-name">Payment Details</div>
//             </div>
//             <div class="stepper-item">
//                 <div class="step-counter">3</div>
//                 <div class="step-name">Ticket Information</div>
//             </div>  
//             </div>
//             <div className="row justify-content-center" id='paycards'>
//                 <div className="col-lg-5 col-md-6 mb-3">
//                     <div className="card shadow-lg border-primary h-100">
//                         <div className="card-body">
//                             <h5 className="card-title"><MdPayment /> Booking Summary</h5>
//                             <p className="card-text">Review your booking details below.</p>
//                             <p><strong>Booker Name:</strong> {bookingDetails.name}</p>
//                             <p><strong>Email:</strong> {bookingDetails.email}</p>
//                             <p><strong>Phone Number:</strong> {bookingDetails.phonenumber}</p>
//                             <p><strong>Booked Date:</strong> {bookingDetails.selectdate}</p>
//                             <p><strong>Ticket Type:</strong> {bookingDetails.tickettype}</p>
//                             <p><strong>Adult Admit:</strong> {bookingDetails.adultcount}</p>
//                             <p><strong>Children Admit:</strong> {bookingDetails.childerencount}</p>
//                             <p><strong>Total Amount:</strong> ₹{bookingDetails.amount}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-lg-5 col-md-6 mb-3">
//                     <div className="card shadow-lg border-primary h-100">
//                         <div className="card-body">
//                             <h5 className="card-title"><MdPayment /> Payment Method</h5>
//                             <div className="mb-3">
//                                 <div className="form-check">
//                                     <input
//                                         type="radio"
//                                         id="creditCard"
//                                         name="paymentMethod"
//                                         className="form-check-input"
//                                         checked={paymentMethod === 'creditCard'}
//                                         onChange={() => setPaymentMethod('creditCard')}
//                                     />
//                                     <label htmlFor="creditCard" className="form-check-label">
//                                         <FaCreditCard /> Credit Card
//                                     </label>
//                                 </div>
//                                 <div className="form-check">
//                                     <input
//                                         type="radio"
//                                         id="googlePay"
//                                         name="paymentMethod"
//                                         className="form-check-input"
//                                         checked={paymentMethod === 'googlePay'}
//                                         onChange={() => setPaymentMethod('googlePay')}
//                                     />
//                                     <label htmlFor="googlePay" className="form-check-label">
//                                         <FaGooglePay /> Google Pay
//                                     </label>
//                                 </div>
//                                 <div className="form-check">
//                                     <input
//                                         type="radio"
//                                         id="applePay"
//                                         name="paymentMethod"
//                                         className="form-check-input"
//                                         checked={paymentMethod === 'applePay'}
//                                         onChange={() => setPaymentMethod('applePay')}
//                                     />
//                                     <label htmlFor="applePay" className="form-check-label">
//                                         <FaApplePay /> Apple Pay
//                                     </label>
//                                 </div>
//                             </div>

//                             {paymentMethod === 'creditCard' && (
//                                 <div className="card-details mb-3">
//                                     <div className="mb-3">
//                                         <input
//                                             type="text"
//                                             name="cardNumber"
//                                             placeholder="Card Number"
//                                             className="form-control"
//                                             value={cardDetails.cardNumber}
//                                             onChange={handleCardDetailsChange}
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <input
//                                             type="text"
//                                             name="cvv"
//                                             placeholder="CVV"
//                                             className="form-control"
//                                             value={cardDetails.cvv}
//                                             onChange={handleCardDetailsChange}
//                                         />
//                                     </div>
//                                     <div className="row mb-3">
//                                         <div className="col-md-6">
//                                             <input
//                                                 type="text"
//                                                 name="expiryMonth"
//                                                 placeholder="Expiry Month (MM)"
//                                                 className="form-control"
//                                                 value={cardDetails.expiryMonth}
//                                                 onChange={handleCardDetailsChange}
//                                             />
//                                         </div>
//                                         <div className="col-md-6">
//                                             <input
//                                                 type="text"
//                                                 name="expiryYear"
//                                                 placeholder="Expiry Year (YYYY)"
//                                                 className="form-control"
//                                                 value={cardDetails.expiryYear}
//                                                 onChange={handleCardDetailsChange}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="form-check mb-3">
//                                 <input
//                                     type="checkbox"
//                                     id="termsConditions"
//                                     className="form-check-input"
//                                     checked={termsAccepted}
//                                     onChange={() => setTermsAccepted(prev => !prev)}
//                                 />
//                                 <label htmlFor="termsConditions" className="form-check-label">
//                                     I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
//                                 </label>
//                             </div>

//                             <button
//                                 className="btn btn-primary w-100"
//                                 onClick={handlePayment}
//                             >
//                                 <MdPayment /> Proceed to Payment
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PaymentPage;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FaCreditCard, FaGooglePay, FaApplePay, FaCalendarAlt, FaLock, FaCreditCard as FaCard } from 'react-icons/fa';
import { MdPayment, MdError } from 'react-icons/md';
import axios from 'axios';
import './PaymentPage.css'; 

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email: '',
        amount: '',
    });

    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        phonenumber: '',
        amount: 0,
        selectdate: '',
        tickettype: '',
        adultcount: 0,
        childerencount: 0,
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cvv: '',
        expiryMonth: '',
        expiryYear: ''
    });
    const [cardType, setCardType] = useState('');

    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        const state = location.state || {};
        setBookingDetails({
            name: state.name || '',
            email: state.email || '',
            tickettype: state.tickettype || '',
            selectdate: state.selectdate || '',
            adultcount: state.adultcount || 0,
            childerencount: state.childrencount || 0,
            phonenumber: state.phonenumber || '',
            amount: state.amount || 0
        });

        setInputData({
            email: state.email || '',
            amount: state.amount || ''
        });
    }, [location.state]);

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prevDetails => {
            const updatedDetails = {
                ...prevDetails,
                [name]: value
            };

            if (name === 'cardNumber') {
                // Detect card type
                setCardType(detectCardType(value));
            }

            return updatedDetails;
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const detectCardType = (cardNumber) => {
        const cardTypes = [
            { type: 'Visa', pattern: /^4/ },
            { type: 'MasterCard', pattern: /^5[1-5]/ },
            { type: 'American Express', pattern: /^3[47]/ },
            { type: 'Discover', pattern: /^6(011|5)/ },
            { type: 'JCB', pattern: /^35(2[89]|[3-8])/ }
        ];

        for (let i = 0; i < cardTypes.length; i++) {
            if (cardTypes[i].pattern.test(cardNumber)) {
                return cardTypes[i].type;
            }
        }
        return 'Unknown';
    };

    const validateCardDetails = () => {
        const { cardNumber, cvv, expiryMonth, expiryYear } = cardDetails;
        const cardNumberRegex = /^\d{16}$/;
        const cvvRegex = /^\d{3}$/;

        if (!cardNumberRegex.test(cardNumber)) {
            Swal.fire({
                title: 'Invalid Card Number',
                text: 'Card number must be 16 digits long.',
                icon: 'error',
                confirmButtonText: 'OK',
                iconHtml: <MdError />
            });
            return false;
        }

        if (!cvvRegex.test(cvv)) {
            Swal.fire({
                title: 'Invalid CVV',
                text: 'CVV must be 3 digits long.',
                icon: 'error',
                confirmButtonText: 'OK',
                iconHtml: <MdError />
            });
            return false;
        }

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const expiryMonthNum = parseInt(expiryMonth, 10);
        const expiryYearNum = parseInt(expiryYear, 10);

        if (isNaN(expiryMonthNum) || isNaN(expiryYearNum)) {
            Swal.fire({
                title: 'Invalid Expiry Date',
                text: 'Expiry month and year must be numeric.',
                icon: 'error',
                confirmButtonText: 'OK',
                iconHtml: <MdError />
            });
            return false;
        }

        if (expiryYearNum < currentYear || (expiryYearNum === currentYear && expiryMonthNum < currentMonth)) {
            Swal.fire({
                title: 'Expired Card',
                text: 'Card expiry date cannot be in the past.',
                icon: 'error',
                confirmButtonText: 'OK',
                iconHtml: <MdError />
            });
            return false;
        }

        return true;
    };

    const handlePayment = () => {
        if (!inputData.email || !inputData.amount) {
            Swal.fire({
                title: 'Missing Information',
                text: 'Please provide both email and amount.',
                icon: 'warning',
                confirmButtonText: 'OK',
                iconHtml: <MdError />
            });
            return;
        }

        if (!paymentMethod) {
            Swal.fire({
                title: 'Payment Method Required',
                text: 'Please select a payment method.',
                icon: 'warning',
                confirmButtonText: 'OK',
                iconHtml: <MdError />
            });
            return;
        }

        if (!termsAccepted) {
            Swal.fire({
                title: 'Terms and Conditions Required',
                text: 'Please accept the terms and conditions to proceed.',
                icon: 'warning',
                confirmButtonText: 'OK',
                iconHtml: <MdError />
            });
            return;
        }

        if (paymentMethod === 'creditCard') {
            if (!validateCardDetails()) {
                return;
            }
        }

        const dataToSend = {
            email: inputData.email,
            amount: inputData.amount,
            paymentMethod,
            cardDetails: paymentMethod === 'creditCard' ? cardDetails : null
        };

        Swal.fire({
            title: 'Processing Payment...',
            text: 'Please wait while we process your payment.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        axios.post("http://localhost:5678/pay", dataToSend)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Payment processed successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/ticket", {
                    state: { bookingDetails }
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while processing the payment.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.log(err);
            });
    };

    return (
        <div className="container mt-5 pt-5">
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
                    </ul>
                </div>
            </nav>
            <div className='container' id='markpay'>
                <marquee>Payments are not refundable! and No ticket Cancellation available</marquee>
            </div>
            <br />
            <div className="stepper-wrapper">
                <div className="stepper-item completed">
                    <div className="step-counter">1</div>
                    <div className="step-name">Booking Information</div>
                </div>
                <div className="stepper-item active">
                    <div className="step-counter">2</div>
                    <div className="step-name">Payment Details</div>
                </div>
                <div className="stepper-item">
                    <div className="step-counter">3</div>
                    <div className="step-name">Ticket Information</div>
                </div>  
            </div>
            <div className="row justify-content-center" id='paycards'>
                <div className="col-lg-5 col-md-6 mb-3">
                    <div className="card shadow-lg border-primary h-100">
                        <div className="card-body">
                            <h5 className="card-title"><MdPayment /> Booking Summary</h5>
                            <p className="card-text">Review your booking details below.</p>
                            <p><strong>Booker Name:</strong> {bookingDetails.name}</p>
                            <p><strong>Email:</strong> {bookingDetails.email}</p>
                            <p><strong>Phone Number:</strong> {bookingDetails.phonenumber}</p>
                            <p><strong>Booked Date:</strong> {bookingDetails.selectdate}</p>
                            <p><strong>Ticket Type:</strong> {bookingDetails.tickettype}</p>
                            <p><strong>Adult Admit:</strong> {bookingDetails.adultcount}</p>
                            <p><strong>Children Admit:</strong> {bookingDetails.childerencount}</p>
                            <p><strong>Total Amount:</strong> ₹{bookingDetails.amount}</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-md-6 mb-3">
                    <div className="card shadow-lg border-primary h-100">
                        <div className="card-body">
                            <h5 className="card-title"><MdPayment /> Payment Method</h5>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="creditCard"
                                        name="paymentMethod"
                                        className="form-check-input"
                                        checked={paymentMethod === 'creditCard'}
                                        onChange={() => setPaymentMethod('creditCard')}
                                    />
                                    <label htmlFor="creditCard" className="form-check-label">
                                        <FaCreditCard /> Credit Card
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="googlePay"
                                        name="paymentMethod"
                                        className="form-check-input"
                                        checked={paymentMethod === 'googlePay'}
                                        onChange={() => setPaymentMethod('googlePay')}
                                    />
                                    <label htmlFor="googlePay" className="form-check-label">
                                        <FaGooglePay /> Google Pay
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="applePay"
                                        name="paymentMethod"
                                        className="form-check-input"
                                        checked={paymentMethod === 'applePay'}
                                        onChange={() => setPaymentMethod('applePay')}
                                    />
                                    <label htmlFor="applePay" className="form-check-label">
                                        <FaApplePay /> Apple Pay
                                    </label>
                                </div>
                            </div>

                            {paymentMethod === 'creditCard' && (
                                <div className="card-details mb-3">
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><FaCard /></span>
                                            </div>
                                            <input
                                                type="text"
                                                id="payinfo"
                                                name="cardNumber"
                                                placeholder="Card Number"
                                                className="form-control"
                                                value={cardDetails.cardNumber}
                                                onChange={handleCardDetailsChange}
                                            />
                                            {cardType && (
                                                <span className="input-group-text card-type">
                                                    {cardType}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><FaLock /></span>
                                            </div>
                                            <input
                                                type="text"
                                                id="payinfo"
                                                name="cvv"
                                                placeholder="CVV"
                                                className="form-control"
                                                value={cardDetails.cvv}
                                                onChange={handleCardDetailsChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><FaCalendarAlt /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    id="payinfo"
                                                    name="expiryMonth"
                                                    placeholder="Expiry Month (MM)"
                                                    className="form-control"
                                                    value={cardDetails.expiryMonth}
                                                    onChange={handleCardDetailsChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><FaCalendarAlt /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    id="payinfo"
                                                    name="expiryYear"
                                                    placeholder="Expiry Year (YYYY)"
                                                    className="form-control"
                                                    value={cardDetails.expiryYear}
                                                    onChange={handleCardDetailsChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    id="termsConditions"
                                    className="form-check-input"
                                    checked={termsAccepted}
                                    onChange={() => setTermsAccepted(prev => !prev)}
                                />
                                <label htmlFor="termsConditions" className="form-check-label">
                                    I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                                </label>
                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={handlePayment}
                            >
                                <MdPayment /> Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;

