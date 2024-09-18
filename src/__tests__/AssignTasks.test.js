import { render, screen} from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AssignTasks from '../Admin/AssignTasks' 
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

test('renders tasks', () => {
    render(<BrowserRouter><AssignTasks /></BrowserRouter>);
    const headingElement = screen.getByRole("taskhead");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Task Details");
  });

  test('renders task name', () => {
    render(<BrowserRouter><AssignTasks /></BrowserRouter>);
    const headingElement = screen.getByRole("tasknamerole");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Task");
  });

  test('renders task descrip', () => {
    render(<BrowserRouter><AssignTasks /></BrowserRouter>);
    const headingElement = screen.getByRole("taskdesc");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Task Description");
  });

  test('renders task person', () => {
    render(<BrowserRouter><AssignTasks /></BrowserRouter>);
    const headingElement = screen.getByRole("taskperson");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Person Name");
  });

  test('renders task submit', () => {
    render(<BrowserRouter><AssignTasks /></BrowserRouter>);
    const headingElement = screen.getByRole("tasksubmit");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Submit");
  });