import React, { useState } from 'react';
import { Heart, Trash2, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../components/Layout';
import headphone from '../pics/waireless.webp'
import tshirt from '../pics/cotton.jpeg'
import sunglass from '../pics/sunglass.jpg'
const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 129.99,
      image: headphone,
      availability: "In Stock",
      rating: 4.5,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 34.50,
      image: tshirt,
      availability: "In Stock",
      rating: 4.0,
      category: "Clothing"
    },
    {
      id: 3,
      name: "Sunglass",
      price: 24.99,
      image: sunglass,
      availability: "Out of Stock",
      rating: 4.8,
      category: "Accessories"
    }
  ]);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Recently Added");

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const addToCart = (id) => {
    // In a real app, this would add the item to the cart
    alert(`Added item ${id} to cart!`);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setIsSortOpen(false);
    
    let sortedItems = [...wishlistItems];
    
    switch(option) {
      case "Price: Low to High":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "Name: A to Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name: Z to A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Recently Added - keep original order
        break;
    }
    
    setWishlistItems(sortedItems);
  };

  return (
    <Layout>
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{wishlistItems.length} items saved</p>
        </div>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center space-x-1 text-gray-700 border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm hover:bg-gray-50"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <span>Sort: {sortOption}</span>
            {isSortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="py-1">
                {["Recently Added", "Price: Low to High", "Price: High to Low", "Name: A to Z", "Name: Z to A"].map((option) => (
                  <li 
                    key={option} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    onClick={() => handleSort(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Browse our collection and save items you love</p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
              <div className="relative h-64 bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => removeFromWishlist(item.id)} 
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Trash2 size={16} className="text-gray-700" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-lg font-bold text-indigo-600">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg 
                        key={index}
                        className={`h-4 w-4 ${index < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>
                
                {/* Availability */}
                <div className="mb-4">
                  <span className={`text-sm ${item.availability === "In Stock" ? "text-green-600" : "text-red-600"}`}>
                    {item.availability}
                  </span>
                </div>
                
                {/* Action Button */}
                <button 
                  onClick={() => addToCart(item.id)}
                  disabled={item.availability !== "In Stock"}
                  className={`w-full flex items-center justify-center py-2 px-4 border rounded-md text-sm font-medium shadow-sm ${
                    item.availability === "In Stock" 
                      ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  {item.availability === "In Stock" ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Quick Actions */}
      {wishlistItems.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => setWishlistItems([])}
          >
            Clear Wishlist
          </button>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => alert("Add all to cart feature would go here")}
          >
            Add All to Cart
          </button>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default WishList;