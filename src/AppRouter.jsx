import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import AdminLogin from './LoginFolder/AdminLogin';
import RegisterPage from './LoginFolder/RegisterPage';
import UserLogin from './LoginFolder/UserLogin';
import UserProfile from './User/UserProfile';
import AdminHome from './Admin/AdminHome';
import ManageRole from './Admin/ManageRole';
import AssignTasks from './Admin/AssignTasks';
import ManageRides from './Admin/ManageRides';
import ViewRides from './Admin/ViewRides';
import ViewTasks from './Admin/ViewTasks';
import ViewRoles from './Admin/ViewRoles';
import Maintainence from './Admin/Maintainence';
import ViewEvents from './Admin/ViewEvents';
import BookingPage from './User/BookingPage';
import PaymentPage from './User/PaymentPage';
import TicketDetails from './User/TicketDetails';
import MyBookingPage from './User/MyBookingPage';
import Attraction from './Admin/Attraction';
import ViewBookings from './Admin/ViewBookings';
import SendEmails from './Admin/SendEmails';
import Chatbot from './Components/Chatbot';

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/userlogin' element={<UserLogin />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path='/adminhome' element={<AdminHome />} />
            <Route path='/addrole' element={<ManageRole />} />
            <Route path='/addtask' element={<AssignTasks />} />
            <Route path='/addrides' element={<ManageRides />} />
            <Route path='/viewrides' element={<ViewRides />} />
            <Route path='/viewtasks' element={<ViewTasks />} />
            <Route path='/viewroles' element={<ViewRoles />} />
            <Route path='/viewmaintain' element={<Maintainence />} />
            <Route path='/viewevents' element={<ViewEvents />} />
            <Route path='/book' element={<BookingPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/ticket' element={<TicketDetails />} />
            <Route path='/mybook' element={<MyBookingPage />} />
            <Route path='/attract' element={<Attraction />} />
            <Route path='/allbook' element={<ViewBookings />} />
            <Route path='/sendall' element={<SendEmails />} />
            <Route path='/chat' element={<Chatbot />} />
        </Routes>
    </Router>
  )
}

export default AppRouter
