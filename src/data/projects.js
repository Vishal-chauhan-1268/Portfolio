export const projects = [
  {
    id: 'chat',
    title: 'Real-Time Chat Application',
    tag: 'Production App',
    summary: 'Production-ready 1:1 messaging platform with live presence and delivery tracking.',
    description:
      'A full-stack real-time chat application built with React, Express, and Socket.IO. Supports one-to-one messaging, typing indicators, online/offline presence, and seen/delivered receipts — architected for low-latency delivery at scale.',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'Socket.IO', 'MySQL', 'Sequelize', 'JWT'],
    metrics: [
      { label: 'Message latency', value: '<150ms' },
      { label: 'Concurrent rooms', value: 'Multi' },
      { label: 'Auth', value: 'JWT' },
    ],
    github: 'https://github.com/Vishal-chauhan-1268/chat-app',
    demo: '#',
    accent: '#4d7fff',
  },
  {
  id: 'ai-task',
  title: 'AI-Powered Task Management System',
  tag: 'AI',
  summary: 'AI-powered productivity platform with GPT-4o for intelligent task automation and analytics.',

  description:
    'Developed a full-stack AI-powered task management platform using React.js, Node.js, Express.js, and MySQL. Integrated the GPT-4o API to automate task generation, prioritization, subtask creation, and daily productivity summaries. Implemented secure authentication, role-based access control, scalable MVC architecture, and optimized database operations to maintain API response times below 200ms. Built interactive dashboards for project tracking and productivity analytics, significantly reducing manual planning through AI-driven workflow automation.',

  tech: [
    'React.js',
    'Node.js',
    'Express.js',
    'MySQL',
    'GPT-4o API',
    'JWT',
    'MVC',
  ],

  metrics: [
    { label: 'API Response', value: '<200ms' },
    { label: 'Authentication', value: 'JWT + RBAC' },
    { label: 'AI Features', value: 'Task Automation' },
  ],
    github: 'https://github.com/Vishal-chauhan-1268/Taskmaster',
    demo: '#',
    accent: '#8b5cf6',
  },
 { id: 'ai-task', title: 'AI-Powered diagnosis system', tag: 'AI ', summary: 'Three-service clinical decision support platform powered by RAG.', description: 'A multi-service system pairing a React/Tailwind frontend and an Express/Prisma/PostgreSQL backend with RBAC, alongside a FastAPI microservice using LangChain, ChromaDB, and Gemini for retrieval-augmented clinical decision support. Built and tested locally, with explicit handling of regulatory-compliance limitations as a prototype.', tech: ['React', 'FastAPI', 'LangChain', 'ChromaDB', 'Gemini', 'PostgreSQL', 'Prisma'], metrics: [ { label: 'Services', value: '3' }, { label: 'Retrieval', value: 'RAG' }, { label: 'Access control', value: 'RBAC' }, ],
    github: '#',
    demo: '#',
    accent: '#3fe0e0',
  },
]
