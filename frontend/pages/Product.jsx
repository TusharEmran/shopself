import React, { useState, useEffect } from 'react';
import { Filter, X, ShoppingBag, Star, ArrowUpDown, ChevronDown, Search } from 'lucide-react';
import Layout from '../components/Layout';

const Products = () => {
  // Products state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  
  // Mobile filter drawer state
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  
  // Available filter options
  const categories = ['Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'Electronics'];
  const colors = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Brown', 'Multicolor'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Best Rating' }
  ];
  
  // Mock product data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Classic White T-Shirt",
          category: "Men",
          price: 29.99,
          rating: 4.8,
          reviewCount: 120,
          image: "/images/white-tshirt.jpg",
          colors: ["White", "Black", "Gray"],
          sizes: ["S", "M", "L", "XL"],
          date: "2025-01-15"
        },
        // ... (other product objects from previous code)
      ];
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);
  
  // Apply filters whenever filter states change
  useEffect(() => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Apply size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch(sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured'
        // Keep the original order
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategories, selectedColors, selectedSizes, priceRange, sortBy]);
  
  // Toggle filter functions
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };
  
  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('featured');
  };
  
  // Handle price range change
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };
  
  // Render stars for ratings
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={index < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };
  
  // Check if any filter is active
  const isFilterActive = () => {
    return (
      searchQuery !== '' || 
      selectedCategories.length > 0 || 
      selectedColors.length > 0 || 
      selectedSizes.length > 0 || 
      priceRange[0] > 0 || 
      priceRange[1] < 1000
    );
  };
  
  // Add to Cart function
  const addToCart = async (product) => {
    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      if (res.ok) {
        alert('Added to cart!');
      } else {
        alert('Failed to add to cart. Please login.');
      }
    } catch (err) {
      alert('Error adding to cart');
    }
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header with title, search, and sort */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">All Products</h1>
            
            {/* Mobile filter button */}
            <button 
              className="md:hidden flex items-center mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              onClick={() => setShowFilterDrawer(true)}
            >
              <Filter size={18} className="mr-2" />
              Filters
              {isFilterActive() && (
                <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>
            
            {/* Search and sort */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
              <div className="w-full sm:w-auto relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="w-full sm:w-auto relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  {isFilterActive() && (
                    <button 
                      onClick={resetFilters}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Reset All
                    </button>
                  )}
                </div>
                
                {/* Categories Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Colors Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Colors</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-2 py-1 text-xs rounded-md ${
                          selectedColors.includes(color) 
                            ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-600' 
                            : 'bg-gray-100 text-gray-800 border border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Sizes Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Sizes</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-10 h-10 flex items-center justify-center text-sm rounded-md ${
                          selectedSizes.includes(size) 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-600">$</span>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                    />
                    <span className="text-sm text-gray-600">to</span>
                    <span className="text-sm text-gray-600">$</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full h-1 bg-gray-200 rounded-md appearance-none"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full h-1 bg-gray-200 rounded-md appearance-none top-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filter Drawer */}
            {showFilterDrawer && (
              <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilterDrawer(false)}></div>
                <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={() => setShowFilterDrawer(false)}>
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="overflow-y-auto h-full pb-24 px-4">
                    {isFilterActive() && (
                      <div className="py-4 border-b">
                        <button 
                          onClick={resetFilters}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    )}
                    
                    {/* Categories Filter */}
                    <div className="py-4 border-b">
                      <h3 className="font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map(category => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="ml-2">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Colors Filter */}
                    <div className="py-4 border-b">
                      <h3 className="font-medium mb-3">Colors</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {colors.map(color => (
                          <button
                            key={color}
                            onClick={() => toggleColor(color)}
                            className={`px-2 py-1 text-xs rounded-md ${
                              selectedColors.includes(color) 
                                ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-600' 
                                : 'bg-gray-100 text-gray-800 border border-gray-300'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sizes Filter */}
                    <div className="py-4 border-b">
                      <h3 className="font-medium mb-3">Sizes</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`w-10 h-10 flex items-center justify-center text-sm rounded-md ${
                              selectedSizes.includes(size) 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div className="py-4">
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm text-gray-600">$</span>
                        <input
                          type="number"
                          min="0"
                          max={priceRange[1]}
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                        />
                        <span className="text-sm text-gray-600">to</span>
                        <span className="text-sm text-gray-600">$</span>
                        <input
                          type="number"
                          min={priceRange[0]}
                          max="1000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="w-full h-1 bg-gray-200 rounded-md appearance-none"
                        />
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="w-full h-1 bg-gray-200 rounded-md appearance-none absolute top-0"
                        />
                      </div>
                    </div>
                    
                    <div className="py-4 sticky bottom-0 bg-white border-t mt-4">
                      <button 
                        onClick={() => setShowFilterDrawer(false)}
                        className="w-full bg-indigo-600 text-white py-3 rounded-md"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="animate-pulse">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg h-80"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
                  <button 
                    onClick={resetFilters} 
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <X size={16} className="mr-2" />
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Active Filters */}
                  {isFilterActive() && (
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium">Active Filters:</span>
                        
                        {selectedCategories.map(category => (
                          <button
                            key={`cat-${category}`}
                            onClick={() => toggleCategory(category)}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-sm rounded-md"
                          >
                            {category}
                            <X size={14} className="ml-1" />
                          </button>
                        ))}
                        
                        {selectedColors.map(color => (
                          <button
                            key={`color-${color}`}
                            onClick={() => toggleColor(color)}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-sm rounded-md"
                          >
                            {color}
                            <X size={14} className="ml-1" />
                          </button>
                        ))}
                        
                        {selectedSizes.map(size => (
                          <button
                            key={`size-${size}`}
                            onClick={() => toggleSize(size)}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-sm rounded-md"
                          >
                            Size: {size}
                            <X size={14} className="ml-1" />
                          </button>
                        ))}
                        
                        {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                          <button
                            onClick={() => setPriceRange([0, 1000])}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-sm rounded-md"
                          >
                            Price: ${priceRange[0]} - ${priceRange[1]}
                            <X size={14} className="ml-1" />
                          </button>
                        )}
                        
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-sm rounded-md"
                          >
                            Search: "{searchQuery}"
                            <X size={14} className="ml-1" />
                          </button>
                        )}
                        
                        <button 
                          onClick={resetFilters}
                          className="inline-flex items-center px-2 py-1 text-indigo-600 text-sm ml-auto"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Results Count */}
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">
                      Showing {filteredProducts.length} products
                    </p>
                  </div>
                  
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="group">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                          {/* Product Image */}
                          <div className="relative pt-[100%] bg-gray-100">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                            <button 
                              className="absolute bottom-4 right-4 bg-indigo-600 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              onClick={() => addToCart(product)}
                            >
                              <ShoppingBag size={18} />
                            </button>
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.category}</p>
                              </div>
                              <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                            </div>
                            
                            {/* Rating and Reviews */}
                            <div className="mt-2 flex items-center">
                              {renderStars(product.rating)}
                              <span className="ml-1 text-sm text-gray-500">
                                ({product.reviewCount})
                              </span>
                            </div>
                            
                            {/* Colors and Sizes */}
                            <div className="mt-3">
                              <div className="flex flex-wrap gap-1 mb-2">
                                {product.colors.slice(0, 3).map(color => (
                                  <span 
                                    key={`${product.id}-${color}`}
                                    className="w-4 h-4 rounded-full border border-gray-200"
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    title={color}
                                  />
                                ))}
                                {product.colors.length > 3 && (
                                  <span className="text-xs text-gray-500">
                                    +{product.colors.length - 3} more
                                  </span>
                                )}
                              </div>
                              
                              {product.sizes.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {product.sizes.slice(0, 4).map(size => (
                                    <span 
                                      key={`${product.id}-${size}`}
                                      className="text-xs px-2 py-1 bg-gray-100 rounded"
                                    >
                                      {size}
                                    </span>
                                  ))}
                                  {product.sizes.length > 4 && (
                                    <span className="text-xs text-gray-500">
                                      +{product.sizes.length - 4} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;