'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const MainAdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders, products, and pharmacists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get('https://pharmaconnect-backend.onrender.com/orders/getAllOrders');
        const productsResponse = await axios.get('https://pharmaconnect-backend.onrender.com/products/getAllProduct');
        const pharmacistsResponse = await axios.get('https://pharmaconnect-backend.onrender.com/pharmacists/getAllPharmacists');
        
        setOrders(ordersResponse.data.data);
        setProducts(productsResponse.data.data);
        setPharmacists(pharmacistsResponse.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle order approval/rejection
  const handleOrderApproval = async (orderId, action) => {
    try {
      const response = await axios.patch(`https://pharmaconnect-backend.onrender.com/orders/approveOrder/${orderId}`, { action });
      if (action === 'approve') {
        setOrders(orders.map(order => (order._id === orderId ? { ...order, status: 'Approved' } : order)));
      } else {
        setOrders(orders.filter(order => order._id !== orderId));
      }
    } catch (error) {
      setError('Error updating order status.');
    }
  };

  // Handle pharmacist status (e.g. approve/reject)
  const handlePharmacistApproval = async (pharmacistId, action) => {
    try {
      const response = await axios.patch(`https://pharmaconnect-backend.onrender.com/pharmacists/approvePharmacist/${pharmacistId}`, { action });
      if (action === 'approve') {
        setPharmacists(pharmacists.map(pharmacist => (pharmacist._id === pharmacistId ? { ...pharmacist, status: 'Approved' } : pharmacist)));
      } else {
        setPharmacists(pharmacists.filter(pharmacist => pharmacist._id !== pharmacistId));
      }
    } catch (error) {
      setError('Error updating pharmacist status.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Panel</h1>

        {/* Order Management */}
        <div className="mb-12">
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
        </div>

        {/* Product Management */}
        <div className="mb-12">
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
        </div>

        {/* Pharmacist Management */}
        <div>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainAdminPanel;
