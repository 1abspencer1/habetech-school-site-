
import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick, className }) => {
  return (
    <Link 
      to={to} 
      className={`nav-link ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
