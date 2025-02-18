'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import MainAdminSidebar from '../components/mainAdminsidebar';  // Import the Sidebar component

const MainAdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState('orders');  // Default to 'orders'

  // Fetch orders, products, and pharmacists
  useEffect(() => {
    const fetchData = async () => {
      try {

        const productsResponse = await axios.get('https://pharmaconnect-backend.onrender.com/products/getAllProduct');

 
        setProducts(productsResponse.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="flex h-screen bg-gray-50">
      <MainAdminSidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />  {/* Use the Sidebar component */}
      <main className="flex-1 p-8 overflow-auto bg-gray-100">
        {selectedSection === 'orders' && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Management</h2>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h3>
                  <p className="text-gray-600">Customer: {order.customerName}</p>
                  <p className="text-gray-600">Total: ${order.totalAmount}</p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <div className="flex gap-4 mt-4">
                    {order.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleOrderApproval(order._id, 'approve')}
                          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleOrderApproval(order._id, 'reject')}
                          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">Action not available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedSection === 'products' && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product._id} className="border border-gray-200 bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="text-lg font-bold text-green-600">${product.price}</p>
                  <Link href={`/productdetails/${product._id}`} passHref>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      Edit Product
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedSection === 'pharmacists' && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pharmacist Management</h2>
            <div className="space-y-6">
              {pharmacists.map((pharmacist) => (
                <div key={pharmacist._id} className="border border-gray-200 bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800">Pharmacist: {pharmacist.name}</h3>
                  <p className="text-gray-600">Email: {pharmacist.email}</p>
                  <p className="text-gray-600">Status: {pharmacist.status}</p>
                  <div className="flex gap-4 mt-4">
                    {pharmacist.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handlePharmacistApproval(pharmacist._id, 'approve')}
                          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handlePharmacistApproval(pharmacist._id, 'reject')}
                          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">Action not available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MainAdminPanel;
