import React from "react";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../Components/HomePage'

describe('booking page', () =>{
    beforeEach(()=>{
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
    });

    it('renders home nav', () =>{
        const logo = screen.getByText(/HOME/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders about nav', () =>{
        const logo = screen.getByText(/ABOUT/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders book nav', () =>{
        const logo = screen.getByText(/BOOKNOW/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders login nav', () =>{
        const logo = screen.getByText(/LOGIN/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders login nav', () =>{
        const logo = screen.getByText(/rides and attractions/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders login nav', () =>{
        const logo = screen.getByText(/Family Rides/i);
        expect(logo).toBeInTheDocument();
    });

    
    it('renders home', () =>{
        const logo = screen.getByText(/Water Rides/i);
        expect(logo).toBeInTheDocument();
    });

    
    it('renders home', () =>{
        const logo = screen.getByText(/Dry Rides/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders home', () =>{
        const logo = screen.getByText(/Adventure Rides/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders map', () =>{
        const logo = screen.getByText(/Find your way!/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders Deals', () =>{
        const logo = screen.getByText(/Great Deals/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders deals', () =>{
        const logo = screen.getByText(/Group Booking/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders deals', () =>{
        const logo = screen.getByText(/Student Discount/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders deals', () =>{
        const logo = screen.getByText(/Festival Offers/i);
        expect(logo).toBeInTheDocument();
    });

    it('renders chatbot', () =>{
        const logo = screen.getByText(/Chat/i);
        expect(logo).toBeInTheDocument();
    });

})