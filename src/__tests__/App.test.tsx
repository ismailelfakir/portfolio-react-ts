import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    h1: 'h1',
    p: 'p',
    a: 'a',
    section: 'section',
    nav: 'nav',
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useSpring: (value: any) => value,
  useInView: () => true,
  useTransform: (value: any) => value,
}));

// Mock theme provider
jest.mock('../components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
  });

  it('contains all main sections', () => {
    render(<App />);
    
    // Check for navigation elements
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    
    // Check for hero section
    expect(screen.getByText(/Digital Transformation & Skills Engineering/i)).toBeInTheDocument();
    
    // Check for CTA buttons
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });
});