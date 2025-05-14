
import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import DropdownMenu from './DropdownMenu';

interface NavLink {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
}

interface DesktopNavProps {
  navLinks: NavLink[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navLinks }) => {
  return (
    <nav className="hidden md:flex space-x-6 items-center">
      {navLinks.map((link) => (
        <div key={link.name} className="relative group">
          {link.dropdown ? (
            <DropdownMenu name={link.name} dropdown={link.dropdown} />
          ) : (
            <NavLink to={link.path}>
              {link.name}
            </NavLink>
          )}
        </div>
      ))}
      <Link 
        to="/admissions#apply" 
        className="btn-primary"
      >
        Enroll Now
      </Link>
    </nav>
  );
};

export default DesktopNav;
