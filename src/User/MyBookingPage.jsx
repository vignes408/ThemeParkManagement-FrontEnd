// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faCalendarAlt,
//   faTicketAlt,
//   faUser,
//   faEnvelope,
//   faPhone,
//   faMapPin,
//   faDollarSign,
//   faChevronLeft,
//   faChevronRight,
//   faDownload
// } from '@fortawesome/free-solid-svg-icons';
// import jsPDF from 'jspdf';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included for styling

// const MyBookingPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [bookingsPerPage] = useState(5); // Number of bookings per page
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getRegidFromSession = () => {
//     const regid = sessionStorage.getItem('regid');
//     console.log('Retrieved regid from session:', regid); // Debugging line
//     return regid;
//   };

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       setLoading(true);
//       const regid = getRegidFromSession();

//       if (!regid) {
//         setError('Registration ID is not found in session.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5678/book/regid/${regid}`);
//         console.log('API Response:', response.data);
//         if (Array.isArray(response.data)) {
//           setBookings(response.data);
//         } else {
//           setBookings([response.data]);
//         }
//       } catch (err) {
//         console.error('Error fetching booking details:', err);
//         setError('Error fetching booking details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, []);

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected);
//   };

//   const downloadPDF = (booking) => {
//     const pdf = new jsPDF('p', 'mm', 'a4'); // Use A4 format for a more common size
//     pdf.setFontSize(12);

//     // Add Booking Details
//     pdf.text(`Booking Number: ${booking.bookid}`, 10, 10);
//     pdf.text(`Date of Booking: ${new Date(booking.selectdate).toLocaleDateString()}`, 10, 20);
//     pdf.text(`Ticket Type: ${booking.tickettype}`, 10, 30);
//     pdf.text(`Adult Count: ${booking.adultcount}`, 10, 40);
//     pdf.text(`Children Count: ${booking.childrencount}`, 10, 50);
//     pdf.text(`Name: ${booking.name}`, 10, 60);
//     pdf.text(`Email: ${booking.email}`, 10, 70);
//     pdf.text(`Phone Number: ${booking.phonenumber}`, 10, 80);
//     pdf.text(`Pincode: ${booking.pincode}`, 10, 90);
//     pdf.setFontSize(14);
//     pdf.setFont('helvetica', 'bold');
//     pdf.text(`Amount: ${booking.amount}`, 10, 100);
//     pdf.save(`booking-${booking.bookid}.pdf`);
//   };

//   // Calculate the indexes for the current page
//   const indexOfLastBooking = (currentPage + 1) * bookingsPerPage;
//   const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//   const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (currentBookings.length === 0) {
//     return <div>No bookings found.</div>;
//   }

//   return (
//     <div className="container my-4">
//       <nav className='navbar navbar-expand-lg bg-light fixed-top'>
//         <div className='container-fluid'>
//           <a href="/" className="navbar-brand">
//             <img src='https://png.pngtree.com/png-clipart/20230914/original/pngtree-theme-park-vector-png-image_12147439.png' alt="Logo" className="logo" id='logoimg' />
//             <h6 className='text-dark' id='logoname'>WONDERLA</h6>
//           </a>
//         </div>
//         <div className="container-fluid justify-content-end" id="vicky">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <a className="nav-link text-dark active" href="/">HOME</a>
//             </li>
//           </ul>
//         </div>
//       </nav>
//       <br />
//       <br />
//       <h1 id="app2" className="text-center">
//         My Bookings <i class="fa fa-list" aria-hidden="true"></i>
//       </h1>

//       <div className="row">
//         {currentBookings.map((booking, i) => (
//           <div className="col-md-4 mb-4" key={i}>
//             <div className="card border-primary shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">Booking Number: {booking.bookid}</h5>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faCalendarAlt} /> <strong>Date of Booking:</strong> {new Date(booking.selectdate).toLocaleDateString()}
//                 </p>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faTicketAlt} /> <strong>Ticket Type:</strong> {booking.tickettype}
//                 </p>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faUser} /> <strong>Adult Count:</strong> {booking.adultcount}
//                 </p>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faUser} /> <strong>Children Count:</strong> {booking.childrencount}
//                 </p>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faUser} /> <strong>Name:</strong> {booking.name}
//                 </p>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {booking.email}
//                 </p>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faPhone} /> <strong>Phone Number:</strong> {booking.phonenumber}
//                 </p>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faMapPin} /> <strong>Pincode:</strong> {booking.pincode}
//                 </p>
//                 <p className="card-text">
//                   <FontAwesomeIcon icon={faDollarSign} /> <strong>Amount:</strong> RS.{booking.amount.toFixed(2)}
//                 </p>
//                 <button className="btn btn-primary" onClick={() => downloadPDF(booking)}>
//                   <FontAwesomeIcon icon={faDownload} /> Download your Ticket
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <ReactPaginate
//         previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
//         nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
//         breakLabel={'...'}
//         pageCount={Math.ceil(bookings.length / bookingsPerPage)}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageClick}
//         containerClassName={'pagination justify-content-center mt-4'}
//         pageClassName={'page-item'}
//         pageLinkClassName={'page-link'}
//         previousClassName={'page-item'}
//         previousLinkClassName={'page-link'}
//         nextClassName={'page-item'}
//         nextLinkClassName={'page-link'}
//         breakClassName={'page-item'}
//         breakLinkClassName={'page-link'}
//         activeClassName={'active'}
//       />
//     </div>
//   );
// };

// export default MyBookingPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faTicketAlt,
  faUser,
  faEnvelope,
  faPhone,
  faMapPin,
  faDollarSign,
  faChevronLeft,
  faChevronRight,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import QRCode from 'qrcode'; // Import the QR code library
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included for styling

const MyBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookingsPerPage] = useState(5); // Number of bookings per page
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRegidFromSession = () => {
    const regid = sessionStorage.getItem('regid');
    console.log('Retrieved regid from session:', regid); // Debugging line
    return regid;
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      const regid = getRegidFromSession();

      if (!regid) {
        setError('Registration ID is not found in session.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5678/book/regid/${regid}`);
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setBookings([response.data]);
        }
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Error fetching booking details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const downloadPDF = async (booking) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFontSize(12);

    // Add text
    pdf.text("Thanks For Booking", 10, 10);
    pdf.text("Near, Relevantz Technology Services, Kamaraj College of Engineering and Technology, Madurai", 10, 20);
    pdf.text("Ticket Confirmation", 10, 30);
    pdf.text(`Booking Number: ${booking.bookid}`, 10, 40);
    pdf.text(`Date of Booking: ${new Date(booking.selectdate).toLocaleDateString()}`, 10, 50);
    pdf.text(`Ticket Type: ${booking.tickettype}`, 10, 60);
    pdf.text(`Adult Count: ${booking.adultcount}`, 10, 70);
    pdf.text(`Children Count: ${booking.childrencount}`, 10, 80);
    pdf.text(`Name: ${booking.name}`, 10, 90);
    pdf.text(`Email: ${booking.email}`, 10, 100);
    pdf.text(`Phone Number: ${booking.phonenumber}`, 10, 110);
    pdf.text(`Pincode: ${booking.pincode}`, 10, 120);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Amount: ${booking.amount}`, 10, 130);

    // Generate QR code with all booking details
    const qrData = `
      Booking Number: ${booking.bookid}
      Date of Booking: ${new Date(booking.selectdate).toLocaleDateString()}
      Ticket Type: ${booking.tickettype}
      Adult Count: ${booking.adultcount}
      Children Count: ${booking.childrencount}
      Name: ${booking.name}
      Email: ${booking.email}
      Phone Number: ${booking.phonenumber}
      Pincode: ${booking.pincode}
      Amount: ${booking.amount}
    `;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, { width: 100, margin: 1 });
      pdf.addImage(qrCodeDataUrl, 'PNG', 10, 140, 40, 40); // Adjust positioning and size as needed
    } catch (err) {
      console.error('Error generating QR code:', err);
      // Handle error appropriately
    }

    pdf.save(`booking-${booking.bookid}.pdf`);
  };

  // Calculate the indexes for the current page
  const indexOfLastBooking = (currentPage + 1) * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (currentBookings.length === 0) {
    return <div>No bookings found.</div>;
  }

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
          </ul>
        </div>
      </nav>
      <br />
      <br />
      <br></br>
      <h1 id="app2" className="text-center">
        My Bookings <i className="fa fa-list" aria-hidden="true"></i>
      </h1>

      <div className="row">
        {currentBookings.map((booking, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Booking Number: {booking.bookid}</h5>
                <p className="card-text">
                  <FontAwesomeIcon icon={faCalendarAlt} /> <strong>Date of Booking:</strong> {new Date(booking.selectdate).toLocaleDateString()}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faTicketAlt} /> <strong>Ticket Type:</strong> {booking.tickettype}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faUser} /> <strong>Adult Count:</strong> {booking.adultcount}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faUser} /> <strong>Children Count:</strong> {booking.childrencount}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faUser} /> <strong>Name:</strong> {booking.name}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {booking.email}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faPhone} /> <strong>Phone Number:</strong> {booking.phonenumber}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faMapPin} /> <strong>Pincode:</strong> {booking.pincode}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faDollarSign} /> <strong>Amount:</strong> RS.{booking.amount.toFixed(2)}
                </p>
                <button className="btn btn-primary" onClick={() => downloadPDF(booking)}>
                  <FontAwesomeIcon icon={faDownload} /> Download your Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
        breakLabel={'...'}
        pageCount={Math.ceil(bookings.length / bookingsPerPage)}
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
  );
};

export default MyBookingPage;


