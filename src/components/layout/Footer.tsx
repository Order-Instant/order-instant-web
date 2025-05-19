
import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img className="h-12 w-15 text-brand-orange rounded" src='/lovable-uploads/logo.png' />
              <span className="ml-2 text-xl font-bold">Order <span className="text-brand-orange">Instant</span></span>
            </div>
            <p className="text-gray-400 mb-4">
              Fast, reliable delivery services for all your shipping needs. Local and international solutions for businesses and individuals.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/Nisabda69" className="text-gray-400 hover:text-brand-orange transition-colors duration-200" target='_black'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Our Services</Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Track Shipment</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Contact Us</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">FAQ</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Same Day Delivery</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Next Day Delivery</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">International Shipping</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Business Solutions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Warehousing</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-orange mr-2 mt-1" />
                <span className="text-gray-400">Samakhusi-3 Kathmandu,Nepal</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-orange mr-2" />
                <a href="tel:01-4974691" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">Tel. 01-4974691</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-orange mr-2" />
                <a href="mailto:orderinstant088@gmail.com" className="text-gray-400 hover:text-brand-orange transition-colors duration-200">orderinstant088@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Order Instant. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
