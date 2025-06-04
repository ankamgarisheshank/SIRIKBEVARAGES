import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Check, PlusCircle, MinusCircle, ShoppingBag, X } from 'lucide-react';

interface ProductType {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface CartItem extends ProductType {
  quantity: number;
}

interface AddressType {
  name: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
}

const Products: React.FC = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [address, setAddress] = useState<AddressType>({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    landmark: ''
  });

  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  const products: ProductType[] = [
    {
      id: 1,
      name: "Classic Nannari",
      description: "Our flagship drink featuring the earthy, aromatic Nannari root that's been cherished for centuries in South India. Lightly carbonated with a subtle sweetness and cooling properties.",
      image: "https://res.cloudinary.com/dnbqgzh4t/image/upload/v1748967137/brr1234eqwo1ipgvgq9j.webp",
      price: 80
    },
    {
      id: 2,
      name: "Ginger Zest",
      description: "The perfect blend of traditional Nannari with a zesty kick of ginger. This invigorating combination offers both digestive benefits and a refreshing flavor profile.",
      image: "https://res.cloudinary.com/dnbqgzh4t/image/upload/v1748967137/abrvpq0hujmvesap3zry.jpg",
      price: 150
    },
    {
      id: 3,
      name: "Mint Refresh",
      description: "A cooling combination of Nannari and fresh mint that delivers the ultimate refreshment. Perfect for hot days when you need something crisp and revitalizing.",
      image: "https://res.cloudinary.com/dnbqgzh4t/image/upload/v1748967136/scjqo8svxo0epy8smlma.jpg",
      price: 200
    }
  ];

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    const productToAdd = products[currentProduct];
    const existingItem = cart.find(item => item.id === productToAdd.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === productToAdd.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      ));
    } else {
      setCart([...cart, { ...productToAdd, quantity }]);
    }

    setQuantity(1);
    setShowCart(true);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToCheckout = () => {
    setShowAddressForm(true);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkPincode = async () => {
    if (!address.pincode || address.pincode.length !== 6) {
      setPincodeError('Please enter a valid 6-digit pincode');
      return false;
    }

    setIsCheckingPincode(true);
    setPincodeError(null);

    try {
      // In a real app, you would call an API to validate the pincode
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - in reality you'd get this from your API
      const mockPincodeData: Record<string, { city: string; state: string }> = {
        '600001': { city: 'Chennai', state: 'Tamil Nadu' },
        '560001': { city: 'Bengaluru', state: 'Karnataka' },
        '400001': { city: 'Mumbai', state: 'Maharashtra' },
        '110001': { city: 'New Delhi', state: 'Delhi' },
        '700001': { city: 'Kolkata', state: 'West Bengal' }
      };

      if (mockPincodeData[address.pincode]) {
        setAddress(prev => ({
          ...prev,
          city: mockPincodeData[address.pincode].city,
          state: mockPincodeData[address.pincode].state
        }));
        return true;
      } else {
        setPincodeError('Delivery not available for this pincode');
        return false;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setPincodeError('Error checking pincode. Please try again.');
      return false;
    } finally {
      setIsCheckingPincode(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValidPincode = await checkPincode();
    if (isValidPincode) {
      setShowAddressForm(false);
      setShowPayment(true);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would integrate with a payment gateway here
    // For demo purposes, we'll just simulate a successful payment
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowPayment(false);
        setCart([]);
        setAddress({
          name: '',
          phone: '',
          pincode: '',
          address: '',
          city: '',
          state: '',
          landmark: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="products" className="section bg-black relative">
      <div className="absolute inset-0 bg-gradient-radial from-accent-900/20 via-transparent to-transparent opacity-30"></div>
      <div className="container-custom relative">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-gradient">Our Products</h2>
          <p className="section-subtitle mx-auto">
            Good for the Gut. Great for the Gram.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Product Image */}
          <div className="relative">
            <motion.div
              className="product-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              key={products[currentProduct].id}
            >
              <img
                src={products[currentProduct].image}
                alt={products[currentProduct].name}
                className="w-full h-[600px] object-cover rounded-2xl"
              />
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevProduct}
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-gray-900/80 text-white p-3 rounded-full backdrop-blur-sm hover:bg-gray-800 transition-colors duration-300"
              aria-label="Previous product"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextProduct}
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gray-900/80 text-white p-3 rounded-full backdrop-blur-sm hover:bg-gray-800 transition-colors duration-300"
              aria-label="Next product"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            key={`details-${products[currentProduct].id}`}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
          >
            <h3 className="text-3xl font-bold mb-4 text-gradient">{products[currentProduct].name}</h3>
            <p className="text-lg text-gray-300 mb-6">{products[currentProduct].description}</p>
            
            {/* Product Features */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-white">Features:</h4>
              <ul className="space-y-3">
                {["Low Sugar", "Low Calorie", "Added Prebiotics", "Vegan"].map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-900/50 text-primary-400 flex items-center justify-center mr-3">
                      <Check size={14} />
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and Add to Cart */}
            <div className="border-t border-gray-800 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-white">
                  ₹{products[currentProduct].price} <span className="text-gray-400 text-lg">only</span>
                </span>
                <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700"
                    aria-label="Decrease quantity"
                  >
                    <MinusCircle size={20} />
                  </button>
                  <span className="px-4 font-medium text-white">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700"
                    aria-label="Increase quantity"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
              </div>

              <button 
                className="btn-primary w-full"
                onClick={addToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowCart(false)}
            ></div>
            <div className="absolute top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-gradient">Your Cart</h3>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
                      <p className="text-gray-400">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div>
                              <h4 className="font-medium text-white">{item.name}</h4>
                              <p className="text-gray-400">₹{item.price} × {item.quantity}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium text-white mr-4">₹{item.price * item.quantity}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-xl font-bold text-white">₹{getTotalPrice()}</span>
                    </div>
                    <button 
                      className="btn-primary w-full"
                      onClick={proceedToCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Address Form */}
        {showAddressForm && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowAddressForm(false)}
            ></div>
            <div className="absolute top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-gradient">Delivery Address</h3>
                  <button 
                    onClick={() => setShowAddressForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <form onSubmit={handleAddressSubmit}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-gray-400 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={address.name}
                          onChange={handleAddressChange}
                          placeholder="Enter your full name"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={address.phone}
                          onChange={handleAddressChange}
                          placeholder="Enter your phone number"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Pincode</label>
                        <div className="flex">
                          <input
                            type="text"
                            name="pincode"
                            value={address.pincode}
                            onChange={handleAddressChange}
                            placeholder="Enter 6-digit pincode"
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                            maxLength={6}
                          />
                          <button
                            type="button"
                            onClick={checkPincode}
                            disabled={isCheckingPincode || !address.pincode || address.pincode.length !== 6}
                            className="ml-2 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors"
                          >
                            {isCheckingPincode ? 'Checking...' : 'Check'}
                          </button>
                        </div>
                        {pincodeError && (
                          <p className="text-red-500 text-sm mt-1">{pincodeError}</p>
                        )}
                      </div>

                      {address.city && address.state && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-400 mb-2">City</label>
                            <input
                              type="text"
                              name="city"
                              value={address.city}
                              readOnly
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 mb-2">State</label>
                            <input
                              type="text"
                              name="state"
                              value={address.state}
                              readOnly
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-gray-400 mb-2">Full Address</label>
                        <textarea
                          name="address"
                          value={address.address}
                          onChange={handleAddressChange}
                          placeholder="House no, Building, Street, Area"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          rows={3}
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Landmark (Optional)</label>
                        <input
                          type="text"
                          name="landmark"
                          value={address.landmark || ''}
                          onChange={handleAddressChange}
                          placeholder="Nearby landmark"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!address.city || !address.state || isCheckingPincode}
                      className="btn-primary w-full"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Section */}
        {showPayment && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowPayment(false)}
            ></div>
            <div className="absolute top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-gradient">Payment Details</h3>
                  <button 
                    onClick={() => setShowPayment(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {paymentSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={48} className="text-green-400" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">Payment Successful!</h4>
                      <p className="text-gray-400 mb-6">Thank you for your purchase</p>
                      <div className="bg-gray-800/50 p-4 rounded-lg mb-6 text-left">
                        <h5 className="font-bold text-white mb-2">Delivery Address</h5>
                        <p className="text-gray-300">{address.name}</p>
                        <p className="text-gray-300">{address.address}</p>
                        <p className="text-gray-300">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-gray-300">Phone: {address.phone}</p>
                        {address.landmark && (
                          <p className="text-gray-300">Landmark: {address.landmark}</p>
                        )}
                      </div>
                      <p className="text-gray-500">Order total: ₹{getTotalPrice()}</p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Order Summary</h4>
                        <div className="space-y-3">
                          {cart.map(item => (
                            <div key={item.id} className="flex justify-between">
                              <span className="text-gray-400">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="text-white">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between">
                          <span className="font-semibold text-white">Total</span>
                          <span className="font-bold text-white">₹{getTotalPrice()}</span>
                        </div>
                      </div>

                      <div className="mb-6 bg-gray-800/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">Delivery Address</h5>
                        <p className="text-gray-300">{address.name}</p>
                        <p className="text-gray-300">{address.address}</p>
                        <p className="text-gray-300">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-gray-300">Phone: {address.phone}</p>
                        {address.landmark && (
                          <p className="text-gray-300">Landmark: {address.landmark}</p>
                        )}
                      </div>

                      <form onSubmit={handlePayment}>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-gray-400 mb-2">Card Number</label>
                            <input 
                              type="text" 
                              placeholder="1234 5678 9012 3456" 
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-400 mb-2">Expiry Date</label>
                              <input 
                                type="text" 
                                placeholder="MM/YY" 
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 mb-2">CVV</label>
                              <input 
                                type="text" 
                                placeholder="123" 
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Name on Card</label>
                            <input 
                              type="text" 
                              placeholder="John Doe" 
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                              required
                            />
                          </div>

                          <button 
                            type="submit"
                            className="btn-primary w-full mt-8"
                          >
                            Pay ₹{getTotalPrice()}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-6 text-center text-gradient">Compare With Sugary Soft Drinks</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-700 px-4 py-3 text-left text-white">Criteria</th>
                  <th className="border border-gray-700 px-4 py-3 text-left text-white">SIRIK</th>
                  <th className="border border-gray-700 px-4 py-3 text-left text-white">Cola/Soda</th>
                  <th className="border border-gray-700 px-4 py-3 text-left text-white">Herbal Juice</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Low Sugar", sirik: true, cola: false, herbal: true },
                  { name: "Gut-Friendly Prebiotics", sirik: true, cola: false, herbal: true },
                  { name: "Preservative-Free", sirik: true, cola: false, herbal: true },
                  { name: "Ancient Ingredients", sirik: true, cola: false, herbal: true },
                  { name: "Light, Fizzy Format", sirik: true, cola: true, herbal: false },
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-700">
                    <td className="border border-gray-700 px-4 py-3 text-gray-300">{row.name}</td>
                    <td className="border border-gray-700 px-4 py-3">
                      {row.sirik ? (
                        <span className="text-primary-400">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </td>
                    <td className="border border-gray-700 px-4 py-3">
                      {row.cola ? (
                        <span className="text-primary-400">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </td>
                    <td className="border border-gray-700 px-4 py-3">
                      {row.herbal ? (
                        <span className="text-primary-400">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Drink Guide */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center text-gradient">How to Drink SIRIK</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Chill", description: "Store in the refrigerator for at least 2 hours for optimal refreshment." },
              { step: "Pour", description: "Gently pour into a glass with ice for the perfect fizz experience." },
              { step: "Sip", description: "Take small sips to fully appreciate the complex flavors and subtle sweetness." },
              { step: "Glow", description: "Feel the refreshing goodness as your body absorbs the beneficial prebiotics." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
              >
                <div className="bg-primary-900/50 text-primary-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-bold mb-2 text-gradient">{item.step}</h4>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;