
import React from 'react';

const CommentsSection = ({ comments, decision, nextTerm, classTeacher, resultData, school }) => {
  // Helper function to handle image loading with proper attributes
  const getImageSrc = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith('data:image') 
      ? imagePath 
      : `https://schoolcompasse.s3.us-east-1.amazonaws.com/${imagePath}`;
  };

  return (
    <div className="print:break-inside-avoid my-3">
      <h3 className="text-lg font-semibold mb-2 bg-report-blue/10 py-1 px-2 rounded text-report-dark">
        COMMENTS & DECISION
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Teacher's Comment */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h4 className="font-medium text-report-dark mb-2">Class Teacher's Comment</h4>
          <p className="text-gray-700">{comments?.teacherComment || 'No comment provided'}</p>
        </div>

        {/* Principal's Comment */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h4 className="font-medium text-report-dark mb-2">Principal's Comment</h4>
          <p className="text-gray-700">{comments?.principalComment || 'No comment provided'}</p>
        </div>
      </div>

      {/* Next Term Date */}
      <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h4 className="font-medium text-report-dark mb-2">Next Term Begins</h4>
        <p className="text-gray-700">{nextTerm || 'Date not set'}</p>
      </div>

      {/* Signatures */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Class Teacher Signature */}
        <div className="text-center">
          <div className="h-20 border-b border-gray-300 mb-2">
            {resultData?.class?.teacher?.signature ? (
              <img
                src={getImageSrc(resultData.class.teacher.signature)}
                alt="Teacher's Signature"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiLz48dGV4dCB4PSI1MCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlhOWE5YSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+U2lnbmF0dXJlPC90ZXh0Pjwvc3ZnPg==";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">Signature</span>
              </div>
            )}
          </div>
          <p className="font-medium text-report-dark">Class Teacher</p>
          <p className="text-sm text-gray-600">{classTeacher?.name || 'Teacher'}</p>
        </div>

        {/* Principal Signature */}
        <div className="text-center">
          <div className="h-20 border-b border-gray-300 mb-2">
            {school?.principal_sign ? (
              <img
                src={getImageSrc(school.principal_sign)}
                alt="Principal's Signature"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiLz48dGV4dCB4PSI1MCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlhOWE5YSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+U2lnbmF0dXJlPC90ZXh0Pjwvc3ZnPg==";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">Signature</span>
              </div>
            )}
          </div>
          <p className="font-medium text-report-dark">Principal</p>
        </div>
      </div>

      {/* School Stamp */}
      <div className="mt-4 text-center">
        <div className="h-24 mx-auto w-24 border rounded-full overflow-hidden">
          {school?.school_stamp ? (
            <img
              src={getImageSrc(school.school_stamp)}
              alt="School Stamp"
              className="w-full h-full object-contain"
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0OSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjEiLz48dGV4dCB4PSI1MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzlhOWE5YSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+U2Nob29sIFN0YW1wPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-xs">School Stamp</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
