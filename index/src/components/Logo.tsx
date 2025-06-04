import React from 'react';
import { Droplets } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <a href="#home" className="flex items-center">
      <Droplets size={32} className="text-primary-400 mr-2" />
      <span className="font-display text-2xl font-bold text-gradient">
        SIRIK
      </span>
    </a>
  );
};

export default Logo;