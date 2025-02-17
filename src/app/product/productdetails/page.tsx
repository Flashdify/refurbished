'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Extract product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the product details using the ID
      fetch(`https://pharmaconnect-backend.onrender.com/products/getProduct/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching product details.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-700">
            Product Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="mx-auto mb-4"
                unoptimized
              />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-green-600 font-bold text-2xl mb-4">${product.price}</p>
              <div className="flex gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium transition-transform transform hover:scale-105">
                  Add to Cart
                </button>
                <Link
                  href="/product"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-medium transition-transform transform hover:scale-105"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails;
