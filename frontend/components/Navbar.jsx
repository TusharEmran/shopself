import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../pics/shopease.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "Women", "Men", "Kids", "Accessories"
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Main Navigation */}
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="ShopEase Logo"
                className="h-40 w-auto px-2 z-20"
              />
            </Link>
          </div>
          
          {/* Desktop Menu - Show on md screens and up */}
          <div className="hidden md:flex space-x-4 lg:space-x-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/category/${category.toLowerCase()}`}
                className="text-gray-600 hover:text-indigo-600 px-2 py-2 text-sm font-medium"
              >
                {category}
              </Link>
            ))}
          </div>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Search - Hidden on mobile, different width on tablet */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-40 lg:w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="absolute right-3 top-2 text-gray-400 hover:text-indigo-600">
                <Search size={20} />
              </button>
            </div>
            
            {/* Additional links for iPad - hidden on mobile and desktop */}
            <div className="hidden md:flex lg:hidden space-x-3">
              <Link to="/new-arrivals" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                New
              </Link>
              <Link to="/trending" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                Trending
              </Link>
            </div>
            
            {/* Wishlist - Hidden on mobile, shown on tablet and up */}
            <Link to="/wishlist" className="hidden md:block text-gray-600 hover:text-indigo-600 relative">
              <Heart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
            </Link>
            
            {/* Cart - Always shown */}
            <Link to="/cart" className="text-gray-600 hover:text-indigo-600 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
            </Link>
            
            {/* Account - Hidden on mobile, shown on tablet and up */}
            <Link to="/login" className="hidden md:block text-gray-600 hover:text-indigo-600">
              <User size={24} />
            </Link>
            
            {/* Mobile menu button - Hidden on tablet and up */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {/* Search input for mobile */}
            <div className="relative px-3 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="absolute right-6 top-4 text-gray-400 hover:text-indigo-600">
                <Search size={20} />
              </button>
            </div>
            
            {/* Categories for mobile */}
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.toLowerCase()}`}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              >
                {category}
              </Link>
            ))}
            
            {/* Additional links for mobile */}
            <Link to="/new-arrivals"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 border-t border-gray-200"
            >
              New Arrivals
            </Link>
            
            <Link
              to="/trending"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
            >
              Trending Now
            </Link>
            
            {/* Account links for mobile */}
            <Link
              to="/account"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 border-t border-gray-200"
            >
              <div className="flex items-center space-x-2">
                <User size={20} />
                <span>My Account</span>
              </div>
            </Link>
            
            <Link
              to="/wishlist"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                <Heart size={20} />
                <span>Wishlist</span>
                <span className="ml-auto bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;