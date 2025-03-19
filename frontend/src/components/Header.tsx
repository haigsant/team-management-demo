import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700';
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Team Management Logo" className="w-8 h-8 mr-2" />
            <span className="text-xl font-medium text-gray-900">Team Management</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
