
import React from 'react';

const ReportHeader = ({ school, student, attendance, date, code }) => {
  return (
    <div className="report-header print:break-inside-avoid animate-fade-in">
      {/* Watermark - visible only on print */}
      <div className="watermark print-only opacity-[0.05]">
        <div className="watermark-text">{code}</div>
      </div>
      
      {/* Date and Code */}
      <div className="flex justify-between text-xs text-white">
        <div>{date}</div>
        <div>{code}</div>
      </div>
      
      {/* School Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        {/* School Logo */}
        <div className="w-16 h-16 md:w-20 md:h-20 md:mr-4 flex-shrink-0 bg-white rounded-full overflow-hidden">
          {school.logo ? (
            <img 
              src={school.logo.startsWith('data:image') 
                ? school.logo 
                : `https://schoolcompasse.s3.us-east-1.amazonaws.com/${school.logo}`} 
              alt={`${school.name} Logo`} 
              className="w-full h-full object-contain"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">Logo</span>
            </div>
          )}
        </div>
        
        {/* School Info - Now properly centered */}
        <div className="text-center flex-grow mx-auto">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight">{school.name}</h1>
          <p className="text-xs md:text-sm opacity-90">{school.address}</p>
          <p className="text-xs md:text-sm italic">Motto: {school.motto}</p>
          <p className="text-xs opacity-80">
            Email: {school.email} {school.website && `URL: ${school.website}`}
          </p>
        </div>
        
        {/* Student Photo */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden hidden md:block flex-shrink-0 bg-white">
          {student.data?.image ? (
            <img 
              src={student.data.image.startsWith('data:image') 
                ? student.data.image 
                : `https://schoolcompasse.s3.us-east-1.amazonaws.com/${student.data.image}`} 
              alt="Student Photo" 
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">Photo</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Report Title */}
      <div className="text-center py-1 border-t border-b border-white/30">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide">
          STUDENT REPORT SHEET
        </h2>
      </div>
      
      {/* Student Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 text-sm">
        <div className="flex flex-col">
          <div className="flex">
            <span className="font-semibold mr-1">Name:</span>
            <span id="student-name">{student.name}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-1">Admission No:</span>
            <span>{student.admissionNo}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-1">Class:</span>
            <span>{student.class}</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex">
            <span className="font-semibold mr-1">Session:</span>
            <span>{student.session}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-1">Term:</span>
            <span>{student.term}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-1">Grade:</span>
            <span>{student.grade}</span>
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
                  <td className="p-1 text-right">{attendance.daysOpen || "N/A"}</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="p-1 font-medium">Days Present</td>
                  <td className="p-1 text-right">{attendance.daysPresent || "N/A"}</td>
                  <td className="p-1 text-right w-12">{attendance.percentagePresent || "N/A"}%</td>
                </tr>
                <tr>
                  <td className="p-1 font-medium">Days Absent</td>
                  <td className="p-1 text-right">{attendance.daysAbsent || "N/A"}</td>
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
