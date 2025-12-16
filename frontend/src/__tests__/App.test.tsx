import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the welcome message', () => {
    render(<App />);
    expect(screen.getByText(/Agentic Workshop Starter/i)).toBeInTheDocument();
  });

  it('displays the tech stack information', () => {
    render(<App />);
    expect(screen.getByText(/React 18 with TypeScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Tailwind CSS for styling/i)).toBeInTheDocument();
    expect(screen.getByText(/Express.js backend/i)).toBeInTheDocument();
  });

  it('shows API connection status section', () => {
    render(<App />);
    expect(screen.getByText(/API Connection Status/i)).toBeInTheDocument();
  });
});
