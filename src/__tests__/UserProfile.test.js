import React from "react";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProfile from '../User/UserProfile'
describe('admin home', () => {
  beforeEach(()=>{
    render(
        <MemoryRouter>
            <UserProfile />
        </MemoryRouter>
    );
  });

    it('renders user nav', () =>{
        const logo = screen.getByText(/MY BOOKINGS/i);
        expect(logo).toBeInTheDocument();
        });


    it('renders user nav', () =>{
        const logo = screen.getByText(/LOGOUT/i);
        expect(logo).toBeInTheDocument();
        });
    
    it('renders user nav', () =>{
        const logo = screen.getByText(/WONDERLA/i);
        expect(logo).toBeInTheDocument();
        });
        
})
