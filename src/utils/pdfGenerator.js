
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Function to generate and download PDF from report card element
export const generatePDF = async () => {
  const reportElement = document.getElementById('report-card');
  if (!reportElement) return;
  
  // Create a deep clone of the report card for PDF generation
  const reportClone = reportElement.cloneNode(true);
  reportClone.classList.add('print-mode');
  
  try {
    // Hide elements that shouldn't be in the PDF
    const noPrintElements = reportClone.querySelectorAll('.no-print');
    noPrintElements.forEach(el => {
      if (el && el.style) el.style.display = 'none';
    });
    
    // Show elements that should only be in the PDF
    const printOnlyElements = reportClone.querySelectorAll('.print-only');
    printOnlyElements.forEach(el => {
      if (el && el.style) el.style.display = 'block';
    });
    
    // Ensure all background colors and gradients are preserved
    reportClone.style.backgroundColor = 'white';
    
    // Find header and ensure its background color is applied
    const reportHeader = reportClone.querySelector('.report-header');
    if (reportHeader) {
      reportHeader.style.backgroundColor = '#2471A3'; // Match the blue background shown in image
      reportHeader.style.color = 'white';
    }

    // Ensure table cells have visible borders
    const tableCells = reportClone.querySelectorAll('td, th');
    tableCells.forEach(cell => {
      if (cell && cell.style) {
        cell.style.border = '1px solid #ddd';
      }
    });
    
    // Dynamic font sizing based on number of columns
    const tableElement = reportClone.querySelector('.report-table');
    if (tableElement) {
      const columnCount = tableElement.querySelectorAll('thead th').length;
      
      // Apply dynamic font sizing
      if (columnCount > 20) {
        if (reportClone.style) reportClone.style.fontSize = '0.65rem';
      } else if (columnCount > 15) {
        if (reportClone.style) reportClone.style.fontSize = '0.75rem';
      } else if (columnCount > 10) {
        if (reportClone.style) reportClone.style.fontSize = '0.8rem';
      }
    }
    
    // Create a temporary container and append clone to document (off-screen)
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.height = 'auto';
    tempContainer.style.width = 'auto';
    tempContainer.appendChild(reportClone);
    
    document.body.appendChild(tempContainer);
    
    // Generate canvas from the cloned element with improved settings
    const canvas = await html2canvas(reportClone, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      letterRendering: true,
      backgroundColor: '#ffffff',
      removeContainer: false, // We'll handle removal ourselves
      onclone: (clonedDoc, element) => {
        // Additional styling can be applied to the cloned document here
        const tables = element.querySelectorAll('table');
        tables.forEach(table => {
          table.style.borderCollapse = 'collapse';
          table.style.width = '100%';
        });
      }
    });
    
    // Calculate content width to height ratio to determine orientation
    const contentRatio = canvas.width / canvas.height;
    const isLandscape = contentRatio > 1.2; // Switch to landscape if content is wide
    
    // Set orientation based on content
    const orientation = isLandscape ? 'landscape' : 'portrait';
    
    // Create PDF document with proper orientation
    const pdf = new jsPDF({
      orientation: orientation, 
      unit: 'mm', 
      format: 'a4',
      compress: true,
      hotfixes: ["px_scaling"]
    });
    
    // Get dimensions based on orientation
    const pdfWidth = orientation === 'landscape' ? 297 : 210; // A4 width in mm
    const pdfHeight = orientation === 'landscape' ? 210 : 297; // A4 height in mm
    
    // Calculate image dimensions with better margins
    const imgWidth = pdfWidth - 10; // Add smaller margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate number of pages needed
    let heightLeft = imgHeight;
    let position = 5; // Start position with smaller margin
    
    // First page
    pdf.addImage(
      canvas.toDataURL('image/png', 1.0), // Use highest quality
      'PNG',
      5, // Left margin
      position,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );
    heightLeft -= (pdfHeight - 10); // Account for margins
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 5; // Add margin
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0), // Use highest quality
        'PNG',
        5, // Left margin
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= (pdfHeight - 10); // Account for margins
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const studentName = document.querySelector('#student-name')?.textContent.trim().replace(/\s+/g, '_') || 'Student';
    const filename = `${studentName}_Report_${timestamp}.pdf`;
    
    // Save the PDF
    pdf.save(filename);
    
    // Clean up - safely remove from DOM
    if (tempContainer && document.body.contains(tempContainer)) {
      document.body.removeChild(tempContainer);
    }
    
    return true; // Return success
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Clean up in case of error
    const tempContainer = document.querySelector('div[style*="-9999px"]');
    if (tempContainer && document.body.contains(tempContainer)) {
      document.body.removeChild(tempContainer);
    }
    throw error; // Rethrow to allow the component to handle the error
  }
};
