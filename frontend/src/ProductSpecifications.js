import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import './ProductSpecifications.css';

const ProductSpecifications = ({ specs }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  
  const defaultSpecs = specs || {
    "General": [
      { name: "Model Name", value: "Example Product" },
      { name: "Color", value: "Black" },
      { name: "In The Box", value: "Product, Manual, Warranty Card" }
    ],
    "Technical": [
      { name: "Brand", value: "Example Brand" },
      { name: "Model Number", value: "EX12345" },
      { name: "Weight", value: "750g" }
    ],
    "Warranty": [
      { name: "Warranty Summary", value: "1 Year Manufacturer Warranty" },
      { name: "Covered", value: "Manufacturing Defects" },
      { name: "Not Covered", value: "Physical Damage" }
    ]
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="specs-container bg-white p-4 rounded-lg shadow-sm">
      <h3 className="specs-title text-lg font-medium text-gray-800 mb-4">Product Specifications</h3>
      
      <div className="space-y-4 specs-categories">
        {Object.entries(defaultSpecs).map(([category, items], categoryIndex) => {
          const isExpanded = expandedCategories[category] !== false; // Default to expanded
          
          return (
            <div key={category} className={`spec-category category-${categoryIndex}`}>
              <button
                onClick={() => toggleCategory(category)}
                className="category-header font-medium text-gray-700 mb-2 flex items-center justify-between w-full rounded-md py-2 px-2 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Info size={16} className="mr-1 text-blue-500 info-icon" />
                  {category}
                </div>
                {isExpanded ? 
                  <ChevronUp size={18} className="text-gray-500 chevron-icon" /> : 
                  <ChevronDown size={18} className="text-gray-500 chevron-icon" />
                }
              </button>
              
              <div className={`spec-items bg-gray-50 rounded-lg overflow-hidden ${isExpanded ? 'expanded' : 'collapsed'}`}>
                {items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`spec-row flex py-2 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} item-${index}`}
                  >
                    <div className="spec-name w-1/3 text-gray-600 text-sm">{item.name}</div>
                    <div className="spec-value w-2/3 text-gray-800 text-sm font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSpecifications;
