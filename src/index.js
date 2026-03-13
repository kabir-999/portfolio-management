import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{color: 'white', padding: '20px', textAlign: 'center'}}>
        <h2>Something went wrong</h2>
        <p>Please refresh the page or try again later.</p>
      </div>;
    }

    return this.props.children;
  }
}

// Add global error handler to catch any unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});

// Log when the DOM is ready
console.log('DOM Content Loaded, attempting to render React app...');

// Check if root element exists
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

try {
  const root = ReactDOM.createRoot(rootElement);
  console.log('React root created successfully');
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('Render method called');
} catch (error) {
  console.error('Failed to create React root or render:', error);
}
