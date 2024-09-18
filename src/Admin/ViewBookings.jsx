
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaIdCard, FaUser, FaEnvelope, FaPhone, FaMapPin, FaCalendarAlt, FaTicketAlt, FaDollarSign, FaChevronLeft, FaChevronRight, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Chart, registerables } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import './ViewBookings.css';

Chart.register(...registerables);

function ViewBookings() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [filters, setFilters] = useState({
        searchTerm: '',
        bookingId: '',
        name: '',
        email: '',
        selectedDate: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:5678/book/allbook')
            .then((response) => {
                setRecords(response.data);
                setFilteredRecords(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleLogout = () => {
        window.location.href = '/';
    };

    const handleBack = () => {
        navigate('/adminhome');
    };

    useEffect(() => {
        const {
            searchTerm, bookingId, name, email, selectedDate
        } = filters;

        const lowercasedFilter = searchTerm.toLowerCase();

        const filtered = records.filter(record => {
            return (
                (bookingId ? record.bookid.toString().includes(bookingId) : true) &&
                (name ? record.name.toLowerCase().includes(name.toLowerCase()) : true) &&
                (email ? record.email.toLowerCase().includes(email.toLowerCase()) : true) &&
                (selectedDate ? new Date(record.selectdate).toDateString() === new Date(selectedDate).toDateString() : true) &&
                (searchTerm ? Object.values(record).some(value => 
                    value ? value.toString().toLowerCase().includes(lowercasedFilter) : false
                ) : true)
            );
        });

        setFilteredRecords(filtered);
        setCurrentPage(1); 
    }, [filters, records]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };


    const totalPages = Math.ceil(filteredRecords.length / bookingsPerPage);
    const currentRecords = filteredRecords.slice((currentPage - 1) * bookingsPerPage, currentPage * bookingsPerPage);


    const totalAmount = filteredRecords.reduce((sum, record) => sum + record.amount, 0);
    const totalBookings = filteredRecords.length;
    const ticketTypeCounts = filteredRecords.reduce((acc, record) => {
        acc[record.tickettype] = (acc[record.tickettype] || 0) + 1;
        return acc;
    }, {});

    const amountByPerson = filteredRecords.reduce((acc, record) => {
        acc[record.name] = (acc[record.name] || 0) + record.amount;
        return acc;
    }, {});


    const amountByPersonData = {
        labels: Object.keys(amountByPerson),
        datasets: [{
            label: 'Total Amount by Person',
            data: Object.values(amountByPerson),
            backgroundColor: '#36A2EB',
        }]
    };


    const ticketTypeChartData = {
        labels: Object.keys(ticketTypeCounts),
        datasets: [{
            data: Object.values(ticketTypeCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
    };

    const dailyBookingsCounts = filteredRecords.reduce((acc, record) => {
        const date = new Date(record.selectdate).toDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const dailyBookingsData = {
        labels: Object.keys(dailyBookingsCounts),
        datasets: [{
            label: 'Total Bookings per Day',
            data: Object.values(dailyBookingsCounts),
            backgroundColor: '#FFCE56',
        }]
    };

    return (
        <Container className="my-4">
            <nav className="navbar navbar-expand-lg navbar bg-light fixed-top">
                <a className="navbar-brand" href="/" id='adminnav'>WONDERLA</a>
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
            <h1 className="text-center mb-4" id='bookinfo'>BOOKING INFO</h1>
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="shadow-sm p-3 mb-3 bg-warning">
                        <Card.Body className='bg-warning'>
                            <Card.Title className='text-dark'>Total Bookings</Card.Title>
                            <h6 className="display-4"><strong>{totalBookings}</strong></h6>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow-sm p-3 mb-3 bg-warning">
                        <Card.Body className='bg-warning'>
                            <Card.Title className='text-dark'>Total Amount</Card.Title>
                            <h6 className="display-4"><strong>Rs.{totalAmount.toFixed(2)}</strong></h6>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Booking Amount by Person</Card.Title>
                            <Bar
                                data={amountByPersonData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false },
                                        tooltip: { callbacks: { label: (context) => `Amount: Rs.${context.raw}` } }
                                    },
                                    scales: {
                                        x: { beginAtZero: true }
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Ticket Type Distribution</Card.Title>
                            <Pie
                                data={ticketTypeChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'bottom' },
                                        tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}` } }
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={12}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Bookings Per Day</Card.Title>
                            <Bar
                                data={dailyBookingsData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false },
                                        tooltip: { callbacks: { label: (context) => `Bookings: ${context.raw}` } }
                                    },
                                    scales: {
                                        x: { beginAtZero: true, title: { display: true, text: 'Date' } },
                                        y: { beginAtZero: true, title: { display: true, text: 'Number of Bookings' } }
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h2 className="text-center mb-4">Booking Details</h2>
            <Row className="mb-4">
                <Col md={12}>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Group controlId="searchTerm">
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search..."
                                        name="searchTerm"
                                        value={filters.searchTerm}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="bookingId">
                                    <Form.Label>Booking ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Booking ID"
                                        name="bookingId"
                                        value={filters.bookingId}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="name">
                                    <Form.Label>Booker Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={filters.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={4}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email ID</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={filters.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="selectedDate">
                                    <Form.Label>Selected Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="selectedDate"
                                        value={filters.selectedDate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {currentRecords.map((d, i) => (
                    <Col key={i} md={4} className="mb-3">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title><FaIdCard /> Booking ID: {d.bookid}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"><FaUser /> Person Name: {d.name}</Card.Subtitle>
                                <Card.Text>
                                    <FaEnvelope /> <strong>Email ID: </strong> {d.email} <br />
                                    <FaPhone /> <strong>Phone Number: </strong> {d.phonenumber} <br />
                                    <FaCalendarAlt /> <strong>Booking Date: </strong> {d.selectdate}<br />
                                    <FaTicketAlt /> <strong>Ticket Type:</strong> {d.tickettype}<br />
                                    <strong>Adult Admit:</strong> {d.adultcount}<br />
                                    <strong>Child Admit:</strong> {d.childrencount}<br />
                                    <strong>Amount: </strong> Rs.{d.amount} <br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="mt-4">
                <Col className="text-center">
                    <Button 
                        variant="primary" 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <FaChevronLeft /> Previous
                    </Button>
                    <span className="mx-2">Page {currentPage} of {totalPages}</span>
                    <Button 
                        variant="primary" 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next <FaChevronRight />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ViewBookings;
