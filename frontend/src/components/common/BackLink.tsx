import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

interface BackLinkProps {
  to: string;
  text: string;
}

const BackLink: React.FC<BackLinkProps> = ({ to, text }) => {
  return (
    <Link to={to} className="inline-flex items-center text-sm font-medium text-blue-600 mb-4 block">
      <FiChevronLeft className="h-5 w-5 mr-1" />
      {text}
    </Link>
  );
};

export default BackLink;
