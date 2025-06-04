import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="https://res.cloudinary.com/dnbqgzh4t/image/upload/v1749029292/hiqzd2zatgky8pg9e4cv.jpg"
        >
          <source 
            src="https://player.vimeo.com/external/454544146.sd.mp4?s=4c3e13d9d6276b4440f5555c89d5d5576b4e3d59&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
        </video>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Ancient Cool.<br />Modern Fuel.
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl mb-12 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Indian roots. Global glow-up. Low sugar. Prebiotic. Vegan. Big vibe.
          </motion.p>

          {/* Scroll Indicator - moved above buttons */}
          <motion.div 
            className="mb-12 text-white flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown className="animate-bounce" size={24} />
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"  
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a 
              href="#products" 
              className="btn-primary text-lg px-12 py-4"
            >
              Shop Now
            </a>
            <a 
              href="#about" 
              className="btn-outline border-white text-white text-lg px-12 py-4"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-[1]"></div>
    </section>
  );
};

export default Hero;