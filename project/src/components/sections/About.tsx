import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [refStory, inViewStory] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [refFounder, inViewFounder] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="section bg-black">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <motion.h2 
            className="section-title text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h2>
        </div>

        {/* Brand Story */}
        <motion.div 
          ref={refStory}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={inViewStory ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Born From Cravings.<br />Built Without Compromise.
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              SIRIK was created as a revolutionary soda alternative that combines ancient wisdom with modern science. We use real ingredients like Nannari root, add zero sugar, and avoid all preservatives to deliver clean, refreshing flavors.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Our mission isn't about canceling soda—it's about redefining it. We believe you deserve drinks that are both delicious and beneficial, without the guilt or artificial ingredients found in conventional sodas.
            </p>
            <p className="text-lg font-medium text-primary-400">
              Each can of SIRIK is crafted to provide a moment of joy that's good for your body and your taste buds.
            </p>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="product-card">
              <img 
                src="https://images.pexels.com/photos/5947020/pexels-photo-5947020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="SIRIK Beverage Production" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Founder Story */}
        <motion.div 
          ref={refFounder}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inViewFounder ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="product-card">
            <img 
              src="https://res.cloudinary.com/dnbqgzh4t/image/upload/v1749027629/raargd3djhdrycti37ci.avif" 
              alt="SIRIK Founder" 
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Meet the Mind Behind the Madness
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Growing up, Srikar YS was fascinated by the homemade Nannari drinks his family prepared—sweet, earthy, and incredibly refreshing. But as an engineer with a fast-paced lifestyle, he grew frustrated with the market's offerings: either sugar-loaded sodas or bland "healthy" alternatives.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              This frustration sparked an idea: What if he could recreate those authentic flavors from his childhood, but in a modern, convenient format without the sugar crash? After years of experimentation, SIRIK was born.
            </p>
            <p className="text-lg font-medium text-primary-400 italic">
              "SIRIK isn't here to ride a health trend. We're here to start a clean soda revolution."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;