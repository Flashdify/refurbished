'use client'
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductDetails from "../productdetails/page";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track any errors

  useEffect(() => {
    fetch("https://pharmaconnect-backend.onrender.com/products/getAllProduct") // Fetch all products from backend API
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setFeaturedProducts(data.data.slice(0, 4)); // Selecting first 4 products as featured
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message if any
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <section
        id="home"
        className="relative bg-sereneBlue-600 text-white h-[605px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/pharmacy-hero.jpg')" }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
            Your Trusted Pharmacy
          </h1>
          <p className="text-xl mb-8">
            Fast delivery, genuine products, and exceptional service.
          </p>
          <Link
            href="/product"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-8 py-3 rounded-lg font-bold shadow-md transition-transform transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section id="featured" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-700">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={product.image} // Ensure this URL is correct and accessible
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mx-auto mb-4"
                  unoptimized // Use this if you are fetching images from an external source and Next.js optimization is causing issues
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-green-600 font-bold text-xl mb-4">
                  ${product.price}
                </p>
                <Link href={`/productdetails/${product._id}`}>
  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium transition-transform transform hover:scale-105">
    View Details
  </button>
</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
