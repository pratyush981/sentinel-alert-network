
import { jsPDF } from 'jspdf';
import { DisasterReport } from '../types';
import { disasterTypes, severityLevels, statusTypes } from '../data/mockData';

// Function to export disaster data as CSV
export const exportAsCSV = (data: DisasterReport[]): void => {
  // Define the CSV headers
  const headers = [
    'ID',
    'Type',
    'Title',
    'Description',
    'Location',
    'Affected Area',
    'Severity',
    'Status',
    'Reported At',
    'Reporter Name',
    'Reporter Contact',
    'Reporter Email'
  ].join(',');
  
  // Map the disaster data to CSV rows
  const rows = data.map(disaster => [
    disaster.id,
    disasterTypes[disaster.type].label,
    `"${disaster.title.replace(/"/g, '""')}"`, // Escape quotes in CSV
    `"${disaster.description.replace(/"/g, '""')}"`,
    `"${disaster.location.replace(/"/g, '""')}"`,
    `"${disaster.affectedArea.replace(/"/g, '""')}"`,
    severityLevels[disaster.severity].label,
    statusTypes[disaster.status].label,
    new Date(disaster.reportedAt).toLocaleString(),
    `"${disaster.reporter.name.replace(/"/g, '""')}"`,
    disaster.reporter.contact || 'N/A',
    disaster.reporter.email || 'N/A'
  ].join(','));
  
  // Combine headers and rows
  const csvContent = `${headers}\n${rows.join('\n')}`;
  
  // Create a blob and download it
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `disaster_reports_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to export disaster data as PDF
export const exportAsPDF = (data: DisasterReport[]): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Disaster Management Report', 20, 20);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
  
  // Add table headers
  const headers = ['Type', 'Title', 'Location', 'Severity', 'Status', 'Reported'];
  let yPos = 40;
  
  // Style for headers
  doc.setFillColor(211, 211, 211);
  doc.rect(20, yPos - 5, 170, 8, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  
  // Print headers
  for (let i = 0; i < headers.length; i++) {
    const xPos = 20 + (i * (170 / headers.length));
    doc.text(headers[i], xPos, yPos);
  }
  
  yPos += 10;
  
  // Print data rows
  data.forEach((disaster, index) => {
    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      doc.rect(20, yPos - 5, 170, 8, 'F');
    }
    
    const row = [
      disasterTypes[disaster.type].label,
      disaster.title.length > 20 ? disaster.title.substring(0, 17) + '...' : disaster.title,
      disaster.location.length > 15 ? disaster.location.substring(0, 12) + '...' : disaster.location,
      severityLevels[disaster.severity].label,
      statusTypes[disaster.status].label,
      new Date(disaster.reportedAt).toLocaleDateString()
    ];
    
    for (let i = 0; i < row.length; i++) {
      const xPos = 20 + (i * (170 / row.length));
      doc.text(row[i], xPos, yPos);
    }
    
    yPos += 8;
    
    // Add a new page if needed
    if (yPos > 280) {
      doc.addPage();
      yPos = 20;
    }
  });
  
  // Save the PDF
  doc.save(`disaster_reports_${new Date().toISOString().split('T')[0]}.pdf`);
};
