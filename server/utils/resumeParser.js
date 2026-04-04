import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

async function extractResumeText(file) {
  const data = await pdfParse(file.buffer);
  return data.text.toLowerCase();
}

export default extractResumeText;