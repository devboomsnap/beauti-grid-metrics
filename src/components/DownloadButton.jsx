
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

const DownloadButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDF();
      setTimeout(() => setIsGenerating(false), 2000);
    } catch (error) {
      console.error('Error in PDF generation:', error);
      setIsGenerating(false);
    }
  };
  
  return (
    <button 
      className="download-btn" 
      onClick={handleDownload}
      disabled={isGenerating}
      aria-label="Download as PDF"
    >
      {isGenerating ? (
        <span className="animate-pulse flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </span>
      ) : (
        <>
          <Download size={18} />
          <span>Download Report</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
