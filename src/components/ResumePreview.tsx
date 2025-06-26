
import React from 'react';
import { Card } from '@/components/ui/card';

interface ResumePreviewProps {
  resumeData: any;
  templateId: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, templateId }) => {
  const getTemplateStyles = () => {
    switch (templateId) {
      case 'modern':
        return 'bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500';
      case 'professional':
        return 'bg-white border border-gray-300';
      case 'creative':
        return 'bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500';
      case 'minimal':
        return 'bg-gray-50 border border-gray-200';
      case 'executive':
        return 'bg-gradient-to-br from-gray-900 to-gray-800 text-white';
      case 'tech':
        return 'bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-green-500';
      default:
        return 'bg-white border border-gray-300';
    }
  };

  return (
    <Card className={`p-6 h-full max-h-[800px] overflow-y-auto ${getTemplateStyles()}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold">
            {resumeData.personalInfo?.fullName || 'Your Name'}
          </h1>
          <div className="text-sm opacity-75 mt-2">
            {[
              resumeData.personalInfo?.email,
              resumeData.personalInfo?.phone,
              resumeData.personalInfo?.location
            ].filter(Boolean).join(' | ')}
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.summary && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
            <p className="text-sm leading-relaxed">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-2 border-gray-300 pl-4">
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-sm font-medium opacity-75">{exp.company}</p>
                  <p className="text-xs opacity-60">{exp.startDate} - {exp.endDate}</p>
                  {exp.description && (
                    <p className="text-sm mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm opacity-75">{edu.institution}</p>
                  <p className="text-xs opacity-60">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumePreview;
