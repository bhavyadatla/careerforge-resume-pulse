import jsPDF from 'jspdf';

export const generateResumePDF = (resumeData: any, templateId: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Get template configuration that matches the preview exactly
  const getTemplateConfig = (templateId: string) => {
    switch (templateId) {
      case 'modern':
        return {
          primaryColor: [30, 64, 175], // blue-700
          secondaryColor: [59, 130, 246], // blue-500
          accentColor: [147, 197, 253], // blue-300
          headerBg: [219, 234, 254], // blue-50 equivalent
          fontSize: { name: 22, section: 16, text: 11 }
        };
      case 'professional':
        return {
          primaryColor: [17, 24, 39], // gray-900
          secondaryColor: [75, 85, 99], // gray-600
          accentColor: [156, 163, 175], // gray-400
          headerBg: false,
          fontSize: { name: 18, section: 14, text: 10 }
        };
      case 'creative':
        return {
          primaryColor: [147, 51, 234], // purple-600
          secondaryColor: [168, 85, 247], // purple-500
          accentColor: [196, 181, 253], // purple-300
          headerBg: [250, 245, 255], // purple-50
          fontSize: { name: 24, section: 18, text: 12 }
        };
      case 'minimal':
        return {
          primaryColor: [17, 24, 39], // gray-900
          secondaryColor: [107, 114, 128], // gray-500
          accentColor: [209, 213, 219], // gray-300
          headerBg: false,
          fontSize: { name: 20, section: 14, text: 10 }
        };
      case 'executive':
        return {
          primaryColor: [255, 255, 255], // white text on dark
          secondaryColor: [209, 213, 219], // gray-300
          accentColor: [107, 114, 128], // gray-500
          headerBg: [17, 24, 39], // gray-900
          fontSize: { name: 24, section: 18, text: 12 }
        };
      case 'tech':
        return {
          primaryColor: [21, 128, 61], // green-700
          secondaryColor: [34, 197, 94], // green-500
          accentColor: [134, 239, 172], // green-300
          headerBg: [240, 253, 244], // green-50
          fontSize: { name: 20, section: 15, text: 10 }
        };
      case 'elegant':
        return {
          primaryColor: [159, 18, 57], // rose-800
          secondaryColor: [190, 18, 60], // rose-700
          accentColor: [251, 207, 232], // rose-200
          headerBg: [255, 241, 242], // rose-50
          fontSize: { name: 26, section: 18, text: 12 }
        };
      case 'bold':
        return {
          primaryColor: [0, 0, 0], // black
          secondaryColor: [255, 255, 255], // white on black backgrounds
          accentColor: [0, 0, 0], // black
          headerBg: [0, 0, 0], // black
          fontSize: { name: 26, section: 18, text: 12 }
        };
      default:
        return {
          primaryColor: [0, 0, 0],
          secondaryColor: [107, 114, 128],
          accentColor: [156, 163, 175],
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

  // Template-specific header styling
  if (templateId === 'modern' || templateId === 'creative' || templateId === 'tech' || templateId === 'elegant') {
    // Gradient background effect for these templates
    pdf.setFillColor(config.headerBg[0], config.headerBg[1], config.headerBg[2]);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    if (templateId === 'modern') {
      // Add blue left border
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, 4, pdf.internal.pageSize.getHeight(), 'F');
    } else if (templateId === 'creative') {
      // Add purple left border
      pdf.setFillColor(147, 51, 234);
      pdf.rect(0, 0, 4, pdf.internal.pageSize.getHeight(), 'F');
    } else if (templateId === 'tech') {
      // Add green left border
      pdf.setFillColor(34, 197, 94);
      pdf.rect(0, 0, 4, pdf.internal.pageSize.getHeight(), 'F');
    } else if (templateId === 'elegant') {
      // Add rose border
      pdf.setFillColor(244, 63, 94);
      pdf.rect(0, 0, pageWidth, 2, 'F');
      pdf.rect(0, 48, pageWidth, 2, 'F');
    }
  } else if (templateId === 'executive') {
    // Dark header background
    pdf.setFillColor(17, 24, 39);
    pdf.rect(0, 0, pageWidth, 50, 'F');
  } else if (templateId === 'bold') {
    // Black header background
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    // Add border around entire page
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(4);
    pdf.rect(2, 2, pageWidth - 4, pdf.internal.pageSize.getHeight() - 4);
  }

  // Header content
  const headerTextColor = (templateId === 'executive' || templateId === 'bold') ? [255, 255, 255] : config.primaryColor;
  
  pdf.setFontSize(config.fontSize.name);
  pdf.setFont(undefined, 'bold');
  
  const nameY = templateId === 'minimal' ? yPosition : yPosition + 10;
  yPosition = addText(resumeData.personalInfo?.fullName || 'Your Name', margin, nameY, pageWidth - 2 * margin, config.fontSize.name, headerTextColor);
  
  // Contact info
  pdf.setFontSize(config.fontSize.text);
  pdf.setFont(undefined, 'normal');
  const contactInfo = [
    resumeData.personalInfo?.email,
    resumeData.personalInfo?.phone,
    resumeData.personalInfo?.location
  ].filter(Boolean).join(' | ');
  
  if (contactInfo) {
    const contactColor = (templateId === 'executive' || templateId === 'bold') ? [209, 213, 219] : config.secondaryColor;
    yPosition = addText(contactInfo, margin, yPosition + 5, pageWidth - 2 * margin, config.fontSize.text, contactColor);
  }

  yPosition = templateId === 'minimal' ? yPosition + 15 : yPosition + 25;

  // Reset text color for content sections
  const contentColor = templateId === 'executive' ? [255, 255, 255] : [0, 0, 0];
  const sectionColor = templateId === 'executive' ? [255, 255, 255] : config.primaryColor;

  // Professional Summary
  if (resumeData.summary) {
    pdf.setFontSize(config.fontSize.section);
    pdf.setFont(undefined, 'bold');
    yPosition = addText('Professional Summary', margin, yPosition, pageWidth - 2 * margin, config.fontSize.section, sectionColor);
    
    // Add section underline matching template style
    if (templateId !== 'minimal') {
      pdf.setDrawColor(config.accentColor[0], config.accentColor[1], config.accentColor[2]);
      pdf.setLineWidth(templateId === 'bold' ? 3 : 2);
      pdf.line(margin, yPosition + 2, margin + (templateId === 'tech' ? 100 : 80), yPosition + 2);
    }
    
    pdf.setTextColor(contentColor[0], contentColor[1], contentColor[2]);
    pdf.setFontSize(config.fontSize.text);
    pdf.setFont(undefined, 'normal');
    yPosition = addText(resumeData.summary, margin, yPosition + 8, pageWidth - 2 * margin, config.fontSize.text, contentColor);
    yPosition += 15;
  }

  // Experience
  if (resumeData.experience?.length > 0) {
    pdf.setFontSize(config.fontSize.section);
    pdf.setFont(undefined, 'bold');
    yPosition = addText('Experience', margin, yPosition, pageWidth - 2 * margin, config.fontSize.section, sectionColor);
    
    if (templateId !== 'minimal') {
      pdf.setDrawColor(config.accentColor[0], config.accentColor[1], config.accentColor[2]);
      pdf.setLineWidth(templateId === 'bold' ? 3 : 2);
      pdf.line(margin, yPosition + 2, margin + (templateId === 'tech' ? 80 : 60), yPosition + 2);
    }
    yPosition += 10;

    resumeData.experience.forEach((exp: any) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
        if (templateId === 'executive') {
          pdf.setFillColor(17, 24, 39);
          pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
        }
      }

      // Add left border for certain templates
      if (templateId === 'modern' || templateId === 'creative' || templateId === 'tech') {
        const borderColor = templateId === 'modern' ? [147, 197, 253] : 
                           templateId === 'creative' ? [196, 181, 253] : [134, 239, 172];
        pdf.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
        pdf.setLineWidth(3);
        pdf.line(margin - 5, yPosition - 5, margin - 5, yPosition + 25);
      }

      pdf.setFontSize(config.fontSize.text + 2);
      pdf.setFont(undefined, 'bold');
      yPosition = addText(`${exp.position} at ${exp.company}`, margin, yPosition, pageWidth - 2 * margin, config.fontSize.text + 2, contentColor);
      
      pdf.setFontSize(config.fontSize.text);
      pdf.setFont(undefined, 'normal');
      const dateColor = templateId === 'executive' ? [209, 213, 219] : config.secondaryColor;
      yPosition = addText(`${exp.startDate} - ${exp.endDate}`, margin, yPosition + 2, pageWidth - 2 * margin, config.fontSize.text, dateColor);
      
      if (exp.description) {
        yPosition = addText(exp.description, margin, yPosition + 3, pageWidth - 2 * margin, config.fontSize.text, contentColor);
      }
      yPosition += 12;
    });
  }

  // Education
  if (resumeData.education?.length > 0) {
    pdf.setFontSize(config.fontSize.section);
    pdf.setFont(undefined, 'bold');
    yPosition = addText('Education', margin, yPosition, pageWidth - 2 * margin, config.fontSize.section, sectionColor);
    
    if (templateId !== 'minimal') {
      pdf.setDrawColor(config.accentColor[0], config.accentColor[1], config.accentColor[2]);
      pdf.setLineWidth(templateId === 'bold' ? 3 : 2);
      pdf.line(margin, yPosition + 2, margin + (templateId === 'tech' ? 70 : 50), yPosition + 2);
    }
    yPosition += 10;

    resumeData.education.forEach((edu: any) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(config.fontSize.text + 2);
      pdf.setFont(undefined, 'bold');
      yPosition = addText(`${edu.degree} - ${edu.institution}`, margin, yPosition, pageWidth - 2 * margin, config.fontSize.text + 2, contentColor);
      
      pdf.setFontSize(config.fontSize.text);
      pdf.setFont(undefined, 'normal');
      const dateColor = templateId === 'executive' ? [209, 213, 219] : config.secondaryColor;
      yPosition = addText(`${edu.startDate} - ${edu.endDate}`, margin, yPosition + 2, pageWidth - 2 * margin, config.fontSize.text, dateColor);
      yPosition += 10;
    });
  }

  // Skills
  if (resumeData.skills?.length > 0) {
    pdf.setFontSize(config.fontSize.section);
    pdf.setFont(undefined, 'bold');
    yPosition = addText('Skills', margin, yPosition, pageWidth - 2 * margin, config.fontSize.section, sectionColor);
    
    if (templateId !== 'minimal') {
      pdf.setDrawColor(config.accentColor[0], config.accentColor[1], config.accentColor[2]);
      pdf.setLineWidth(templateId === 'bold' ? 3 : 2);
      pdf.line(margin, yPosition + 2, margin + 40, yPosition + 2);
    }
    
    pdf.setFontSize(config.fontSize.text);
    pdf.setFont(undefined, 'normal');
    const skillsText = resumeData.skills.join(', ');
    yPosition = addText(skillsText, margin, yPosition + 8, pageWidth - 2 * margin, config.fontSize.text, contentColor);
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
