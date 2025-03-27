
import React from 'react';

const SubjectsTable = ({ resultData, markObtained, studentSummary, termSummary, remarks, analysis }) => {
  const getScore = (course, markId) => {
    const score = course.score_board.find(score => score.result_section_type_id === markId);
    return score ? score.score : 'N/A';
  };

  // Helper function to handle image loading with proper attributes
  const getImageSrc = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith('data:image') 
      ? imagePath 
      : `https://schoolcompasse.s3.us-east-1.amazonaws.com/${imagePath}`;
  };

  // Calculate total columns for responsive design
  const totalColumns = markObtained.length + studentSummary.length + termSummary.length + remarks.length + 2; // +2 for subject and signature

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-400 border border-gray-400">
            <thead>
              <tr className="bg-gray-200 text-base">
                <th className="px-2 py-1 border border-gray-400 whitespace-nowrap" rowSpan="2" style={{ minWidth: '150px' }}>
                  SUBJECTS
                </th>

                <th className="px-2 py-1 border border-gray-400 whitespace-nowrap" colSpan={markObtained.length}>
                  MARKS OBTAINED
                </th>
                {studentSummary.map((mark) => (
                  <th key={mark.id} className="px-2 py-1 border border-gray-400 whitespace-nowrap" rowSpan="2" style={{ minWidth: '100px' }}>
                    {mark.name}
                  </th>
                ))}

                <th className="px-2 py-1 border border-gray-400 whitespace-nowrap" colSpan={termSummary.length}>
                  TERM SUMMARY
                </th>

                {remarks.map((mark) => (
                  <th key={mark.id} className="px-2 py-1 border border-gray-400 whitespace-nowrap" rowSpan="2" style={{ minWidth: '100px' }}>
                    {mark.name}
                  </th>
                ))}
                <th className="px-2 py-1 border border-gray-400 whitespace-nowrap" rowSpan="2" style={{ minWidth: '80px' }}>
                  Sign.
                </th>
              </tr>
              <tr className="bg-gray-200">
                {markObtained.map((mark) => (
                  <th key={mark.id} className="px-2 py-1 border border-gray-400 whitespace-nowrap" style={{ minWidth: '80px' }}>
                    {mark.name}
                  </th>
                ))}
                {termSummary.map((mark) => (
                  <th key={mark.id} className="px-2 py-1 border border-gray-400 whitespace-nowrap" style={{ minWidth: '80px' }}>
                    {mark.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-400">
              {resultData.courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 border border-gray-400 whitespace-nowrap">
                    {course.subject.subject_depot.name}
                  </td>
                  {markObtained.map((heading) => (
                    <td key={heading.id} className="px-2 py-1 border border-gray-400 whitespace-nowrap text-center">
                      {getScore(course, heading.id)}
                    </td>
                  ))}

                  {studentSummary.map((heading) => (
                    <td key={heading.id} className="px-2 py-1 border border-gray-400 whitespace-nowrap text-center">
                      {getScore(course, heading.id)}
                    </td>
                  ))}

                  {termSummary.map((heading) => (
                    <td key={heading.id} className="px-2 py-1 border border-gray-400 whitespace-nowrap text-center">
                      {getScore(course, heading.id)}
                    </td>
                  ))}

                  {remarks.map((heading) => (
                    <td key={heading.id} className="px-2 py-1 border border-gray-400 whitespace-nowrap text-center">
                      {getScore(course, heading.id)}
                    </td>
                  ))}

                  <td className="px-2 py-1 border border-gray-400 whitespace-nowrap text-center">
                  { course.subject.teacher?.signature && ( 
                    <img
                      width="20"
                      height="20"
                      src={getImageSrc(course.subject.teacher?.signature)}
                      alt="Teacher Signature"
                      className="mx-auto rounded-md w-[20px] h-[20px] object-cover"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+";
                      }}
                    />
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 border border-gray-300 rounded">
        <div className="bg-report-blue/10 py-2 px-3 border-b border-gray-300 font-semibold text-sm text-report-dark">
          ANALYSIS
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 text-sm">
          <div className="p-2 border-r border-gray-300">
            <span className="font-medium text-xs">Subjects Offered:</span>
            <span className="block text-center font-bold">{resultData.totalSubject}</span>
          </div>
          <div className="p-2 border-r border-gray-300">
            <span className="font-medium text-xs">Marks Obtained:</span>
            <span className="block text-center font-bold">{resultData.totalScore}</span>
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
