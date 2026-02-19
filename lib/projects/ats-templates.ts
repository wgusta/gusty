import type { Project } from '../types';

const atsTemplates: Project = {
  id: 'ats-templates',
  title: {
    en: 'CV and Cover Letter Templates for ATS Survival',
    de: 'Lebenslauf- und Anschreiben-Templates für ATS-Kompatibilität',
  },
  description: {
    en: 'HTML templates designed to pass AI-based filters and ATS parsers while maintaining visual appeal for human reviewers. Built with semantic HTML and CSS print stylesheets.',
    de: 'HTML-Templates, die KI-basierte Filter und ATS-Parser bestehen und gleichzeitig visuell ansprechend für menschliche Reviewer bleiben. Gebaut mit semantischem HTML und CSS-Print-Stylesheets.',
  },
  tags: ['HTML', 'CSS', 'Print Stylesheets', 'Google Fonts', 'ATS-Optimized'],
  column: 'ai',
  finalizedAt: '2024-12-03',
  aiContent: '__ATS_COMPONENT__',
};

export default atsTemplates;
