import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../../components/sections/Contact';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    a: 'a',
  },
  useInView: () => true,
}));

// Mock sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Contact Component', () => {
  it('renders contact form with all fields', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('renders contact information', () => {
    render(<Contact />);
    
    expect(screen.getByText(/hello@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1 \(555\) 123-4567/i)).toBeInTheDocument();
    expect(screen.getByText(/San Francisco, CA/i)).toBeInTheDocument();
  });
});