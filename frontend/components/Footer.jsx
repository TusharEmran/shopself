import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, CreditCard, Truck, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust badges section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <CreditCard size={28} className="text-indigo-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">Secure Payment</h3>
              <p className="mt-2 text-sm">All major credit cards accepted</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck size={28} className="text-indigo-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">Fast Shipping</h3>
              <p className="mt-2 text-sm">Free delivery on orders over $50</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={28} className="text-indigo-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">Satisfaction Guarantee</h3>
              <p className="mt-2 text-sm">30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About & Contact */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-bold text-white mb-4">ShopEase</h2>
            <p className="mb-4">Your one-stop destination for all your shopping needs. Quality products, competitive prices, and exceptional customer service.</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-indigo-400" />
                <span>123 Commerce St, Shopping City</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-indigo-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-indigo-400" />
                <span>support@shopease.com</span>
              </div>
            </div>
          </div>
          
          {/* Shop Categories */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-bold text-white mb-4">Shop Categories</h2>
            <ul className="space-y-2">
              <li><a href="/category/women" className="hover:text-indigo-400 transition-colors">Women</a></li>
              <li><a href="/category/men" className="hover:text-indigo-400 transition-colors">Men</a></li>
              <li><a href="/category/kids" className="hover:text-indigo-400 transition-colors">Kids</a></li>
              <li><a href="/category/accessories" className="hover:text-indigo-400 transition-colors">Accessories</a></li>
              <li><a href="/category/home" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="/category/sale" className="hover:text-indigo-400 transition-colors">Sale</a></li>
              <li><a href="/new-arrivals" className="hover:text-indigo-400 transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-bold text-white mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li><a href="/contact-us" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
              <li><a href="/shipping-policy" className="hover:text-indigo-400 transition-colors">Shipping & Delivery</a></li>
              <li><a href="/returns-policy" className="hover:text-indigo-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="/track-order" className="hover:text-indigo-400 transition-colors">Track Order</a></li>
              <li><a href="/size-guide" className="hover:text-indigo-400 transition-colors">Size Guide</a></li>
              <li><a href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Newsletter & Social */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Stay Connected</h2>
            <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="mb-6">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900" 
                />
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-sm text-center md:text-left">
            &copy; {currentYear} ShopEase. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="/terms" className="text-sm hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-sm hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="/cookies" className="text-sm hover:text-indigo-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;