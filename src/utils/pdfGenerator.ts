
import jsPDF from 'jspdf';

export const generateResumePDF = (resumeData: any, templateId: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Header with name and contact
  pdf.setFontSize(20);
  pdf.setFont(undefined, 'bold');
  yPosition = addText(resumeData.personalInfo?.fullName || 'Your Name', margin, yPosition, pageWidth - 2 * margin, 20);
  
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  const contactInfo = [
    resumeData.personalInfo?.email,
    resumeData.personalInfo?.phone,
    resumeData.personalInfo?.location
  ].filter(Boolean).join(' | ');
  
  if (contactInfo) {
    yPosition = addText(contactInfo, margin, yPosition + 5, pageWidth - 2 * margin, 10);
  }

  yPosition += 10;

  // Professional Summary
  if (resumeData.summary) {
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    yPosition = addText('Professional Summary', margin, yPosition, pageWidth - 2 * margin, 14);
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    yPosition = addText(resumeData.summary, margin, yPosition + 5, pageWidth - 2 * margin, 10);
    yPosition += 10;
  }

  // Experience
  if (resumeData.experience?.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    yPosition = addText('Experience', margin, yPosition, pageWidth - 2 * margin, 14);
    yPosition += 5;

    resumeData.experience.forEach((exp: any) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      yPosition = addText(`${exp.position} at ${exp.company}`, margin, yPosition, pageWidth - 2 * margin, 12);
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      yPosition = addText(`${exp.startDate} - ${exp.endDate}`, margin, yPosition + 2, pageWidth - 2 * margin, 10);
      
      if (exp.description) {
        yPosition = addText(exp.description, margin, yPosition + 3, pageWidth - 2 * margin, 10);
      }
      yPosition += 8;
    });
  }

  // Education
  if (resumeData.education?.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    yPosition = addText('Education', margin, yPosition, pageWidth - 2 * margin, 14);
    yPosition += 5;

    resumeData.education.forEach((edu: any) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      yPosition = addText(`${edu.degree} - ${edu.institution}`, margin, yPosition, pageWidth - 2 * margin, 12);
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      yPosition = addText(`${edu.startDate} - ${edu.endDate}`, margin, yPosition + 2, pageWidth - 2 * margin, 10);
      yPosition += 8;
    });
  }

  // Skills
  if (resumeData.skills?.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    yPosition = addText('Skills', margin, yPosition, pageWidth - 2 * margin, 14);
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    const skillsText = resumeData.skills.join(', ');
    yPosition = addText(skillsText, margin, yPosition + 5, pageWidth - 2 * margin, 10);
  }

  return pdf;
};

export const downloadResumePDF = (resumeData: any, templateId: string, filename: string) => {
  const pdf = generateResumePDF(resumeData, templateId);
  pdf.save(`${filename}.pdf`);
};
