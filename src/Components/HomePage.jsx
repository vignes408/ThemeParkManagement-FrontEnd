// import React, { useEffect, useState } from 'react';
// import './HomePage.css'
// import bgimage from '../Images/bgimage.jpg'
// import bgimage1 from '../Images/bgimage1.jpg'
// import map from '../Images/map.jpg'

// function HomePage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const userToken = sessionStorage.getItem('userToken');
//     const user = sessionStorage.getItem('user');

//     if (userToken && user) {
//       setIsLoggedIn({ token: userToken, token1: user });
//     }
//   }, []);

//   const handleBookNowChange = (event) => {
//     window.location.href = event.target.value;
//   };

//   return (
//     <div>
//       <div>
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
//             <li className="nav-item">
//               <a className="nav-link text-dark" href="https://maps.app.goo.gl/g6YU1jUfQFddN2AR9">ABOUT</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-dark" href="#offers">OFFERS</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-dark" href="/userlogin">BOOKNOW</a>
//             </li>
//             <li className="nav-item">
//               <select className="nav-select text-dark" onChange={handleBookNowChange}>
//                 <option value="#" className='text-dark'>LOGIN</option>
//                 <option value="/adminlogin" className='text-dark'>ADMIN</option>
//                 <option value="/userlogin" className='text-dark'>USERS</option>
//                 <option className='text-dark'>STAFFS</option>
//               </select>
//             </li>
//             {isLoggedIn && (
//               <li className="nav-item">
//                 <a className="nav-link text-dark" href="/userprofile">
//                   <i className="fa fa-user-circle-o" id='usericon'></i>
//                 </a>
//               </li>
//             )}
//           </ul>
//         </div>
//       </nav>
//       </div>
//       <div className='container-fluid' id='mark'>
//         <marquee>Discover wonderful adventures at WonderLAAA and explore the awstruck rides and events Grab your offers!!!</marquee>
//       </div>
//       <div className='container'>
//             <img src={bgimage1} id='bgimg'/>
//       </div>
//       <h3 id="rideatt">Rides and Attractions</h3>
//       <div className='container-fluid'>
//             <div className='row'>
//               <div className='col-md-3'>
//                 <div className='card bg-light'>
//                 <div className='card-body'>
//                     <img id='card1' src='https://www.familyvacationcritic.com/wp-content/uploads/sites/19/2015/04/family-theme-park-hero.jpg' className='img-fluid'></img>
//                     <h4 id="rideatt">Family Rides</h4>
//                     <p id='p1'>Creating memories <br></br>One family ride at a time</p>
//                   </div>
//                 </div>
//               </div>
//               <div className='col-md-3'>
//                 <div className='card bg-light'>
//                   <div className='card-body'>
//                     <img id='card1' src='https://www.whitewaterwest.com/wp-content/uploads/2020/02/super-flume-water-ride-everland-theme-park-korea.jpg' className='img-fluid'></img>
//                     <h4 id="rideatt">Water Rides</h4>
//                     <p id='p1'>Make a splash with every thrilling turn</p>
//                   </div>
//                 </div>
//               </div>
//               <div className='col-md-3'>
//                 <div className='card bg-light'>
//                 <div className='card-body'>
//                     <img id='card1' src='https://th.bing.com/th/id/OIP.mgDc3FvkAGFSq_gwSloKhQHaF_?rs=1&pid=ImgDetMain' className='img-fluid'></img>
//                     <h4 id="rideatt">Dry Rides</h4>
//                     <p id='p1'>Fun and Excitement<br></br>not water required</p>
//                   </div>
//                 </div>
//               </div>
//               <div className='col-md-3'>
//                 <div className='card bg-light'>
//                 <div className='card-body'>
//                     <img id='card1' src='https://adventureisland.co.uk/wp-content/uploads/2021/02/Ramba-AD-Day-1-LOW-RES-051220-270-min.jpg' className='img-fluid'></img>
//                     <h4 id="rideatt">Adventure Rides</h4>
//                     <p id='p1'>Where every twist and frop fuels your adventure!</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//       </div>
//       <div className='container' id="mapcon">
//         <h3 id='maptext'>Find your way!</h3>
//         <img src={map} id='mapimg'></img>
//       </div>
//       <h3 id='maptext'>Great Deals!</h3>
//       <div className='container'>
//         <div className='row'>
//           <div className='col-md-4'>
//             <div className='card bg-light'>
//               <div className='card-body'>
//                   <div className='card-title'>
//                     <h4 id='cardtxt1'>Group Booking</h4>
//                     </div>
//                     <img id='card2' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/57/4d/c6/caption.jpg?w=1200&h=-1&s=1' className='img-fluid'></img>
//               </div>
//             </div>
//           </div>
//           <div className='col-md-4'>
//             <div className='card bg-light'>
//               <div className='card-body'>
//                 <div className='card-title'>
//                   <h4 id='cardtxt1'>Student Discount</h4>
//                 </div>
//                 <img id='card2' src='https://image.freepik.com/free-photo/group-friends-is-enjoying-amusement-park_53876-29754.jpg' className='img-fluid'></img>
//               </div>
//             </div>
//           </div>
//           <div className='col-md-4'>
//             <div className='card bg-light'>
//               <div className='card-body'>
//                   <div className='card-title'>
//                     <h4 id='cardtxt1'>Festival Offers</h4>
//                     </div>
//                     <img id='card2' src='https://th.bing.com/th/id/OIP.6IypL_lsAzml0GbUKtSiZQAAAA?rs=1&pid=ImgDetMain' className='img-fluid'></img>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='container-fluid'>
//       <footer class="text-center text-lg-start bg-body-tertiary text-muted">
//     <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
//       <div class="me-5 d-none d-lg-block">
//         <span>Get connected with us on social networks:</span>
//       </div>
//     </section>
//     <section class="">
//       <div class="container text-center text-md-start mt-5">
//         <div class="row mt-3">
//           <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
//             <h6 class="text-uppercase fw-bold mb-4">
//             <i className="fa-solid fa-plane-departure"></i> VickeeGooo
//             </h6>
//             <p>
//               Here you can use rows and columns to organize your footer content. Lorem ipsum
//               dolor sit amet, consectetur adipisicing elit.
//             </p>
//           </div>
//           <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
//             <h6 class="text-uppercase fw-bold mb-4">
//               Services
//             </h6>
//             <p>
//               <a href="#!" class="text-reset">Book Flights</a>
//             </p>
//             <p>
//               <a href="#!" class="text-reset">Refund and Cancellation</a>
//             </p>
//             <p>
//               <a href="#!" class="text-reset">Flexi Ticket</a>
//             </p>
//             <p>
//               <a href="#!" class="text-reset">Smart Reschedule</a>
//             </p>
//           </div>
//           <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
//             <h6 class="text-uppercase fw-bold mb-4">
//               Useful links
//             </h6>
//             <p>
//               <a href="#!" class="text-reset">Pricing</a>
//             </p>
//             <p>
//               <a href="#!" class="text-reset">Settings</a>
//             </p>
//             <p>
//               <a href="#!" class="text-reset">Book Status</a>
//             </p>
//             <p>
//               <a href="#!" class="text-reset">Help</a>
//             </p>
//           </div>
//           <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
//             <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
//             <p><i class="fas fa-home me-3"></i>Mee_vickee</p>
//             <p>
//               <i class="fas fa-envelope me-3"></i>
//               vickeegooo@example.com
//             </p>
//             <p><i class="fas fa-phone me-3"></i> 9626183890</p>
//             <p><i class="fas fa-print me-3"></i> 9943136702</p>
//           </div>
//         </div>
//       </div>
//     </section>
//     <div class="text-center p-4">
//       © 2024 Copyright:
//       <a class="text-reset fw-bold" href="https://mdbootstrap.com/">VickeeGooo.com</a>
//     </div>
//   </footer>
//       </div>
//     </div>
//   );
// }

// export default HomePage;


import React, { useEffect, useState } from 'react';
import './HomePage.css';
import bgimage1 from '../Images/bgimage1.jpg';
import map from '../Images/map.jpg';
import Chatbot from '../Components/Chatbot'

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = sessionStorage.getItem('userToken');
    const user = sessionStorage.getItem('user');

    if (userToken && user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleBookNowClick = () => {
    if (isLoggedIn) {
      window.location.href = '/book';
    } else {
      window.location.href = '/userlogin';
    }
  };

  return (
    <div>
      <div>
        <nav className='navbar navbar-expand-lg bg-light fixed-top'>
          <div className='container-fluid'>
            <a href="/" className="navbar-brand">
              <img
                src='https://png.pngtree.com/png-clipart/20230914/original/pngtree-theme-park-vector-png-image_12147439.png'
                alt="Logo"
                className="logo"
                id='logoimg'
              />
              <h6 className='text-dark' id='logoname'>WONDERLA</h6>
            </a>
          </div>
          <div className="container-fluid justify-content-end" id="vicky">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-dark active" href="/">HOME</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="https://maps.app.goo.gl/g6YU1jUfQFddN2AR9">ABOUT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#mapcon">OFFERS</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-dark" onClick={handleBookNowClick}>BOOKNOW</button>
              </li>
              <li className="nav-item">
                <select className="nav-select text-dark" onChange={(e) => window.location.href = e.target.value}>
                  <option value="#" className='text-dark'>LOGIN</option>
                  <option value="/adminlogin" className='text-dark'>ADMIN</option>
                  <option value="/userlogin" className='text-dark'>USERS</option>
                  {/* <option value="#" className='text-dark'>STAFFS</option> */}
                </select>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/userprofile">
                    <i className="fa fa-user-circle-o" id='usericon'></i>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <div className='container-fluid' id='mark'>
        <marquee>Discover wonderful adventures at WonderLAAA and explore the awstruck rides and events Grab your offers!!!</marquee>
      </div>
      <div className='container'>
        <img src={bgimage1} id='bgimg' alt="Background" />
      </div>
      <h3 id="rideatt">Rides and Attractions</h3>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='card bg-light'>
              <div className='card-body'>
                <img
                  id='card1'
                  src='https://www.familyvacationcritic.com/wp-content/uploads/sites/19/2015/04/family-theme-park-hero.jpg'
                  className='img-fluid'
                  alt="Family Rides"
                />
                <h4 id="rideatt">Family Rides</h4>
                <p id='p1'>Creating memories <br />One family ride at a time</p>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card bg-light'>
              <div className='card-body'>
                <img
                  id='card1'
                  src='https://www.whitewaterwest.com/wp-content/uploads/2020/02/super-flume-water-ride-everland-theme-park-korea.jpg'
                  className='img-fluid'
                  alt="Water Rides"
                />
                <h4 id="rideatt">Water Rides</h4>
                <p id='p1'>Make a splash with every thrilling turn</p>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card bg-light'>
              <div className='card-body'>
                <img
                  id='card1'
                  src='https://th.bing.com/th/id/OIP.mgDc3FvkAGFSq_gwSloKhQHaF_?rs=1&pid=ImgDetMain'
                  className='img-fluid'
                  alt="Dry Rides"
                />
                <h4 id="rideatt">Dry Rides</h4>
                <p id='p1'>Fun and Excitement<br />not water required</p>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card bg-light'>
              <div className='card-body'>
                <img
                  id='card1'
                  src='https://adventureisland.co.uk/wp-content/uploads/2021/02/Ramba-AD-Day-1-LOW-RES-051220-270-min.jpg'
                  className='img-fluid'
                  alt="Adventure Rides"
                />
                <h4 id="rideatt">Adventure Rides</h4>
                <p id='p1'>Where every twist and frop fuels your adventure!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container' id="mapcon">
        <h3 id='maptext'>Find your way!</h3>
        <img src={map} id='mapimg' alt="Map" />
      </div>
      <h3 id='maptext' className='text-center'>Great Deals!</h3>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card bg-light'>
              <div className='card-body'>
                <div className='card-title'>
                  <h4 id='cardtxt1'>Group Booking</h4>
                </div>
                <img
                  id='card2'
                  src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/57/4d/c6/caption.jpg?w=1200&h=-1&s=1'
                  className='img-fluid'
                  alt="Group Booking"
                />
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card bg-light'>
              <div className='card-body'>
                <div className='card-title'>
                  <h4 id='cardtxt1'>Student Discount</h4>
                </div>
                <img
                  id='card2'
                  src='https://image.freepik.com/free-photo/group-friends-is-enjoying-amusement-park_53876-29754.jpg'
                  className='img-fluid'
                  alt="Student Discount"
                />
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card bg-light'>
              <div className='card-body'>
                <div className='card-title'>
                  <h4 id='cardtxt1'>Festival Offers</h4>
                </div>
                <img
                  id='card2'
                  src='https://th.bing.com/th/id/OIP.6IypL_lsAzml0GbUKtSiZQAAAA?rs=1&pid=ImgDetMain'
                  className='img-fluid'
                  alt="Festival Offers"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <footer className="text-center text-lg-start bg-body-tertiary text-muted">
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>
          </section>
          <section>
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    Wonderla
                  </h6>
                  <p>
                  Near,Relevantz Technology Services,
                  Kamaraj College of Engineering and Technology,
                  Madurai
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Services</h6>
                  <p><a href="#!" className="text-reset">Book Tickets</a></p>
                  <p><a href="#!" className="text-reset">Flexi Ticket</a></p>
                  <p><a href="#!" className="text-reset">Smart Reschedule</a></p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                  <p><a href="#!" className="text-reset">Pricing</a></p>
                  <p><a href="#!" className="text-reset">Settings</a></p>
                  <p><a href="#!" className="text-reset">Help</a></p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p><i className="fas fa-home me-3"></i>Mee_vickee</p>
                  <p><i className="fas fa-envelope me-3"></i>vickeegooo@example.com</p>
                  <p><i className="fas fa-phone me-3"></i> 9626183890</p>
                  <p><i className="fas fa-print me-3"></i> 9943136702</p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-center p-4">
            © 2024 Copyright:
            <a className="text-reset fw-bold" href="https://mdbootstrap.com/">wonderla.com</a>
          </div>
        </footer>
      </div>
      <Chatbot />
    </div>
  );
}

export default HomePage;
