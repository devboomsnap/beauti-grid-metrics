
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Function to generate and download PDF from report card element
export const generatePDF = async () => {
  const reportElement = document.getElementById('report-card');
  if (!reportElement) return;
  
  // Add loading state
  const downloadButton = document.querySelector('.download-btn');
  const originalButtonText = downloadButton.innerHTML;
  downloadButton.innerHTML = '<span class="animate-pulse">Generating PDF...</span>';
  
  try {
    // Create a clone of the report card for PDF generation
    const reportClone = reportElement.cloneNode(true);
    reportClone.classList.add('print-mode');
    reportClone.style.width = '210mm'; // A4 width (minus margins)
    reportClone.style.margin = '0';
    reportClone.style.padding = '0';
    
    // Hide elements that shouldn't be in the PDF
    const noPrintElements = reportClone.querySelectorAll('.no-print');
    noPrintElements.forEach(el => el.style.display = 'none');
    
    // Show elements that should only be in the PDF
    const printOnlyElements = reportClone.querySelectorAll('.print-only');
    printOnlyElements.forEach(el => el.style.display = 'block');
    
    // Append to document temporarily (off-screen)
    reportClone.style.position = 'absolute';
    reportClone.style.left = '-9999px';
    document.body.appendChild(reportClone);
    
    // Generate canvas from the cloned element
    const canvas = await html2canvas(reportClone, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      letterRendering: true,
      backgroundColor: '#ffffff'
    });
    
    // Calculate PDF dimensions (A4 format)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Calculate number of pages needed
    let heightLeft = imgHeight;
    let position = 0;
    
    // First page
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= pageHeight;
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const studentName = document.querySelector('#student-name').textContent.trim().replace(/\s+/g, '_');
    const filename = `${studentName}_Report_${timestamp}.pdf`;
    
    // Save the PDF
    pdf.save(filename);
    
    // Clean up
    document.body.removeChild(reportClone);
    
    // Restore button text with success message
    downloadButton.innerHTML = '<span class="text-green-50">PDF Downloaded!</span>';
    setTimeout(() => {
      downloadButton.innerHTML = originalButtonText;
    }, 2000);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    downloadButton.innerHTML = '<span class="text-red-50">Error! Try again</span>';
    setTimeout(() => {
      downloadButton.innerHTML = originalButtonText;
    }, 2000);
  }
};
