import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, Mail, Instagram, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="section bg-black relative">
      <div className="absolute inset-0 bg-gradient-radial from-secondary-900/20 via-transparent to-transparent opacity-30"></div>
      <div className="container-custom relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-gradient">Let's Talk, Let's Collab</h2>
          <p className="section-subtitle mx-auto">
            Got questions? Feedback? Want to collaborate? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={ref}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">Send Us a Message</h3>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-400"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-300 mb-2">
                  Inquiry Type
                </label>
                <select
                  id="inquiry"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                >
                  <option value="" className="bg-gray-900">Select an option</option>
                  <option value="wholesale" className="bg-gray-900">Wholesale Inquiry</option>
                  <option value="feedback" className="bg-gray-900">Feedback</option>
                  <option value="press" className="bg-gray-900">Press</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-400"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-gradient">Connect With Us</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-900/50 p-3 rounded-full text-primary-400 mr-4">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-white">WhatsApp</h4>
                  <p className="text-gray-400">Quick response during business hours</p>
                  <a href="#" className="text-primary-400 font-medium hover:text-primary-300">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-900/50 p-3 rounded-full text-primary-400 mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-white">Email</h4>
                  <p className="text-gray-400">For inquiries and collaborations</p>
                  <a href="mailto:hello@sirikbeverage.com" className="text-primary-400 font-medium hover:text-primary-300">
                    hello@sirikbeverage.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-900/50 p-3 rounded-full text-primary-400 mr-4">
                  <Instagram size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-white">Instagram</h4>
                  <p className="text-gray-400">Follow us for updates and behind-the-scenes</p>
                  <a href="#" className="text-primary-400 font-medium hover:text-primary-300">
                    @sirikbeverage
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-900/50 p-3 rounded-full text-primary-400 mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-white">Location</h4>
                  <p className="text-gray-400">Crafted with pride in</p>
                  <p className="text-primary-400 font-medium">Bengaluru, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating WhatsApp Button */}
        <motion.a
          href="#"
          className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-300 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Contact us on WhatsApp"
        >
          <MessageSquare size={24} />
        </motion.a>
      </div>
    </section>
  );
};

export default Contact;