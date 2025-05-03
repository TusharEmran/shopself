import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import Layout from '../components/Layout';

// Sample trending products data
const trendingProducts = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 39.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Fashion'
  },
  {
    id: 3,
    name: 'Smart Fitness Watch',
    price: 199.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Electronics'
  },
  {
    id: 4,
    name: 'Minimalist Leather Wallet',
    price: 59.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1591561954555-607968c141ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Accessories'
  },
];

const Trending = () => {
  const renderStars = (rating) => {
    return (
        
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
          />
        ))}
        <span className="ml-1 text-sm text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <Layout>
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <Link 
            to="/products" 
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View all <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  {renderStars(product.rating)}
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default Trending;