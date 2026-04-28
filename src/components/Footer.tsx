
import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full py-12 px-6 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-100 text-slate-600'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <a href="https://islamistechnology.com" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className={`font-bold font-poppins tracking-wider text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              ISLAM IS TECHNOLOGY
            </span>
          </a>
          <p className="text-xs">Helping Muslims leverage technology for faith.</p>
        </div>

        <div className="flex items-center space-x-8 text-xs font-medium uppercase tracking-widest">
          <a href="https://islamistechnology.com" className="hover:text-emerald-500 transition-colors">Home</a>
          <a href="https://islamistechnology.com/contact" className="hover:text-emerald-500 transition-colors">Contact</a>
          <a href="https://islamistechnology.com/about" className="hover:text-emerald-500 transition-colors">About</a>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-2">
          <p className="text-xs flex items-center">
            Built with <Heart className="w-3 h-3 mx-1 text-red-500 fill-red-500" /> by Islam Is Technology
          </p>
          <p className="text-[10px] opacity-60">
            © {currentYear} Islam Is Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
