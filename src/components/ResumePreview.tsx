
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
        return {
          container: 'bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500',
          header: 'text-center border-b-2 border-blue-200 pb-4 bg-blue-50 -m-6 mb-6 p-6',
          name: 'text-3xl font-bold text-blue-900',
          contact: 'text-blue-700 mt-2',
          sectionTitle: 'text-xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 mb-3',
          experienceItem: 'border-l-4 border-blue-300 pl-4 bg-blue-25',
          skillBadge: 'px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'
        };
      case 'professional':
        return {
          container: 'bg-white border border-gray-300',
          header: 'text-center border-b pb-4',
          name: 'text-2xl font-serif font-bold text-gray-900',
          contact: 'text-gray-600 mt-2 text-sm',
          sectionTitle: 'text-lg font-serif font-semibold text-gray-800 border-b border-gray-400 pb-1 mb-3',
          experienceItem: 'border-l-2 border-gray-400 pl-4',
          skillBadge: 'px-2 py-1 border border-gray-400 text-gray-700 text-xs rounded'
        };
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500',
          header: 'text-center pb-4 bg-gradient-to-r from-purple-100 to-pink-100 -m-6 mb-6 p-6 rounded-t-lg',
          name: 'text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent',
          contact: 'text-purple-700 mt-2',
          sectionTitle: 'text-xl font-bold text-purple-800 border-b-2 border-purple-400 pb-1 mb-3',
          experienceItem: 'border-l-4 border-purple-400 pl-4 bg-purple-25 rounded-l-lg',
          skillBadge: 'px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs rounded-full border border-purple-300'
        };
      case 'minimal':
        return {
          container: 'bg-white border border-gray-200',
          header: 'text-left pb-3 border-b border-gray-200',
          name: 'text-2xl font-light text-gray-900',
          contact: 'text-gray-500 mt-1 text-sm font-light',
          sectionTitle: 'text-lg font-light text-gray-700 uppercase tracking-wide mb-3',
          experienceItem: 'pl-0 mb-4',
          skillBadge: 'px-2 py-1 text-gray-600 text-xs border-b border-gray-300 mr-3'
        };
      case 'executive':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
          header: 'text-center pb-4 border-b border-gray-600',
          name: 'text-3xl font-bold text-white',
          contact: 'text-gray-300 mt-2',
          sectionTitle: 'text-xl font-bold text-gray-100 border-b border-gray-600 pb-2 mb-3',
          experienceItem: 'border-l-2 border-gray-500 pl-4',
          skillBadge: 'px-3 py-1 bg-gray-700 text-gray-200 text-xs rounded border border-gray-600'
        };
      case 'tech':
        return {
          container: 'bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-green-500 font-mono',
          header: 'text-left pb-4 border-b-2 border-green-400',
          name: 'text-2xl font-bold text-green-800',
          contact: 'text-green-700 mt-2 text-sm',
          sectionTitle: 'text-lg font-bold text-green-800 bg-green-100 px-2 py-1 mb-3 inline-block',
          experienceItem: 'border border-green-200 p-3 mb-3 bg-green-25 rounded',
          skillBadge: 'px-2 py-1 bg-green-500 text-white text-xs rounded font-bold'
        };
      case 'elegant':
        return {
          container: 'bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-200',
          header: 'text-center pb-6 border-b-2 border-rose-300',
          name: 'text-3xl font-serif font-bold text-rose-900',
          contact: 'text-rose-700 mt-3 italic',
          sectionTitle: 'text-xl font-serif font-bold text-rose-800 mb-4',
          experienceItem: 'border-l-3 border-rose-400 pl-4 mb-4',
          skillBadge: 'px-3 py-1 bg-rose-100 text-rose-800 text-xs rounded-full border border-rose-300'
        };
      case 'bold':
        return {
          container: 'bg-white border-4 border-black',
          header: 'text-center pb-4 bg-black text-white -m-6 mb-6 p-6',
          name: 'text-3xl font-black text-white uppercase',
          contact: 'text-gray-300 mt-2 font-bold',
          sectionTitle: 'text-xl font-black text-black uppercase border-b-4 border-black pb-1 mb-3',
          experienceItem: 'border-l-4 border-black pl-4 font-semibold',
          skillBadge: 'px-3 py-1 bg-black text-white text-xs font-bold uppercase'
        };
      default:
        return {
          container: 'bg-white border border-gray-300',
          header: 'text-center border-b pb-4',
          name: 'text-2xl font-bold',
          contact: 'text-sm opacity-75 mt-2',
          sectionTitle: 'text-lg font-semibold mb-2',
          experienceItem: 'border-l-2 border-gray-300 pl-4',
          skillBadge: 'px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <Card className={`p-6 h-full max-h-[800px] overflow-y-auto ${styles.container}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.name}>
            {resumeData.personalInfo?.fullName || 'Your Name'}
          </h1>
          <div className={styles.contact}>
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
            <h2 className={styles.sectionTitle}>Professional Summary</h2>
            <p className="text-sm leading-relaxed">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience?.length > 0 && (
          <div>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp: any, index: number) => (
                <div key={index} className={styles.experienceItem}>
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
            <h2 className={styles.sectionTitle}>Education</h2>
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
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string, index: number) => (
                <span key={index} className={styles.skillBadge}>
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
