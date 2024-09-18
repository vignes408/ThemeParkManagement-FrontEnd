// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './TicketDetails.css';

// function TicketDetails() {
//     const location = useLocation();
//     const { bookingDetails } = location.state || {};

//     if (!bookingDetails) {
//         return <p>No booking details available.</p>;
//     }

//     return (
//         <div className="ticket-details-container">
//             <div className="ticket">
//                 <h1 className="ticket-title">Booking Confirmation</h1>
//                 <div className="ticket-info">
//                     <p><strong>Booker Name: </strong>{bookingDetails.name}</p>
//                     <p><strong>Email:</strong> {bookingDetails.email}</p>
//                     <p><strong>Phone Number:</strong> {bookingDetails.phonenumber}</p>
//                     <p><strong>Date of Booking: </strong>{bookingDetails.selectdate}</p>
//                     <p><strong>Adult Admits: </strong>{bookingDetails.adultcount}</p>
//                     <p><strong>Child Admits: </strong>{bookingDetails.childerencount}</p>
//                     <p><strong>Ticet Type: </strong> {bookingDetails.tickettype}</p>
//                     <p><strong>Total Amount:</strong> ₹{bookingDetails.amount}</p>
//                 </div>
//                 <div className="ticket-footer">
//                     <p>Thank you for your purchase!</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TicketDetails;

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './TicketDetails.css';

// function TicketDetails() {
//     const location = useLocation();
//     const { bookingDetails } = location.state || {};

//     if (!bookingDetails) {
//         return <p>No booking details available.</p>;
//     }

//     return (
//         <div className="ticket-details-container">
//             <div className="ticket">
//                 <h1 className="ticket-title">Booking Confirmation</h1>
//                 <div className="ticket-info">
//                     <p><strong>Booker Name: </strong>{bookingDetails.name}</p>
//                     <p><strong>Email:</strong> {bookingDetails.email}</p>
//                     <p><strong>Phone Number:</strong> {bookingDetails.phonenumber}</p>
//                     <p><strong>Date of Booking: </strong>{bookingDetails.selectdate}</p>
//                     <p><strong>Adult Admits: </strong>{bookingDetails.adultcount}</p>
//                     <p><strong>Child Admits: </strong>{bookingDetails.childerencount}</p>
//                     <p><strong>Ticket Type: </strong>{bookingDetails.tickettype}</p>
//                     <p><strong>Total Amount:</strong> ₹{bookingDetails.amount}</p>
//                 </div>
//                 <div className="ticket-footer">
//                     <p>Thank you for your purchase!</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TicketDetails;

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import QRCode from 'qrcode';
// import './TicketDetails.css';

// function TicketDetails() {
//     const location = useLocation();
//     const { bookingDetails } = location.state || {};
//     const [qrCodeUrl, setQrCodeUrl] = useState('');

//     useEffect(() => {
//         if (bookingDetails) {
//             const qrData = JSON.stringify({
//                 name: bookingDetails.name,
//                 email: bookingDetails.email,
//                 phone: bookingDetails.phonenumber,
//                 date: bookingDetails.selectdate,
//                 adults: bookingDetails.adultcount,
//                 children: bookingDetails.childerencount,
//                 ticketType: bookingDetails.tickettype,
//                 amount: bookingDetails.amount
//             });

//             QRCode.toDataURL(qrData)
//                 .then(url => setQrCodeUrl(url))
//                 .catch(err => console.error(err));
//         }
//     }, [bookingDetails]);

//     if (!bookingDetails) {
//         return <p>No booking details available.</p>;
//     }

//     return (
//         <div className="ticket-details-container">
//             <div className="ticket">
//                 <h1 className="ticket-title">Booking Confirmation</h1>
//                 <div className="ticket-info">
//                     <p><strong>Booker Name: </strong>{bookingDetails.name}</p>
//                     <p><strong>Email:</strong> {bookingDetails.email}</p>
//                     <p><strong>Phone Number:</strong> {bookingDetails.phonenumber}</p>
//                     <p><strong>Date of Booking: </strong>{bookingDetails.selectdate}</p>
//                     <p><strong>Adult Admits: </strong>{bookingDetails.adultcount}</p>
//                     <p><strong>Child Admits: </strong>{bookingDetails.childerencount}</p>
//                     <p><strong>Ticket Type: </strong>{bookingDetails.tickettype}</p>
//                     <p><strong>Total Amount:</strong> ₹{bookingDetails.amount}</p>
//                 </div>
//                 <div className="qr-code-section">
//                     <p>Scan and Get your details</p>
//                     {qrCodeUrl ? (
//                         <img src={qrCodeUrl} alt="QR Code" className="qr-code-image" />
//                     ) : (
//                         <p>Generating QR Code...</p>
//                     )}
//                 </div>
//                 <div className="ticket-footer">
//                     <p>Thank you for your purchase!</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TicketDetails;


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import QRCode from 'qrcode';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import './TicketDetails.css';

// function TicketDetails() {
//     const location = useLocation();
//     const { bookingDetails } = location.state || {};
//     const [qrCodeUrl, setQrCodeUrl] = useState('');

//     useEffect(() => {
//         if (bookingDetails) {
//             const qrData = JSON.stringify({
//                 name: bookingDetails.name,
//                 email: bookingDetails.email,
//                 phone: bookingDetails.phonenumber,
//                 date: bookingDetails.selectdate,
//                 adults: bookingDetails.adultcount,
//                 children: bookingDetails.childerencount,
//                 ticketType: bookingDetails.tickettype,
//                 amount: bookingDetails.amount
//             });

//             QRCode.toDataURL(qrData)
//                 .then(url => setQrCodeUrl(url))
//                 .catch(err => console.error(err));
//         }
//     }, [bookingDetails]);

//     const downloadPDF = () => {
//         const input = document.getElementById('ticket');

//         html2canvas(input, { backgroundColor: 'white' }).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('p', 'mm', 'a3'); // A3 size
//             const imgWidth = 297; // A3 width in mm
//             const imgHeight = canvas.height * imgWidth / canvas.width; // Calculating height according to width
//             let heightLeft = imgHeight;
//             let position = 0;

//             pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//             heightLeft -= 420; // A3 height in mm

//             while (heightLeft >= 0) {
//                 position = heightLeft - imgHeight;
//                 pdf.addPage();
//                 pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//                 heightLeft -= 420; // A3 height in mm
//             }

//             pdf.save('ticket.pdf');
//         });
//     };

//     if (!bookingDetails) {
//         return <p>No booking details available.</p>;
//     }

//     return (
//         <div className="ticket-details-container">
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
//             <div class="stepper-item completed">
//                 <div class="step-counter">3</div>
//                 <div class="step-name">Ticket Information</div>
//             </div>  
//             </div>
//             <div className="ticket" id="ticket">
//                 <h1 className="ticket-title">Booking Confirmation</h1>
//                 <div className="ticket-info">
//                     <p><strong>Booker Name: </strong>{bookingDetails.name}</p>
//                     <p><strong>Email:</strong> {bookingDetails.email}</p>
//                     <p><strong>Phone Number:</strong> {bookingDetails.phonenumber}</p>
//                     <p><strong>Date of Booking: </strong>{bookingDetails.selectdate}</p>
//                     <p><strong>Adult Admits: </strong>{bookingDetails.adultcount}</p>
//                     <p><strong>Child Admits: </strong>{bookingDetails.childerencount}</p>
//                     <p><strong>Ticket Type: </strong>{bookingDetails.tickettype}</p>
//                     <p><strong>Total Amount:</strong> ₹{bookingDetails.amount}</p>
//                 </div>
//                 <div className="qr-code-section">
//                     <h2>QR Code</h2>
//                     {qrCodeUrl ? (
//                         <img src={qrCodeUrl} alt="QR Code" className="qr-code-image" />
//                     ) : (
//                         <p>Generating QR Code...</p>
//                     )}
//                 </div>
//                 <div className="ticket-footer">
//                     <p>Thank you for your purchase!</p>
//                     <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TicketDetails;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './TicketDetails.css';

function TicketDetails() {
    const location = useLocation();
    const { bookingDetails } = location.state || {};
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        if (bookingDetails) {
            const qrData = JSON.stringify({
                name: bookingDetails.name,
                email: bookingDetails.email,
                phone: bookingDetails.phonenumber,
                date: bookingDetails.selectdate,
                adults: bookingDetails.adultcount,
                children: bookingDetails.childerencount,
                ticketType: bookingDetails.tickettype,
                amount: bookingDetails.amount
            });

            QRCode.toDataURL(qrData)
                .then(url => setQrCodeUrl(url))
                .catch(err => console.error(err));
        }
    }, [bookingDetails]);

    const downloadPDF = () => {
        const input = document.getElementById('ticket');

        html2canvas(input, { backgroundColor: 'white' }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size (210x297mm)

            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width; // Calculating height according to width
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('ticket.pdf');
        });
    };

    if (!bookingDetails) {
        return <p>No booking details available.</p>;
    }

    return (
        <div className="ticket-details-container">
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
            <br />
            <div className="stepper-wrapper">
                <div className="stepper-item completed">
                    <div className="step-counter">1</div>
                    <div className="step-name">Booking Information</div>
                </div>
                <div className="stepper-item completed">
                    <div className="step-counter">2</div>
                    <div className="step-name">Payment Details</div>
                </div>
                <div className="stepper-item completed">
                    <div className="step-counter">3</div>
                    <div className="step-name">Ticket Information</div>
                </div>  
            </div>
            <div className="ticket" id="ticket">
                <h1 className="ticket-title">Booking Confirmation</h1>
                <div className="ticket-info">
                    <p><strong>Booker Name: </strong>{bookingDetails.name}</p>
                    <p><strong>Email:</strong> {bookingDetails.email}</p>
                    <p><strong>Phone Number:</strong> {bookingDetails.phonenumber}</p>
                    <p><strong>Date of Booking: </strong>{bookingDetails.selectdate}</p>
                    <p><strong>Adult Admits: </strong>{bookingDetails.adultcount}</p>
                    <p><strong>Child Admits: </strong>{bookingDetails.childerencount}</p>
                    <p><strong>Ticket Type: </strong>{bookingDetails.tickettype}</p>
                    <p><strong>Total Amount:</strong> ₹{bookingDetails.amount}</p>
                </div>
                <div className="qr-code-section">
                    <h2>QR Code</h2>
                    {qrCodeUrl ? (
                        <img src={qrCodeUrl} alt="QR Code" className="qr-code-image" />
                    ) : (
                        <p>Generating QR Code...</p>
                    )}
                </div>
                <div className="ticket-footer">
                    <p>Thank you for your purchase!</p>
                    <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
                </div>
            </div>
        </div>
    );
}

export default TicketDetails;

