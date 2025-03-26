
import React from 'react';

const AffectiveDomain = ({ affectiveData, keyToRatings }) => {
  // Group affective traits into two columns
  const leftColumn = Object.entries(affectiveData).slice(0, 5);
  const rightColumn = Object.entries(affectiveData).slice(5);
  
  // Helper to get background color based on rating
  const getRatingColor = (rating) => {
    if (rating === 5) return 'bg-green-100';
    if (rating === 4) return 'bg-blue-50';
    if (rating === 3) return 'bg-gray-50';
    if (rating === 2) return 'bg-yellow-50';
    return 'bg-red-50';
  };
  
  // Format affective trait name
  const formatTraitName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
  };
  
  return (
    <div className="print:break-inside-avoid my-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="border border-gray-300 rounded overflow-hidden">
          <div className="bg-report-blue/10 py-2 px-3 border-b border-gray-300 font-semibold text-sm text-report-dark">
            AFFECTIVE DOMAIN
          </div>
          <table className="w-full report-table">
            <thead>
              <tr>
                <th className="text-left">Trait</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {leftColumn.map(([trait, rating], index) => (
                <tr key={index} className={getRatingColor(rating)}>
                  <td className="text-left pl-2">{formatTraitName(trait)}</td>
                  <td className="font-medium">{rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="border border-gray-300 rounded overflow-hidden">
          <div className="bg-report-blue/10 py-2 px-3 border-b border-gray-300 font-semibold text-sm text-report-dark">
            PSYCHOMOTOR
          </div>
          <table className="w-full report-table">
            <thead>
              <tr>
                <th className="text-left">Trait</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {rightColumn.map(([trait, rating], index) => (
                <tr key={index} className={getRatingColor(rating)}>
                  <td className="text-left pl-2">{formatTraitName(trait)}</td>
                  <td className="font-medium">{rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-3 border border-gray-300 rounded overflow-hidden">
        <div className="bg-report-blue/10 py-2 px-3 border-b border-gray-300 font-semibold text-sm text-report-dark">
          KEY TO RATINGS
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 p-2 text-xs">
          {keyToRatings.map(({ key, description }, index) => (
            <div key={index} className="flex items-center p-1">
              <span className="font-semibold w-5 h-5 rounded-full bg-report-blue/10 flex items-center justify-center mr-1">
                {key}
              </span>
              <span className="text-gray-700">{description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffectiveDomain;
