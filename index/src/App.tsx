import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import BrandValues from './components/sections/BrandValues';
import Products from './components/sections/Products';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-gray-900"
    >
      <Header />
      <main>
        <Hero />
        <About />
        <BrandValues />
        <Products />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;