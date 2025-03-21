import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './components/AppRouter';

const App: React.FC = () => {
  return (
    <Router>
      <AppRouter />
      <ToastContainer />
    </Router>
  );
};

export default App;
