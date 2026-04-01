function generateResume(data) {
  const {
    name = "Your Name",
    email = "your.email@example.com",
    phone = "+1 (555) 123-4567",
    location = "City, State",
    summary = "Professional summary goes here...",
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = []
  } = data;

  // Template-based resume generation
  const resume = {
    header: {
      name,
      contact: {
        email,
        phone,
        location
      }
    },
    summary,
    experience: experience.map(exp => ({
      title: exp.title || "Job Title",
      company: exp.company || "Company Name",
      duration: exp.duration || "Start Date - End Date",
      description: exp.description || "Job description and achievements..."
    })),
    education: education.map(edu => ({
      degree: edu.degree || "Degree Name",
      institution: edu.institution || "Institution Name",
      year: edu.year || "Graduation Year",
      gpa: edu.gpa || "GPA"
    })),
    skills: skills.length > 0 ? skills : ["Skill 1", "Skill 2", "Skill 3"],
    projects: projects.map(proj => ({
      name: proj.name || "Project Name",
      description: proj.description || "Project description...",
      technologies: proj.technologies || [],
      link: proj.link || ""
    })),
    certifications: certifications.map(cert => ({
      name: cert.name || "Certification Name",
      issuer: cert.issuer || "Issuing Organization",
      year: cert.year || "Year Obtained"
    }))
  };

  return resume;
}

function generateResumeText(resumeData) {
  const resume = generateResume(resumeData);

  let text = `${resume.header.name}\n`;
  text += `${resume.header.contact.email} | ${resume.header.contact.phone} | ${resume.header.contact.location}\n\n`;

  text += `PROFESSIONAL SUMMARY\n`;
  text += `${resume.summary}\n\n`;

  if (resume.experience.length > 0) {
    text += `PROFESSIONAL EXPERIENCE\n`;
    resume.experience.forEach(exp => {
      text += `${exp.title}\n`;
      text += `${exp.company} | ${exp.duration}\n`;
      text += `${exp.description}\n\n`;
    });
  }

  if (resume.education.length > 0) {
    text += `EDUCATION\n`;
    resume.education.forEach(edu => {
      text += `${edu.degree}\n`;
      text += `${edu.institution} | ${edu.year}\n`;
      if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
      text += `\n`;
    });
  }

  if (resume.skills.length > 0) {
    text += `SKILLS\n`;
    text += `${resume.skills.join(", ")}\n\n`;
  }

  if (resume.projects.length > 0) {
    text += `PROJECTS\n`;
    resume.projects.forEach(proj => {
      text += `${proj.name}\n`;
      text += `${proj.description}\n`;
      if (proj.technologies.length > 0) {
        text += `Technologies: ${proj.technologies.join(", ")}\n`;
      }
      if (proj.link) text += `Link: ${proj.link}\n`;
      text += `\n`;
    });
  }

  if (resume.certifications.length > 0) {
    text += `CERTIFICATIONS\n`;
    resume.certifications.forEach(cert => {
      text += `${cert.name} - ${cert.issuer} (${cert.year})\n`;
    });
    text += `\n`;
  }

  return text;
}

function generateResumeHTML(resumeData) {
  const resume = generateResume(resumeData);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resume.header.name} - Resume</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #007bff;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .name {
                font-size: 2.5em;
                margin: 0;
                color: #007bff;
            }
            .contact {
                margin: 10px 0;
                color: #666;
            }
            .section {
                margin-bottom: 30px;
            }
            .section-title {
                font-size: 1.5em;
                color: #007bff;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            .experience-item, .education-item, .project-item {
                margin-bottom: 20px;
            }
            .job-title, .degree, .project-name {
                font-weight: bold;
                font-size: 1.1em;
            }
            .company, .institution, .duration {
                color: #666;
                font-style: italic;
            }
            .skills {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            .skill {
                background: #f8f9fa;
                padding: 5px 10px;
                border-radius: 15px;
                border: 1px solid #007bff;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1 class="name">${resume.header.name}</h1>
            <div class="contact">
                ${resume.header.contact.email} | ${resume.header.contact.phone} | ${resume.header.contact.location}
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p>${resume.summary}</p>
        </div>

        ${resume.experience.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${resume.experience.map(exp => `
                <div class="experience-item">
                    <div class="job-title">${exp.title}</div>
                    <div class="company">${exp.company} | ${exp.duration}</div>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resume.education.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Education</h2>
            ${resume.education.map(edu => `
                <div class="education-item">
                    <div class="degree">${edu.degree}</div>
                    <div class="institution">${edu.institution} | ${edu.year}</div>
                    ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resume.skills.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills">
                ${resume.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}

        ${resume.projects.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Projects</h2>
            ${resume.projects.map(proj => `
                <div class="project-item">
                    <div class="project-name">${proj.name}</div>
                    <p>${proj.description}</p>
                    ${proj.technologies.length > 0 ? `<p><strong>Technologies:</strong> ${proj.technologies.join(', ')}</p>` : ''}
                    ${proj.link ? `<p><strong>Link:</strong> <a href="${proj.link}">${proj.link}</a></p>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resume.certifications.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Certifications</h2>
            <ul>
                ${resume.certifications.map(cert => `<li>${cert.name} - ${cert.issuer} (${cert.year})</li>`).join('')}
            </ul>
        </div>
        ` : ''}
    </body>
    </html>
  `;
}

export {
  generateResume,
  generateResumeText,
  generateResumeHTML
};