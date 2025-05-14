
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks } from './navigation/navData';
import MobileNav from './navigation/MobileNav';
import DesktopNav from './navigation/DesktopNav';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated as admin
    const checkAdmin = () => {
      const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
      setIsAdmin(isAuthenticated);
    };
    
    checkAdmin();
    
    // Listen for storage events (in case admin logs in/out in another tab)
    window.addEventListener('storage', checkAdmin);
    return () => {
      window.removeEventListener('storage', checkAdmin);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isAdminPage = location.pathname.startsWith('/admin');

  // Don't show navbar on admin pages
  if (isAdminPage) {
    return null;
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold text-school-navy">
            Academy
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-school-navy hover:text-school-gold"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
        <div className="flex items-center">
          <DesktopNav navLinks={navLinks} />

          {/* Admin Link - Only show for staff, not parents or students */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {isAdmin ? (
                  <Button 
                    asChild
                    className="ml-4 bg-school-navy hover:bg-school-navy/90"
                  >
                    <Link to="/admin/dashboard">
                      <Shield className="mr-2 h-5 w-5" />
                      Admin Dashboard
                    </Link>
                  </Button>
                ) : (
                  <Link 
                    to="/admin/login" 
                    className="ml-4 px-4 py-2 rounded-md transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Staff Login</span>
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent>
                {isAdmin ? "Go to admin dashboard" : "Staff login area"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Mobile Navigation */}
        <MobileNav
          isOpen={isOpen}
          navLinks={navLinks}
          activeDropdown={activeDropdown}
          handleDropdownClick={handleDropdownClick}
          toggleMenu={toggleMenu}
        />
      </div>
    </header>
  );
};

export default Navbar;
