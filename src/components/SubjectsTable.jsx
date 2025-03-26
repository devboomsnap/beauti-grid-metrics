
import React from 'react';

const SubjectsTable = ({ subjects, analysis }) => {
  // Helper function to calculate animation delay based on index
  const getAnimationDelay = (index) => {
    return `${index * 0.05}s`;
  };
  
  return (
    <div className="print:break-inside-avoid my-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-lg font-semibold mb-2 bg-report-blue/10 py-1 px-2 rounded text-report-dark">
        SUBJECTS ANALYSIS
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full report-table">
          <thead>
            <tr>
              <th className="text-left" rowSpan="2">Subjects</th>
              <th colSpan="2">CA1<br/>10%</th>
              <th colSpan="2">CA2<br/>10%</th>
              <th colSpan="2">CA3<br/>10%</th>
              <th rowSpan="2">Exam<br/>70%</th>
              <th rowSpan="2">Total<br/>100%</th>
              <th rowSpan="2">Grade</th>
              <th rowSpan="2">Class<br/>Average</th>
              <th rowSpan="2">Lowest<br/>Score</th>
              <th rowSpan="2">Highest<br/>Score</th>
              <th rowSpan="2">Position</th>
              <th rowSpan="2">Teacher's Remark</th>
            </tr>
            <tr>
              <th>ASSIGN<br/>5%</th>
              <th>BEHVR<br/>5%</th>
              <th>CLASS<br/>5%</th>
              <th>BEHVR<br/>5%</th>
              <th>TEST<br/>5%</th>
              <th>PRJ<br/>5%</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index} style={{ animationDelay: getAnimationDelay(index) }} className="cell-animate-in">
                <td className="text-left font-medium text-report-dark">
                  {subject.name}
                </td>
                <td>{Math.floor(subject.ca1 / 2)}</td>
                <td>{Math.ceil(subject.ca1 / 2)}</td>
                <td>{Math.floor(subject.ca2 / 2)}</td>
                <td>{Math.ceil(subject.ca2 / 2)}</td>
                <td>{Math.floor(subject.ca3 / 2)}</td>
                <td>{Math.ceil(subject.ca3 / 2)}</td>
                <td>{subject.exam}</td>
                <td className="font-medium">{subject.total}</td>
                <td className={`font-medium ${
                  subject.grade === 'A1' ? 'text-green-600' :
                  subject.grade === 'F9' ? 'text-red-600' : ''
                }`}>
                  {subject.grade}
                </td>
                <td>{subject.classAverage}</td>
                <td>{subject.lowestScore}</td>
                <td>{subject.highestScore}</td>
                <td>{subject.position}</td>
                <td className="text-left pl-2 pr-2">{subject.teacherRemark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-3 border border-gray-300 rounded">
        <div className="bg-report-blue/10 py-2 px-3 border-b border-gray-300 font-semibold text-sm text-report-dark">
          ANALYSIS
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 text-sm">
          <div className="p-2 border-r border-gray-300">
            <span className="font-medium text-xs">Subjects Offered:</span>
            <span className="block text-center font-bold">{analysis.subjectsOffered}</span>
          </div>
          <div className="p-2 border-r border-gray-300">
            <span className="font-medium text-xs">Marks Obtained:</span>
            <span className="block text-center font-bold">{analysis.marksObtained}</span>
          </div>
          <div className="p-2 border-r border-gray-300 md:border-r-0">
            <span className="font-medium text-xs">Marks Obtainable:</span>
            <span className="block text-center font-bold">{analysis.marksObtainable}</span>
          </div>
          <div className="p-2 border-r border-gray-300 border-t md:border-t-0">
            <span className="font-medium text-xs">Class Average:</span>
            <span className="block text-center font-bold">{analysis.classAverage}</span>
          </div>
          <div className="p-2 border-r border-gray-300 border-t md:border-t-0 col-span-2">
            <span className="font-medium text-xs">Student's Average:</span>
            <span className="block text-center font-bold">{analysis.studentAverage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsTable;
