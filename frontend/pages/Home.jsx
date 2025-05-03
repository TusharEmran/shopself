import Layout from '../components/Layout';
import { Star, ShoppingBag } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Shoe from '../pics/shoe.jpg';
import HeadPhone from '../pics/headphone.jpg';
import Shirts from '../pics/shirts.jpg';
import Man from '../pics/man.jpg';
import Women from '../pics/women.jpg';
import Boy from '../pics/boy.jpg';
import Watch from '../pics/watch.jpg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import dummy product images
import Product1 from '../pics/waireless.webp';
import Product2 from '../pics/latherwallet.jpg';
import Product3 from '../pics/cotton.jpeg';
import Product4 from '../pics/smartwatch.webp';
import Product5 from '../pics/runningsheos.webp';
import Product6 from '../pics/denimjeans.jpg';
import Product7 from '../pics/sunglass.jpg';
import Product8 from '../pics/backpack.avif';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dummy product images array
  const dummyProductImages = [
    Product1, Product2, Product3, Product4,
    Product5, Product6, Product7, Product8
  ];

  useEffect(() => {
    // Use only fallback dummy products, no API call
    setProducts([
      {
        _id: '1',
        title: 'Wireless Headphones',
        price: 99.99,
        category: 'Electronics',
        dummyImage: Product1
      },
      {
        _id: '2',
        title: 'Leather Wallet',
        price: 49.99,
        category: 'Accessories',
        dummyImage: Product2
      },
      {
        _id: '3',
        title: 'Cotton T-Shirt',
        price: 24.99,
        category: 'Clothing',
        dummyImage: Product3
      },
      {
        _id: '4',
        title: 'Smart Watch',
        price: 199.99,
        category: 'Electronics',
        dummyImage: Product4
      },
      {
        _id: '5',
        title: 'Running Shoes',
        price: 89.99,
        category: 'Footwear',
        dummyImage: Product5
      },
      {
        _id: '6',
        title: 'Denim Jeans',
        price: 59.99,
        category: 'Clothing',
        dummyImage: Product6
      },
      {
        _id: '7',
        title: 'Sunglasses',
        price: 79.99,
        category: 'Accessories',
        dummyImage: Product7
      },
      {
        _id: '8',
        title: 'Backpack',
        price: 69.99,
        category: 'Accessories',
        dummyImage: Product8
      }
    ]);
    setLoading(false);
  }, []);

  const categories = [
    { name: "Women", image: Women },
    { name: "Men", image: Man },
    { name: "Kids", image: Boy },
    { name: "Accessories", image: Watch }
  ];

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star key={index} size={16} className={index < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
      ))}
    </div>
  );

  const addToCart = async (productId, quantity = 1) => {
    try {
      alert('Added to cart!');
    } catch (err) {
      alert('Failed to add to cart. Please login.');
    }
  };

  return (
    <Layout>
      <section className="relative w-full h-[400px] sm:h-[630px]">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          showStatus={false}
          showArrows={true}
          dynamicHeight={false}
          className="h-[400px] sm:h-[630px]"
        >
          <div>
            <img src={Shoe} alt="Shoe" className="object-cover w-screen h-[400px] sm:h-[630px]" />
          </div>
          <div>
            <img src={HeadPhone} alt="Headphone" className="object-cover w-screen h-[400px] sm:h-[630px]" />
          </div>
          <div>
            <img src={Shirts} alt="Shirts" className="object-cover w-screen h-[400px] sm:h-[630px]" />
          </div>
        </Carousel>
        <div className="absolute inset-0 flex flex-col justify-center text-white bg-opacity-30 px-4 sm:left-15">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow-lg">Welcome to ShopEase</h1>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 drop-shadow-lg">Discover the best deals on fashion, electronics, and more!</p>
          <Link to="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-md w-fit text-center font-medium text-sm sm:text-base">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} to={`/category/${category.name.toLowerCase()}`} className="group">
                <div>
                  <div className="relative overflow-hidden rounded-lg shadow-md h-64">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-800 text-center">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                      <Link to={`/product/${product._id}`} className="block relative">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                          <img 
                            src={product.dummyImage} 
                            alt={product.title} 
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>
                        <div className="p-4">
                          <span className="text-sm text-gray-500">{product.category}</span>
                          <h3 className="text-lg font-medium mb-2 group-hover:text-indigo-600 transition-colors">
                            {product.title}
                          </h3>
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                            <button 
                              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors" 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                addToCart(product._id); 
                              }}
                            >
                              <ShoppingBag size={18} />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center">
                            {renderStars(4.5)} {/* Using a fixed rating for dummy data */}
                            <span className="ml-2 text-sm text-gray-500">(24)</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/products" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-md transition-colors">
                  View All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Limited Time Offer</h2>
          <p className="text-xl mb-8">Get 20% off on your first purchase. Use code: <span className="font-bold">WELCOME20</span></p>
          <Link to="/category/sale" className="inline-block bg-white text-indigo-600 hover:bg-gray-100 py-3 px-8 rounded-md transition-colors font-medium">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-8">Stay updated with our latest offers and new arrivals.</p>
          <div className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-l-md focus:outline-none border-2 border-gray-300 focus:border-indigo-500" 
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-r-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;