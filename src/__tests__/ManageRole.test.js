import { render, screen} from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ManageRole from '../Admin/ManageRole';
 
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
 
jest.mock('axios');
jest.mock('react-router-dom');
afterEach(() => {
    mock.reset();
});
 
test('renders the page title and heading', () => {
    render(<BrowserRouter><ManageRole /></BrowserRouter>);
    const headingElement = screen.getByRole("personrole");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Person Name");
  });

  test('renders gender', () => {
    render(<BrowserRouter><ManageRole /></BrowserRouter>);
    const headingElement = screen.getByRole("genderrole");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Gender");
  });

  test('renders name', () => {
    render(<BrowserRouter><ManageRole /></BrowserRouter>);
    const headingElement = screen.getByRole("rolename");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Role Name");
  });

  test('renders description', () => {
    render(<BrowserRouter><ManageRole /></BrowserRouter>);
    const headingElement = screen.getByRole("descrole");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Description");
  });

  test('renders roleimage', () => {
    render(<BrowserRouter><ManageRole /></BrowserRouter>);
    const headingElement = screen.getByRole("roleimage");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Upload");
  });




 