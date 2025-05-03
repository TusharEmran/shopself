import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FunnelIcon, 
  StarIcon,
  ShoppingBagIcon,
  ArrowsUpDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Layout from '../components/Layout';

const Accessories = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Most Popular');
  const [filters, setFilters] = useState({
    category: [],
    material: [],
    color: [],
    price: ''
  });

  const products = [
    {
      id: 1,
      name: 'Leather Crossbody Bag',
      price: 89.99,
      rating: 4.8,
      reviewCount: 132,
      category: 'Bags',
      material: 'Leather',
      colors: ['Black', 'Brown'],
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Minimalist Silver Watch',
      price: 129.99,
      rating: 4.7,
      reviewCount: 98,
      category: 'Watches',
      material: 'Stainless Steel',
      colors: ['Silver'],
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Aviator Sunglasses',
      price: 59.99,
      rating: 4.5,
      reviewCount: 76,
      category: 'Eyewear',
      material: 'Acetate',
      colors: ['Gold', 'Black'],
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Wool Beanie',
      price: 29.99,
      rating: 4.3,
      reviewCount: 54,
      category: 'Hats',
      material: 'Wool',
      colors: ['Gray', 'Navy', 'Black'],
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Silk Scarf',
      price: 39.99,
      rating: 4.6,
      reviewCount: 67,
      category: 'Scarves',
      material: 'Silk',
      colors: ['Blue', 'Red', 'Green'],
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'Gold Hoop Earrings',
      price: 24.99,
      rating: 4.9,
      reviewCount: 143,
      category: 'Jewelry',
      material: 'Gold',
      colors: ['Gold'],
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filtersOptions = {
    category: ['Bags', 'Watches', 'Eyewear', 'Hats', 'Scarves', 'Jewelry', 'Belts', 'Wallets'],
    material: ['Leather', 'Stainless Steel', 'Gold', 'Silver', 'Wool', 'Silk', 'Acetate', 'Cotton'],
    color: ['Black', 'Brown', 'Silver', 'Gold', 'Blue', 'Red', 'Green', 'Gray', 'Navy'],
    price: ['Under $25', '$25 to $50', '$50 to $100', 'Over $100']
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'price') {
        return { ...prev, price: value };
      }
      
      const currentFilters = [...prev[filterType]];
      const index = currentFilters.indexOf(value);
      
      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }
      
      return { ...prev, [filterType]: currentFilters };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      material: [],
      color: [],
      price: ''
    });
  };

  const sortOptions = [
    'Most Popular',
    'Best Rating',
    'Newest',
    'Price: Low to High',
    'Price: High to Low'
  ];

  return (
    <Layout>
    <div className="bg-white">
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 border-t border-gray-200">
              {Object.entries(filtersOptions).map(([filterType, options]) => (
                <div key={filterType} className="border-t border-gray-200 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <span className="font-medium text-gray-900 capitalize">{filterType}</span>
                  </h3>
                  <div className="pt-6">
                    <div className="space-y-6">
                      {options.map((option) => (
                        <div key={option} className="flex items-center">
                          <input
                            id={`mobile-${filterType}-${option}`}
                            name={`${filterType}[]`}
                            type={filterType === 'price' ? 'radio' : 'checkbox'}
                            checked={
                              filterType === 'price' 
                                ? filters.price === option 
                                : filters[filterType].includes(option)
                            }
                            onChange={() => handleFilterChange(filterType, option)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`mobile-${filterType}-${option}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 mt-4">
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Accessories</h1>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  Sort
                  <ArrowsUpDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {sortOpen && (
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        className={`block px-4 py-2 text-sm w-full text-left ${selectedSort === option ? 'font-medium text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}
                        onClick={() => {
                          setSelectedSort(option);
                          setSortOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="hidden lg:block">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Clear all
                </button>
              </div>

              {Object.entries(filtersOptions).map(([filterType, options]) => (
                <div key={filterType} className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <span className="font-medium text-gray-900 capitalize">{filterType}</span>
                  </h3>
                  <div className="pt-6">
                    <div className="space-y-4">
                      {options.map((option) => (
                        <div key={option} className="flex items-center">
                          <input
                            id={`${filterType}-${option}`}
                            name={`${filterType}[]`}
                            type={filterType === 'price' ? 'radio' : 'checkbox'}
                            checked={
                              filterType === 'price' 
                                ? filters.price === option 
                                : filters[filterType].includes(option)
                            }
                            onChange={() => handleFilterChange(filterType, option)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`${filterType}-${option}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link to={`/product/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.material}</p>
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={`h-4 w-4 ${rating < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                              aria-hidden="true"
                            />
                          ))}
                          <span className="ml-1 text-xs text-gray-500">
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                    <button className="mt-2 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <ShoppingBagIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                      Add to bag
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </Layout>
  );
};

export default Accessories;