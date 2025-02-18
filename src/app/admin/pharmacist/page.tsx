'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import Sidebar from '@/app/components/sidebar';  // Import the Sidebar component

const categories = [
  "Pain Relief",
  "Cough & Cold",
  "Supplements",
  "First Aid",
  "Allergy",
  "Personal Care"
];

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState('addProduct');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pharmaconnect-backend.onrender.com/products/getAllProduct');
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://pharmaconnect-backend.onrender.com/products/deleteProduct/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      setError('Error deleting the product.');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://pharmaconnect-backend.onrender.com/products/addProduct', newProduct);
      setProducts([...products, response.data.data]);
      setNewProduct({ name: '', description: '', price: '', category: '', image: '' });
    } catch (error) {
      setError('Error adding product.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} /> {/* Use Sidebar component */}
      <main className="flex-1 p-8 overflow-auto bg-gray-100">
        {selectedSection === 'addProduct' && (
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-6 max-w-2xl mx-auto">
              <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" className="p-4 border border-gray-300 rounded-lg w-full shadow-sm" required />
              <textarea name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Product Description" className="p-4 border border-gray-300 rounded-lg w-full shadow-sm" required />
              <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" className="p-4 border border-gray-300 rounded-lg w-full shadow-sm" required />
              <select name="category" value={newProduct.category} onChange={handleInputChange} className="p-4 border border-gray-300 rounded-lg w-full shadow-sm" required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} placeholder="Image URL" className="p-4 border border-gray-300 rounded-lg w-full shadow-sm" required />
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Add Product</button>
            </form>
          </section>
        )}

        {selectedSection === 'productList' && (
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Product List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product._id} className="border border-gray-200 bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-lg font-bold text-green-600">${product.price}</p>
                  <div className="flex gap-4 mt-4">
                    <Link href={`/productdetails/${product._id}`} passHref>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedSection === 'orders' && (
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Orders Management (Coming Soon)</h2>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
