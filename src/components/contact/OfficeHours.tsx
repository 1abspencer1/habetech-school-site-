
import React from 'react';
import { Clock } from 'lucide-react';

const OfficeHours = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <Clock className="text-school-navy mr-2" />
        <h2 className="text-2xl font-bold text-school-navy font-serif">Office Hours</h2>
      </div>
      <table className="w-full">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-3 font-semibold">Monday - Friday</td>
            <td className="py-3">7:30 AM - 4:30 PM</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-3 font-semibold">Saturday</td>
            <td className="py-3">By appointment</td>
          </tr>
          <tr>
            <td className="py-3 font-semibold">Sunday</td>
            <td className="py-3">Closed</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-gray-600 text-sm">
        <p>Special hours may apply during holidays and school breaks.</p>
        <p className="mt-2">For appointments outside regular hours, please call (123) 456-7890.</p>
      </div>
    </div>
  );
};

export default OfficeHours;
