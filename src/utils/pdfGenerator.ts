
import jsPDF from 'jspdf';

export const generateResumePDF = (resumeData: any, templateId: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Template-specific styling
  const getTemplateConfig = (templateId: string) => {
    switch (templateId) {
      case 'modern':
        return {
          primaryColor: [30, 64, 175], // blue-700
          secondaryColor: [147, 197, 253], // blue-300
          headerBg: true,
          fontSize: { name: 20, section: 14, text: 10 }
        };
      case 'professional':
        return {
          primaryColor: [17, 24, 39], // gray-900
          secondaryColor: [107, 114, 128], // gray-500
          headerBg: false,
          fontSize: { name: 18, section: 12, text: 10 }
        };
      case 'creative':
        return {
          primaryColor: [147, 51, 234], // purple-600
          secondaryColor: [196, 181, 253], // purple-300
          headerBg: true,
          fontSize: { name: 22, section: 16, text: 10 }
        };
      case 'elegant':
        return {
          primaryColor: [159, 18, 57], // rose-800
          secondaryColor: [251, 207, 232], // rose-200
          headerBg: false,
          fontSize: { name: 24, section: 14, text: 11 }
        };
      case 'tech':
        return {
          primaryColor: [21, 128, 61], // green-700
          secondaryColor: [134, 239, 172], // green-300
          headerBg: false,
          fontSize: { name: 18, section: 13, text: 9 }
        };
      case 'bold':
        return {
          primaryColor: [0, 0, 0], // black
          secondaryColor: [75, 85, 99], // gray-600
          headerBg: true,
          fontSize: { name: 22, section: 16, text: 11 }
        };
      default:
        return {
          primaryColor: [0, 0, 0],
          secondaryColor: [107, 114, 128],
          headerBg: false,
          fontSize: { name: 20, section: 14, text: 10 }
        };
    }
  };

  const config = getTemplateConfig(templateId);

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12, color: number[] = [0, 0, 0]) => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Header with name and contact
  if (config.headerBg) {
    pdf.setFillColor(config.primaryColor[0], config.primaryColor[1], config.primaryColor[2]);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
  } else {
    pdf.setTextColor(config.primaryColor[0], config.primaryColor[1], config.primaryColor[2]);
  }

  pdf.setFontSize(config.fontSize.name);
  pdf.setFont(undefined, 'bold');
  yPosition = addText(resumeData.personalInfo?.fullName || 'Your Name', margin, yPosition, pageWidth - 2 * margin, config.fontSize.name, config.headerBg ? [255, 255, 255] : config.primaryColor);
  
  pdf.setFontSize(config.fontSize.text);
  pdf.setFont(undefined, 'normal');
  const contactInfo = [
    resumeData.personalInfo?.email,
    resumeData.personalInfo?.phone,
    resumeData.personalInfo?.location
  ].filter(Boolean).join(' | ');
  
  if (contactInfo) {
    yPosition = addText(contactInfo, margin, yPosition + 5, pageWidth - 2 * margin, config.fontSize.text, config.headerBg ? [255, 255, 255] : config.secondaryColor);
  }

  yPosition += config.headerBg ? 20 : 15;

  // Reset text color for content
  pdf.setTextColor(0, 0, 0);

  // Professional Summary
  if (resumeData.summary) {
    pdf.setFontSize(config.fontSize.section);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(config.primaryColor[0], config.primaryColor[1], config.primaryColor[2]);
    yPosition = addText('Professional Summary', margin, yPosition, pageWidth - 2 * margin, config.fontSize.section, config.primaryColor);
    
    // Add underline for section headers
    pdf.setDrawColor(config.secondaryColor[0], config.secondaryColor[1], config.secondaryColor[2]);
    pdf.line(margin, yPosition, margin + 60, yPosition);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(config.fontSize.text);
    pdf.setFont(undefined, 'normal');
    yPosition = addText(resumeData.summary, margin, yPosition + 8, pageWidth - 2 * margin, config.fontSize.text);
    yPosition += 12;
  }

  // Experience
  if (resumeData.experience?.length > 0) {
    pdf.setFontSize(config.fontSize.section);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(config.primaryColor[0], config.primaryColor[1], config.primaryColor[2]);
    yPosition = addText('Experience', margin, yPosition, pageWidth - 2 * margin, config.fontSize.section, config.primaryColor);
    
    pdf.setDrawColor(config.secondaryColor[0], config.secondaryColor[1], config.secondaryColor[2]);
    pdf.line(margin, yPosition, margin + 50, yPosition);
    yPosition += 8;

    resumeData.experience.forEach((exp: any) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(config.fontSize.text + 2);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(0, 0, 0);
      yPosition = addText(`${exp.position} at ${exp.company}`, margin, yPosition, pageWidth - 2 * margin, config.fontSize.text + 2);
      
      pdf.setFontSize(config.fontSize.text);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(config.secondaryColor[0], config.secondaryColor[1], config.secondaryColor[2]);
      yPosition = addText(`${exp.startDate} - ${exp.endDate}`, margin, yPosition + 2, pageWidth - 2 * margin, config.fontSize.text, config.secondaryColor);
      
      if (exp.description) {
        pdf.setTextColor(0, 0, 0);
        yPosition = addText(exp.description, margin, yPosition + 3, pageWidth - 2 * margin, config.fontSize.text);
      }
      yPosition += 8;
    });
  }

  // Education
  if (resumeData.education?.length > 0) {
    pdf.setFontSize(config.fontSize.section);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(config.primaryColor[0], config.primaryColor[1], config.primaryColor[2]);
    yPosition = addText('Education', margin, yPosition, pageWidth - 2 * margin, config.fontSize.section, config.primaryColor);
    
    pdf.setDrawColor(config.secondaryColor[0], config.secondaryColor[1], config.secondaryColor[2]);
    pdf.line(margin, yPosition, margin + 50, yPosition);
    yPosition += 8;

    resumeData.education.forEach((edu: any) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(config.fontSize.text + 2);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(0, 0, 0);
      yPosition = addText(`${edu.degree} - ${edu.institution}`, margin, yPosition, pageWidth - 2 * margin, config.fontSize.text + 2);
      
      pdf.setFontSize(config.fontSize.text);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(config.secondaryColor[0], config.secondaryColor[1], config.secondaryColor[2]);
      yPosition = addText(`${edu.startDate} - ${edu.endDate}`, margin, yPosition + 2, pageWidth - 2 * margin, config.fontSize.text, config.secondaryColor);
      yPosition += 8;
    });
  }

  // Skills
  if (resumeData.skills?.length > 0) {
    pdf.setFontSize(config.fontSize.section);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(config.primaryColor[0], config.primaryColor[1], config.primaryColor[2]);
    yPosition = addText('Skills', margin, yPosition, pageWidth - 2 * margin, config.fontSize.section, config.primaryColor);
    
    pdf.setDrawColor(config.secondaryColor[0], config.secondaryColor[1], config.secondaryColor[2]);
    pdf.line(margin, yPosition, margin + 30, yPosition);
    
    pdf.setFontSize(config.fontSize.text);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    const skillsText = resumeData.skills.join(', ');
    yPosition = addText(skillsText, margin, yPosition + 8, pageWidth - 2 * margin, config.fontSize.text);
  }

  return pdf;
};

export const generateAnalysisReportPDF = (analysis: any, fileName: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12, color: number[] = [0, 0, 0]) => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Header
  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, 0, pageWidth, 50, 'F');
  
  pdf.setFontSize(22);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(255, 255, 255);
  yPosition = addText('Resume Analysis Report', margin, yPosition + 5, pageWidth - 2 * margin, 22, [255, 255, 255]);
  
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'normal');
  yPosition = addText(`File: ${fileName}`, margin, yPosition + 5, pageWidth - 2 * margin, 12, [255, 255, 255]);
  yPosition = addText(`Analysis Date: ${new Date().toLocaleDateString()}`, margin, yPosition + 3, pageWidth - 2 * margin, 12, [255, 255, 255]);

  yPosition = 70;

  // Overall Score
  pdf.setFontSize(18);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(59, 130, 246);
  yPosition = addText(`Overall Score: ${analysis.scores.overall}/100`, margin, yPosition, pageWidth - 2 * margin, 18, [59, 130, 246]);
  
  pdf.setFontSize(11);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(0, 0, 0);
  yPosition = addText(analysis.overallFeedback, margin, yPosition + 8, pageWidth - 2 * margin, 11);
  yPosition += 15;

  // Score Breakdown
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(59, 130, 246);
  yPosition = addText('Score Breakdown', margin, yPosition, pageWidth - 2 * margin, 16, [59, 130, 246]);
  pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
  yPosition += 10;

  Object.entries(analysis.scores).forEach(([key, value]: [string, any]) => {
    if (key !== 'overall') {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(0, 0, 0);
      yPosition = addText(`${label}: ${value}/100`, margin, yPosition, pageWidth - 2 * margin, 11);
      yPosition += 5;
    }
  });

  yPosition += 10;

  // Improvement Suggestions
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(59, 130, 246);
  yPosition = addText('Improvement Suggestions', margin, yPosition, pageWidth - 2 * margin, 16, [59, 130, 246]);
  pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
  yPosition += 10;

  analysis.suggestions.forEach((category: any) => {
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(13);
    pdf.setFont(undefined, 'bold');
    const priorityColor = category.type === 'high' ? [220, 38, 38] : category.type === 'medium' ? [245, 158, 11] : [34, 197, 94];
    yPosition = addText(`${category.category} (${category.type.toUpperCase()} PRIORITY)`, margin, yPosition, pageWidth - 2 * margin, 13, priorityColor);
    yPosition += 5;

    category.items.forEach((item: string) => {
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(0, 0, 0);
      yPosition = addText(`• ${item}`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
      yPosition += 3;
    });
    yPosition += 8;
  });

  // Keyword Analysis
  if (yPosition > 200) {
    pdf.addPage();
    yPosition = margin;
  }

  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(59, 130, 246);
  yPosition = addText('Keyword Analysis', margin, yPosition, pageWidth - 2 * margin, 16, [59, 130, 246]);
  pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
  yPosition += 10;

  // Found Keywords
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(34, 197, 94);
  yPosition = addText('✓ Found Keywords:', margin, yPosition, pageWidth - 2 * margin, 12, [34, 197, 94]);
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(0, 0, 0);
  yPosition = addText(analysis.keywordAnalysis.found.join(', '), margin + 5, yPosition + 5, pageWidth - 2 * margin - 5, 10);
  yPosition += 10;

  // Missing Keywords
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(220, 38, 38);
  yPosition = addText('✗ Missing Keywords:', margin, yPosition, pageWidth - 2 * margin, 12, [220, 38, 38]);
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(0, 0, 0);
  yPosition = addText(analysis.keywordAnalysis.missing.join(', '), margin + 5, yPosition + 5, pageWidth - 2 * margin - 5, 10);
  yPosition += 10;

  // Recommended Keywords
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(59, 130, 246);
  yPosition = addText('→ Recommended Keywords:', margin, yPosition, pageWidth - 2 * margin, 12, [59, 130, 246]);
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(0, 0, 0);
  yPosition = addText(analysis.keywordAnalysis.recommended.join(', '), margin + 5, yPosition + 5, pageWidth - 2 * margin - 5, 10);

  return pdf;
};

export const downloadResumePDF = (resumeData: any, templateId: string, filename: string) => {
  const pdf = generateResumePDF(resumeData, templateId);
  pdf.save(`${filename}.pdf`);
};

export const downloadAnalysisReportPDF = (analysis: any, filename: string) => {
  const pdf = generateAnalysisReportPDF(analysis, filename);
  pdf.save(`${filename}.pdf`);
};
