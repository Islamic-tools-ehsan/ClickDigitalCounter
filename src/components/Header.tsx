
import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Moon, Sun, Smartphone, Menu, X } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  hapticsEnabled: boolean;
  onToggleHaptics: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme, hapticsEnabled, onToggleHaptics }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tools = [
    { name: 'Home', url: 'https://islamistechnology.com' },
    { name: 'Inheritance', url: 'https://inheritance.islamistechnology.com' },
    { name: 'Wasiyyah', url: 'https://wasiyyah.islamistechnology.com' },
    { name: 'Zakat', url: 'https://zakat.islamistechnology.com' },
    { name: 'Routine', url: 'https://routine.islamistechnology.com' },
  ];

  return (
    <header className={`w-full z-50 fixed top-0 left-0 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <a href="https://islamistechnology.com" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-xl font-poppins">I</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-sm font-bold tracking-tight font-poppins ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ISLAMIS TECHNOLOGY
                </h1>
                <p className="text-[10px] text-emerald-500 font-medium -mt-1 font-poppins">DIGITAL TASBEEH</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button 
                onMouseEnter={() => setIsDropdownOpen(true)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <span>More Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl transition-all duration-200 transform ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} border ring-1 ring-black ring-opacity-5`}
              >
                <div className="p-2 space-y-1">
                  {tools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                      {tool.name}
                      <ExternalLink className="w-3 h-3 opacity-40" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 border-l pl-6 border-slate-200 dark:border-slate-700">
              <button 
                onClick={onToggleHaptics}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <Smartphone className={`w-5 h-5 ${hapticsEnabled ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : 'text-slate-400'}`} />
              </button>
              <button 
                onClick={onToggleTheme}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button (Keep it simple for this tool) */}
          <div className="flex md:hidden items-center space-x-2">
             <button 
                onClick={onToggleHaptics}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <Smartphone className={`w-5 h-5 ${hapticsEnabled ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : 'text-slate-400'}`} />
              </button>
              <button 
                onClick={onToggleTheme}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
              <button 
                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                {isDropdownOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isDropdownOpen && (
        <div className={`md:hidden border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className="px-4 py-3 space-y-1">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
