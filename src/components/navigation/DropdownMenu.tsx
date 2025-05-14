
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import DropdownItem from './DropdownItem';

interface DropdownLink {
  name: string;
  path: string;
}

interface DropdownMenuProps {
  name: string;
  dropdown: DropdownLink[];
  isMobile?: boolean;
  isActive?: boolean;
  onToggle?: () => void;
  onItemClick?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  name, 
  dropdown, 
  isMobile = false, 
  isActive = false, 
  onToggle, 
  onItemClick 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Timer ref to handle delayed closing
  const closeTimerRef = React.useRef<number | null>(null);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    
    // Clear any pending close timer
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  
  const handleMouseLeave = () => {
    // Set a delay before closing the dropdown
    closeTimerRef.current = window.setTimeout(() => {
      setIsHovering(false);
    }, 300); // 300ms delay before closing
  };

  if (isMobile) {
    return (
      <div>
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full text-left nav-link py-2"
        >
          <span>{name}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isActive ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        {isActive && (
          <div className="ml-4 mt-2 flex flex-col space-y-2">
            {dropdown.map((item) => (
              <DropdownItem
                key={item.name}
                name={item.name}
                path={item.path}
                onClick={onItemClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="relative group" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center cursor-pointer nav-link">
        <span>{name}</span>
        <ChevronDown className="ml-1 h-4 w-4" />
        
        {/* Desktop Dropdown */}
        <div 
          className={`absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden min-w-[200px] z-50 ${
            isHovering ? 'block' : 'hidden group-hover:block'
          }`}
        >
          {dropdown.map((item) => (
            <DropdownItem
              key={item.name}
              name={item.name}
              path={item.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
