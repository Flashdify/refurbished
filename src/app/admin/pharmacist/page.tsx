'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  // Fetch products on initial load
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

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://pharmaconnect-backend.onrender.com/products/deleteProduct/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      setError('Error deleting the product.');
    }
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://pharmaconnect-backend.onrender.com/products/addProduct', newProduct);
      setProducts([...products, response.data.data]);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
      });
    } catch (error) {
      setError('Error adding product.');
    }
  };

  // Handle updating product state for new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Panel</h1>

        {/* Add Product Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-lg font-bold text-green-600">${product.price}</p>
                <div className="flex gap-4 mt-4">
                  <Link href={`/productdetails/${product._id}`} passHref>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      Edit Product
                    </button>
                  </Link>
                  <button
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete Product
                  </button>
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

export default AdminPanel;
