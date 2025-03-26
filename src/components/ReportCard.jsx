
import React from 'react';
import ReportHeader from './ReportHeader';
import SubjectsTable from './SubjectsTable';
import AffectiveDomain from './AffectiveDomain';
import GradingScale from './GradingScale';
import CommentsSection from './CommentsSection';

const ReportCard = ({ data }) => {
  const {
    school,
    student,
    attendance,
    subjects,
    analysis,
    affectiveDomain,
    gradingScale,
    keyToRatings,
    comments,
    decision,
    nextTerm,
    date,
    code
  } = data;

  return (
    <div id="report-card" className="report-container">
      <ReportHeader
        schoolData={school}
        studentData={student}
        attendanceData={attendance}
        date={date}
        code={code}
      />
      
      <div className="p-2 md:p-4 bg-white">
        <SubjectsTable subjects={subjects} analysis={analysis} />
        <AffectiveDomain affectiveData={affectiveDomain} keyToRatings={keyToRatings} />
        <GradingScale gradingScale={gradingScale} />
        <CommentsSection comments={comments} decision={decision} nextTerm={nextTerm} />
      </div>
    </div>
  );
};

export default ReportCard;
