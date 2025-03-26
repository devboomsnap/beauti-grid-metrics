
import React from 'react';
import { Download } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

const DownloadButton = () => {
  return (
    <button 
      className="download-btn" 
      onClick={generatePDF}
      aria-label="Download as PDF"
    >
      <Download size={18} />
      <span>Download Report</span>
    </button>
  );
};

export default DownloadButton;
