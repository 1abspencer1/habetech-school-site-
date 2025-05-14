
import React from 'react';
import { Link } from 'react-router-dom';

interface DropdownItemProps {
  name: string;
  path: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ name, path, onClick }) => {
  return (
    <Link
      to={path}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

export default DropdownItem;
