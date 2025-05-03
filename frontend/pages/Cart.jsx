import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X } from 'lucide-react';
import Layout from '../components/Layout';
import cotton from '../pics/cotton.jpeg';
import dress from '../pics/dress.avif';
import pent from '../pics/denimjeans.jpg';


const Cart = () => {
  // Sample cart data - in a real app, this would come from context/state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic T-Shirt",
      price: 29.99,
      quantity: 2,
      image: cotton,
      size: "M",
      color: "White"
    },
    {
      id: 2,
      name: "Summer Floral Dress",
      price: 59.99,
      quantity: 1,
      image: dress,
      size: "S",
      color: "Multicolor"
    },
    {
      id: 3,
      name: "Casual Denim Jeans",
      price: 89.99,
      quantity: 1,
      image: pent,
      size: "L",
      color: "Blue"
    }
  ]);

  // Sample promo codes
  const [promoCodes] = useState({
    "WELCOME20": 20,
    "SUMMER10": 10
  });

  // Cart state
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10.99;
  const discount = (subtotal * appliedDiscount) / 100;
  const tax = (subtotal - discount) * 0.08; // Assuming 8% tax
  const total = subtotal + shipping + tax - discount;

  // Handle quantity change
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Handle promo code application
  const applyPromoCode = () => {
    if (!promoCode) {
      setPromoError("Please enter a promo code");
      return;
    }
    
    if (promoCodes[promoCode]) {
      setAppliedDiscount(promoCodes[promoCode]);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedDiscount(0);
    }
  };

  // Clear promo code
  const clearPromoCode = () => {
    setPromoCode("");
    setAppliedDiscount(0);
    setPromoError("");
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <a 
              href="/products" 
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Remove</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16 rounded overflow-hidden">
                              <img className="h-full w-full object-cover" src={item.image} alt={item.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">
                                Size: {item.size} | Color: {item.color}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:text-indigo-600"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-1 border-x">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:text-indigo-600"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <a 
                  href="/products" 
                  className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Continue Shopping
                </a>
                
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={`w-full px-4 py-3 rounded-md border ${promoError ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {appliedDiscount > 0 && (
                      <button 
                        onClick={clearPromoCode}
                        className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    )}
                    <button 
                      onClick={applyPromoCode}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="mt-1 text-sm text-red-500">{promoError}</p>}
                  {appliedDiscount > 0 && <p className="mt-1 text-sm text-green-600">Promo code applied: {appliedDiscount}% off</p>}
                </div>
              </div>
            </div>
            
            {/* Order Summary Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md transition-colors mt-6">
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-sm text-gray-600 mb-2">We Accept</h3>
                    <div className="flex space-x-2">
                      <div className="bg-gray-100 rounded p-2 w-12">
                        <div className="w-full h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="bg-gray-100 rounded p-2 w-12">
                        <div className="w-full h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="bg-gray-100 rounded p-2 w-12">
                        <div className="w-full h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="bg-gray-100 rounded p-2 w-12">
                        <div className="w-full h-4 bg-gray-300 rounded"></div>
                      </div>
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

export default Cart;