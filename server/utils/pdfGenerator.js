import puppeteer from 'puppeteer';

async function generatePDF(htmlContent, options = {}) {
  let browser;

  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      ...options
    });

    return pdfBuffer;

  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function generateResumePDF(resumeData) {
  const { generateResumeHTML } = await import('./resumeGenerator.js');

  try {
    // Generate HTML first
    const htmlContent = generateResumeHTML(resumeData);

    // Add some CSS for better PDF formatting
    const pdfHTML = htmlContent.replace(
      '<style>',
      `<style>
        @page {
          size: A4;
          margin: 1cm;
        }
        body {
          font-size: 12px;
        }
        .header {
          margin-bottom: 20px;
        }
        .section {
          margin-bottom: 15px;
        }
      `
    );

    // Generate PDF
    const pdfBuffer = await generatePDF(pdfHTML);

    return pdfBuffer;

  } catch (error) {
    console.error('Resume PDF generation error:', error);
    throw error;
  }
}

export {
  generatePDF,
  generateResumePDF
};