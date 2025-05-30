
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img 
              src="/lovable-uploads/logo.png" 
              alt="Order Instant Logo" 
              className="h-10"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium hover:text-brand-orange transition-colors duration-200 ${isActive('/') ? 'text-brand-orange' : 'text-gray-700'}`}>
              HOME
            </Link>
            <Link to="/services" className={`font-medium hover:text-brand-orange transition-colors duration-200 ${isActive('/services') ? 'text-brand-orange' : 'text-gray-700'}`}>
              SERVICES
            </Link>
            <Link to="/contact" className={`font-medium hover:text-brand-orange transition-colors duration-200 ${isActive('/contact') ? 'text-brand-orange' : 'text-gray-700'}`}>
              CONTACT
            </Link>
            <Link to="/account" className="ml-3">
              <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                ACCOUNT
              </Button>
            </Link>
            <Link to="/shipping">
              <Button className="bg-brand-orange text-white hover:bg-brand-dark-orange">
                SHIP NOW
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className={`py-2 px-4 rounded-md ${isActive('/') ? 'bg-brand-orange text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={closeMenu}>
                Home
              </Link>
              <Link to="/services" className={`py-2 px-4 rounded-md ${isActive('/services') ? 'bg-brand-orange text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={closeMenu}>
                Services
              </Link>
              <Link to="/contact" className={`py-2 px-4 rounded-md ${isActive('/contact') ? 'bg-brand-orange text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={closeMenu}>
                Contact
              </Link>
              <Link to="/account" className="py-2 px-4 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200" onClick={closeMenu}>
                Account
              </Link>
              <Link to="/shipping" className="py-2 px-4 bg-brand-orange text-white rounded-md hover:bg-brand-dark-orange" onClick={closeMenu}>
                Ship Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
