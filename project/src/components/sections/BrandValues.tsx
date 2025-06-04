import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Zap, Heart, FlaskConical } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 transition-all duration-300 hover:bg-gray-800/50 border border-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="bg-primary-900/50 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gradient">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const BrandValues: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: <Leaf size={28} />,
      title: "Real Roots",
      description: "We source authentic ingredients with cultural significance, like Nannari root, creating flavors with genuine heritage and purpose.",
    },
    {
      icon: <Zap size={28} />,
      title: "Modern Fuel",
      description: "Our drinks are designed to energize naturally, without the crash that comes from artificial ingredients and excessive sugar.",
    },
    {
      icon: <Heart size={28} />,
      title: "No Harmful Ingredients",
      description: "We proudly leave out artificial sweeteners, preservatives, and other additives that don't belong in your body.",
    },
    {
      icon: <FlaskConical size={28} />,
      title: "Science + Tradition",
      description: "We marry ancient herbal wisdom with modern nutritional science to create beverages that honor the past while embracing the future.",
    },
  ];

  return (
    <section id="values" className="section bg-black relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-transparent to-transparent opacity-30"></div>
      <div className="container-custom relative">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-gradient">Our Values</h2>
          <p className="section-subtitle mx-auto">
            These core principles guide everything we do, from sourcing ingredients
            to designing our products and interacting with our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandValues;