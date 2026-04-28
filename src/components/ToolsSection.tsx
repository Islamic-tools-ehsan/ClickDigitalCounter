
import React from 'react';
import { Calculator, FileText, Coins, Calendar, ArrowRight } from 'lucide-react';

interface ToolsSectionProps {
  isDarkMode: boolean;
}

const TOOLS = [
  { 
    name: 'Inheritance Calculator', 
    url: 'https://inheritance.islamistechnology.com', 
    icon: Calculator,
    description: 'Calculate Islamic inheritance (Faraid) automatically according to Shariah.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  { 
    name: 'Wasiyyah Creator', 
    url: 'https://wasiyyah.islamistechnology.com', 
    icon: FileText,
    description: 'Generate your Islamic Will (Wasiyyah) professionally and easily.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  { 
    name: 'Zakat Calculator', 
    url: 'https://zakat.islamistechnology.com', 
    icon: Coins,
    description: 'Accurately figure out your Zakat obligations for the current year.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  { 
    name: 'Muslim Daily Routine', 
    url: 'https://routine.islamistechnology.com', 
    icon: Calendar,
    description: 'Stay productive and spiritually grounded with a structured daily plan.',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10'
  },
];

const ToolsSection: React.FC<ToolsSectionProps> = ({ isDarkMode }) => {
  return (
    <section className={`w-full py-20 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold font-poppins mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Explore More Tools
          </h2>
          <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            We build simple, powerful technology to help Muslims fulfill their obligations and improve their spiritual lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              className={`group relative flex flex-col p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:shadow-xl border-slate-100'} border`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${tool.bg} ${tool.color}`}>
                <tool.icon className="w-6 h-6" />
              </div>
              
              <h3 className={`text-lg font-bold mb-3 font-poppins ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {tool.name}
              </h3>
              
              <p className={`text-sm leading-relaxed mb-6 flex-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {tool.description}
              </p>
              
              <div className={`flex items-center text-xs font-bold uppercase tracking-wider ${tool.color}`}>
                <span>Try it now</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              <div className={`absolute inset-0 rounded-2xl ring-2 ring-transparent transition-all duration-300 group-hover:ring-emerald-500/20`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
