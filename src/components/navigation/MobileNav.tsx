
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NavLink from './NavLink';
import DropdownMenu from './DropdownMenu';

interface NavLink {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
}

interface MobileNavProps {
  isOpen: boolean;
  navLinks: NavLink[];
  activeDropdown: string | null;
  handleDropdownClick: (name: string) => void;
  toggleMenu: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  navLinks,
  activeDropdown,
  handleDropdownClick,
  toggleMenu,
}) => {
  return (
    <div
      className={cn(
        'fixed inset-y-0 right-0 w-3/4 bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300 overflow-y-auto',
        isOpen ? 'translate-x-0' : 'translate-x-full',
        'md:hidden'
      )}
    >
      <div className="p-5">
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-school-navy"
        >
          <X className="h-6 w-6" />
        </button>

        <Link to="/" className="flex items-center space-x-2 mb-8" onClick={() => isOpen && toggleMenu()}>
          <span className="text-2xl font-serif font-bold text-school-navy">
            Academy
          </span>
        </Link>

        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <div key={link.name} className="py-1">
              {link.dropdown ? (
                <DropdownMenu
                  name={link.name}
                  dropdown={link.dropdown}
                  isMobile={true}
                  isActive={activeDropdown === link.name}
                  onToggle={() => handleDropdownClick(link.name)}
                  onItemClick={toggleMenu}
                />
              ) : (
                <NavLink
                  to={link.path}
                  className="block py-2"
                  onClick={toggleMenu}
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
          <div className="pt-4">
            <Link 
              to="/admissions#apply" 
              className="btn-primary block text-center"
              onClick={toggleMenu}
            >
              Enroll Now
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
