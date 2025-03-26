
import React from 'react';

const CommentsSection = ({ comments, decision, nextTerm }) => {
  return (
    <div className="print:break-inside-avoid my-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="border border-gray-300 rounded overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
          <div className="p-3">
            <div className="text-sm font-medium mb-1">Form Teacher's Comments:</div>
            <div className="pl-2 italic text-gray-700">{comments.formTeacher}</div>
          </div>
          <div className="p-3">
            <div className="text-sm font-medium mb-1">Head Master's Comments:</div>
            <div className="pl-2 italic text-gray-700">{comments.headMaster}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-300">
          <div className="p-3 border-b md:border-b-0 md:border-r border-gray-300">
            <div className="text-sm font-medium mb-1">DECISION:</div>
            <div className="text-center font-bold text-green-600">{decision}</div>
          </div>
          <div className="p-3 border-b md:border-b-0 md:border-r border-gray-300">
            <div className="text-sm font-medium mb-1">RESUMPTION DATE FOR SECOND TERM:</div>
            <div className="text-center font-medium">
              {new Date(nextTerm.resumptionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 border-t md:border-t-0 border-gray-300">
            <div className="p-3 border-r border-gray-300">
              <div className="text-sm font-medium mb-1">NEXT TERM SCHOOL FEES:</div>
              <div className="text-center">{nextTerm.fees}</div>
            </div>
            <div className="p-3">
              <div className="text-sm font-medium mb-1">OTHER CHARGES:</div>
              <div className="text-center">{nextTerm.otherCharges}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 border-t border-gray-300">
          <div className="p-3 flex flex-col items-center justify-between border-r border-gray-300 min-h-[80px]">
            <div className="text-sm font-medium">Head Master's Signature</div>
            <div className="mt-2 italic text-xs text-gray-500">Signature</div>
          </div>
          <div className="p-3 flex flex-col items-center justify-between min-h-[80px]">
            <div className="text-sm font-medium">School Stamp</div>
            <div className="mt-2 italic text-xs text-gray-500">Stamp</div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-2">
        Developed by NGIT Software Solutions (www.ngit.com.ng)
      </div>
    </div>
  );
};

export default CommentsSection;
