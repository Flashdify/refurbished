// components/Sidebar.js
import { useState } from 'react';

const categories = [
  "Pain Relief",
  "Cough & Cold",
  "Supplements",
  "First Aid",
  "Allergy",
  "Personal Care"
];

const Sidebar = ({ selectedSection, setSelectedSection }) => {
  return (
    <aside className="w-72 bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 flex flex-col items-center shadow-lg">
      <h2 className="text-3xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-6 w-full">
        <button onClick={() => setSelectedSection('addProduct')} className={`w-full text-left py-2 px-4 rounded-lg text-lg hover:bg-blue-400 transition ${selectedSection === 'addProduct' ? 'bg-blue-400' : ''}`}>Add Product</button>
        <button onClick={() => setSelectedSection('productList')} className={`w-full text-left py-2 px-4 rounded-lg text-lg hover:bg-blue-400 transition ${selectedSection === 'productList' ? 'bg-blue-400' : ''}`}>Product List</button>
        <button onClick={() => setSelectedSection('orders')} className={`w-full text-left py-2 px-4 rounded-lg text-lg hover:bg-blue-400 transition ${selectedSection === 'orders' ? 'bg-blue-400' : ''}`}>Orders</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
