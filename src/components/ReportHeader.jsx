
import React from 'react';

const ReportHeader = ({ schoolData, studentData, attendanceData, date, code }) => {
  return (
    <div className="report-header print:break-inside-avoid animate-fade-in">
      {/* Watermark */}
      <div className="watermark print-only">
        <div className="watermark-text">{code}</div>
      </div>
      
      {/* Date and Code */}
      <div className="flex justify-between text-xs">
        <div>{date}</div>
        <div>{code}</div>
      </div>
      
      {/* School Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        {/* School Logo */}
        <div className="w-16 h-16 md:w-20 md:h-20 md:mr-4 flex-shrink-0">
          <img 
            src={schoolData.logo || "/placeholder.svg"} 
            alt={`${schoolData.name} Logo`} 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* School Info - Now properly centered */}
        <div className="text-center flex-grow mx-auto">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight">{schoolData.name}</h1>
          <p className="text-xs md:text-sm opacity-90">{schoolData.location}</p>
          <p className="text-xs md:text-sm italic">Motto: {schoolData.motto}</p>
          <p className="text-xs opacity-80">
            Email: {schoolData.email} URL: {schoolData.website}
          </p>
        </div>
        
        {/* Student Photo (placeholder) */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded overflow-hidden hidden md:block flex-shrink-0">
          <div className="w-full h-full flex items-center justify-center bg-report-accent/30">
            <span className="text-report-dark text-xs">Photo</span>
          </div>
        </div>
      </div>
      
      {/* Report Title */}
      <div className="text-center py-1 border-t border-b border-white/30">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide animate-pulse-soft">
          NURSERY REPORT SHEET
        </h2>
      </div>
      
      {/* Student Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 text-sm">
        <div className="flex flex-col">
          <div className="flex">
            <span className="font-semibold mr-1">Name:</span>
            <span id="student-name" className="animate-fade-in-right">{studentData.name}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-1">Admission No:</span>
            <span className="animate-fade-in-right">{studentData.admissionNo}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-1">Class:</span>
            <span className="animate-fade-in-right">{studentData.class}</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex">
            <span className="font-semibold mr-1">Session:</span>
            <span className="animate-fade-in-right">{studentData.session}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-1">Term:</span>
            <span className="animate-fade-in-right">{studentData.term}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-1">Grade:</span>
            <span className="animate-fade-in-right">{studentData.grade}</span>
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-1">
          <div className="bg-white/10 rounded overflow-hidden">
            <div className="text-center font-semibold text-xs p-1 bg-white/20">
              ATTENDANCE
            </div>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-white/20">
                  <td className="p-1 font-medium">Days School Open</td>
                  <td className="p-1 text-right">{attendanceData.daysSchoolOpen}</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="p-1 font-medium">Days Present</td>
                  <td className="p-1 text-right">{attendanceData.daysPresent}</td>
                  <td className="p-1 text-right w-12">{attendanceData.percentagePresent}%</td>
                </tr>
                <tr>
                  <td className="p-1 font-medium">Days Absent</td>
                  <td className="p-1 text-right">{attendanceData.daysAbsent}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
