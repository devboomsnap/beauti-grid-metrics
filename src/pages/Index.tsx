
import React from 'react';
import ReportCard from '../components/ReportCard';
import DownloadButton from '../components/DownloadButton';
import { reportData } from '../utils/dummyData';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <DownloadButton />
      
      <div className="max-w-[1170px] mx-auto mb-8">
        {/* Page title */}
        <h1 className="text-2xl md:text-3xl font-bold text-report-dark text-center mb-6 animate-fade-in">
          Student Report Card
        </h1>
        
        {/* Report Card Component */}
        <ReportCard data={reportData} />
      </div>
    </div>
  );
};

export default Index;
