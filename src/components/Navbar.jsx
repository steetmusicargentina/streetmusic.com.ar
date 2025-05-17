
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Music, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <nav className="navbar-music text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="music-float"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic className="h-8 w-8" />
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Street Music Argentina
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <MapPin className="h-5 w-5" />
                <span>Explorar Mapa</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
