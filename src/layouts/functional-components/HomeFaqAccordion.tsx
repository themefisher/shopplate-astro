import type { Faq } from "@/types";
import React, { useState } from "react";

const HomeFaqAccordion = ({ faqs }: { faqs: Faq[] }) => {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      {faqs.map((faq: Faq, index) => (
        <div
          key={index}
          className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 ${
            activeTab === index 
              ? "shadow-md bg-white dark:bg-gray-800" 
              : "bg-gray-50/50 dark:bg-gray-800/30"
          }`}
        >
          <button
            className="flex w-full items-center justify-between p-5 text-left text-lg font-medium text-gray-900 dark:text-white"
            onClick={() => {
              activeTab === index ? setActiveTab(null) : setActiveTab(index);
            }}
          >
            <span className="flex items-center space-x-3">
              {activeTab === index ? (
                <svg className="w-6 h-6 text-[#15B0A4] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              )}
              <span>{faq.title}</span>
            </span>
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${activeTab === index ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              activeTab === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-5 pt-0 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300">{faq.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeFaqAccordion;
