import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShoppingCart, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

const NewArrivals = () => {
  // Mock data for new product arrivals
  const [newProducts, setNewProducts] = useState([
    {
      id: 1,
      name: "Ergonomic Wireless Mouse",
      price: 59.99,
      discount: 79.99,
      image: "/api/placeholder/500/500",
      category: "Electronics",
      badgeText: "New",
      badgeColor: "bg-indigo-500",
      isNew: true,
      isBestseller: false
    },
    {
      id: 2,
      name: "Premium Leather Wallet",
      price: 45.00,
      discount: null,
      image: "/api/placeholder/500/500",
      category: "Accessories",
      badgeText: "Limited",
      badgeColor: "bg-amber-500",
      isNew: true,
      isBestseller: true
    },
    {
      id: 3,
      name: "Smart Fitness Tracker",
      price: 89.99,
      discount: 129.99,
      image: "/api/placeholder/500/500",
      category: "Wearables",
      badgeText: "Sale",
      badgeColor: "bg-rose-500",
      isNew: true,
      isBestseller: false
    },
    {
      id: 4,
      name: "Organic Silk Sleep Mask",
      price: 24.50,
      discount: null,
      image: "/api/placeholder/500/500",
      category: "Wellness",
      badgeText: "New",
      badgeColor: "bg-indigo-500",
      isNew: true,
      isBestseller: false
    },
    {
      id: 5,
      name: "Minimalist Desk Lamp",
      price: 65.00,
      discount: 85.00,
      image: "/api/placeholder/500/500",
      category: "Home Decor",
      badgeText: "New",
      badgeColor: "bg-indigo-500",
      isNew: true,
      isBestseller: true
    },
    {
      id: 6,
      name: "Artisanal Coffee Mug",
      price: 18.99,
      discount: null,
      image: "/api/placeholder/500/500",
      category: "Kitchen",
      badgeText: "New",
      badgeColor: "bg-indigo-500",
      isNew: true,
      isBestseller: false
    }
  ]);

  // Active tab state
  const [activeTab, setActiveTab] = useState('all');

  // Filter products based on active tab
  const filteredProducts = () => {
    switch(activeTab) {
      case 'bestsellers':
        return newProducts.filter(product => product.isBestseller);
      case 'sale':
        return newProducts.filter(product => product.discount !== null);
      default:
        return newProducts;
    }
  };

  // Quick view modal state
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Function for adding to cart
  const addToCart = (id) => {
    // In a real app, this would add the item to the cart
    alert(`Added item ${id} to cart!`);
  };

  return (
    <Layout>
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
          <p className="text-gray-600 mt-2">Check out our latest collection of fresh products</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b border-gray-200">
          <button 
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'all' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All New
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'bestsellers' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('bestsellers')}
          >
            Bestsellers
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'sale' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('sale')}
          >
            On Sale
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filteredProducts().map((product) => (
          <div key={product.id} className="group relative">
            {/* Product Image with Badge and Quick View */}
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-90 transition">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
              
              {/* Badge */}
              {product.badgeText && (
                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold text-white rounded ${product.badgeColor}`}>
                  {product.badgeText}
                </span>
              )}
              
              {/* Quick View Button (appears on hover) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => openQuickView(product)}
                  className="bg-white bg-opacity-90 text-gray-900 rounded-full px-4 py-2 flex items-center font-medium text-sm shadow-md hover:bg-opacity-100 transition"
                >
                  <Eye size={16} className="mr-2" />
                  Quick View
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
                  {product.discount && (
                    <span className="text-xs text-gray-500 line-through">${product.discount.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product.id)}
              className="mt-3 w-full bg-gray-100 text-gray-800 hover:bg-gray-200 py-2 px-4 rounded-md flex items-center justify-center text-sm font-medium transition"
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      {/* View All Button */}
      <div className="mt-12 text-center">
        <a href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
          View All New Products
          <ArrowRight size={16} className="ml-2" />
        </a>
      </div>
      
      {/* Quick View Modal */}
      {isQuickViewOpen && quickViewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{quickViewProduct.name}</h3>
                <button 
                  onClick={() => setIsQuickViewOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                
                {/* Product Details */}
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">{quickViewProduct.category}</p>
                    {quickViewProduct.isBestseller && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                        Bestseller
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900">${quickViewProduct.price.toFixed(2)}</span>
                      {quickViewProduct.discount && (
                        <span className="ml-2 text-lg text-gray-500 line-through">${quickViewProduct.discount.toFixed(2)}</span>
                      )}
                    </div>
                    {quickViewProduct.discount && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${(quickViewProduct.discount - quickViewProduct.price).toFixed(2)} ({Math.round((1 - quickViewProduct.price / quickViewProduct.discount) * 100)}%)
                      </p>
                    )}
                  </div>
                  
                  <div className="prose prose-sm text-gray-700 mb-6">
                    <p>
                      Experience our newest addition to the collection. This premium {quickViewProduct.category.toLowerCase()} 
                      offers exceptional quality and modern design that complements any lifestyle.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct.id);
                        setIsQuickViewOpen(false);
                      }}
                      className="w-full bg-indigo-600 text-white hover:bg-indigo-700 py-3 px-4 rounded-md flex items-center justify-center text-sm font-medium transition"
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={() => setIsQuickViewOpen(false)}
                      className="mt-4 w-full bg-gray-100 text-gray-800 hover:bg-gray-200 py-3 px-4 rounded-md flex items-center justify-center text-sm font-medium transition"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default NewArrivals;