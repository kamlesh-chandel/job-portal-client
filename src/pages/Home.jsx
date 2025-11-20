import React from 'react';
import HeroSection from '../components/HeroSection';
import { Layout, Feather, Laptop } from 'lucide-react';

export const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Crafted With Attention to Detail
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            The interface focuses on clean elements, soft spacing, and a calm
            visual flow. Every section is structured to offer clarity without
            overwhelming the user.
          </p>
        </div>
      </section>
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-2xl shadow-sm border hover:shadow-lg transition">
              <Layout className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Structured Layout
              </h3>
              <p className="text-gray-600 text-center">
                Organized sections arranged to maintain balance and readability.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border hover:shadow-lg transition">
              <Feather className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Soft Visual Design
              </h3>
              <p className="text-gray-600 text-center">
                Clean typography and subtle color accents create a gentle user
                experience.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border hover:shadow-lg transition">
              <Laptop className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Fully Responsive
              </h3>
              <p className="text-gray-600 text-center">
                Adaptable across screen sizes, ensuring consistency everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

