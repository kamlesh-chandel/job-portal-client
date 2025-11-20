import React from 'react';

const CategoryCard = ({ title }) => (
  <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer text-center">
    <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
  </div>
);

const CategoriesSection = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Job Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard title="Software Development" />
          <CategoryCard title="UI/UX Design" />
          <CategoryCard title="Marketing & Sales" />
          <CategoryCard title="Data Science" />
          <CategoryCard title="Human Resources" />
          <CategoryCard title="Customer Support" />
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
