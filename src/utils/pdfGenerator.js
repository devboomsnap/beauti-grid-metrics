
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Function to generate and download PDF from report card element
export const generatePDF = async () => {
  const reportElement = document.getElementById('report-card');
  if (!reportElement) return;
  
  try {
    // Create a deep clone of the report card for PDF generation
    const reportClone = reportElement.cloneNode(true);
    
    // Force all elements to have solid colors and full opacity
    function enforceVisibility(element) {
      if (element.style) {
        // Force full opacity and solid colors
        element.style.opacity = '1';
        element.style.color = element.style.color || '#000000';
        
        // Make backgrounds solid
        if (element.style.backgroundColor && element.style.backgroundColor.includes('rgba')) {
          element.style.backgroundColor = element.style.backgroundColor.replace(/rgba?\(([^,]+),([^,]+),([^,]+),?[^)]*\)/, 'rgb($1,$2,$3)');
        }
        
        // Increase contrast
        if (element.tagName === 'TD' || element.tagName === 'TH' || 
            element.tagName === 'P' || element.tagName === 'DIV' || 
            element.tagName === 'SPAN' || element.tagName === 'H1' || 
            element.tagName === 'H2' || element.tagName === 'H3' || 
            element.tagName === 'H4' || element.tagName === 'H5' || 
            element.tagName === 'STRONG' || element.tagName === 'B') {
          element.style.color = '#000000';
          element.style.fontWeight = element.style.fontWeight || '500';
        }
        
        // Ensure table borders are solid
        if (element.tagName === 'TABLE') {
          element.style.borderCollapse = 'collapse';
          element.style.border = '2px solid #000';
        }
        
        if (element.tagName === 'TH') {
          element.style.backgroundColor = '#e6f2ff';
          element.style.color = '#000000';
          element.style.fontWeight = 'bold';
          element.style.border = '1px solid #000';
        }
        
        if (element.tagName === 'TD') {
          element.style.border = '1px solid #000';
        }
      }
      
      // Process child elements
      if (element.childNodes) {
        Array.from(element.childNodes).forEach(child => {
          if (child.nodeType === 1) { // Element node
            enforceVisibility(child);
          }
        });
      }
    }
    
    // Create a temporary container and append clone to document (off-screen)
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.height = 'auto';
    tempContainer.style.width = reportElement.offsetWidth + 'px';
    tempContainer.appendChild(reportClone);
    document.body.appendChild(tempContainer);
    
    // Apply visibility enforcement to all elements
    enforceVisibility(reportClone);
    
    // Force image loading before canvas generation
    const images = reportClone.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // Continue even if image fails
      });
    });
    
    // Wait for all images to be loaded
    await Promise.all(imagePromises);
    
    // Generate canvas with significantly increased quality settings
    const canvas = await html2canvas(reportClone, {
      scale: 5, // Higher scale = better quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 15000, // Longer timeout for images
      removeContainer: false, // We'll handle removal
      onclone: (clonedDoc, element) => {
        // Add any additional styling to ensure visibility
        const allElements = element.querySelectorAll('*');
        allElements.forEach(el => {
          if (el.tagName === 'IMG') {
            el.crossOrigin = 'Anonymous';
            // Force image display
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            
            // If image is from AWS S3, ensure we use the correct URL
            if (el.src && el.src.includes('s3.us-east-1.amazonaws.com')) {
              // Make sure the image is loaded with proper headers
              el.setAttribute('crossorigin', 'anonymous');
            }
          }
        });
      }
    });
    
    // Determine if content is wide (landscape) or tall (portrait)
    const contentRatio = canvas.width / canvas.height;
    const orientation = contentRatio > 0.9 ? 'landscape' : 'portrait';
    
    // Create PDF with high quality settings
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: 'a4',
      compress: false, // Disable compression for better quality
      hotfixes: ["px_scaling"]
    });
    
    // Get dimensions based on orientation
    const pdfWidth = orientation === 'landscape' ? 297 : 210; // A4 width in mm
    const pdfHeight = orientation === 'landscape' ? 210 : 297; // A4 height in mm
    
    // Calculate image dimensions to fit the page
    const imgWidth = pdfWidth - 20; // 10mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate number of pages needed
    let heightLeft = imgHeight;
    let position = 10; // Initial margin
    
    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/png', 1.0), // Use highest quality
      'PNG',
      10, // Left margin
      position,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );
    heightLeft -= pdfHeight - 20; // Subtract first page (with margins)
    
    // Add additional pages if content overflows
    while (heightLeft > 0) {
      pdf.addPage();
      position = heightLeft - imgHeight + 10; // Calculate position for next page
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        10,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= (pdfHeight - 20);
    }
    
    // Generate filename with student name if available
    const studentName = document.querySelector('#student-name')?.textContent.trim().replace(/\s+/g, '_') || 'Student';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${studentName}_Report_${timestamp}.pdf`;
    
    // Save the PDF
    pdf.save(filename);
    
    // Clean up - remove temp container
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
