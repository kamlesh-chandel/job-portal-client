import React from 'react';
import { Sparkles, Layers } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 min-h-[600px]">
      <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-28 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium shadow-sm mb-6">
          <Sparkles className="w-4 h-4" />
          No. 1 Job Hunt Platform
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Find Your
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mx-2">
            Dream Job
          </span>
          Today
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">
          Connect with top companies and discover opportunities that match your
          skills and aspirations. Join thousands of professionals who found
          their perfect career path.
        </p>

        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-lg h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-inner border border-gray-200 flex items-center justify-center">
            <Layers className="w-20 h-20 text-primary opacity-70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
