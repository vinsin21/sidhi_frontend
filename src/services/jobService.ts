import { Job } from '../types';

// Mock data for demonstration
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    platform: 'LinkedIn',
    type: 'full-time',
    experienceLevel: 'senior',
    salary: '$120K - $180K',
    description: `We are seeking a highly skilled Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies.

Key Responsibilities:
• Lead the development of complex software systems
• Collaborate with cross-functional teams to deliver high-quality products
• Mentor junior developers and provide technical guidance
• Participate in code reviews and maintain coding standards
• Optimize application performance and scalability

This is an exciting opportunity to work with cutting-edge technologies and make a significant impact on our products used by millions of users worldwide.`,
    requirements: [
      '5+ years of experience in software development',
      'Proficiency in JavaScript, TypeScript, and React',
      'Experience with Node.js and database technologies',
      'Strong understanding of software architecture principles',
      'Excellent problem-solving and communication skills',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Knowledge of microservices architecture'
    ],
    postedDate: '2024-01-15T10:00:00Z',
    applicationUrl: 'https://linkedin.com/jobs/apply/123',
    isRemote: true,
    tags: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL']
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    platform: 'Indeed',
    type: 'full-time',
    experienceLevel: 'mid',
    salary: '$80K - $120K',
    description: `Join our growing team as a Frontend Developer and help build amazing user experiences. We're looking for someone passionate about creating intuitive, responsive web applications that delight our users.

What you'll do:
• Develop responsive web applications using React and modern JavaScript
• Collaborate with designers to implement pixel-perfect UI/UX designs
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in agile development processes

We offer a flexible remote work environment, competitive salary, and opportunities for professional growth.`,
    requirements: [
      '3+ years of frontend development experience',
      'Strong proficiency in React and JavaScript (ES6+)',
      'Experience with CSS3, HTML5, and responsive design',
      'Familiarity with state management (Redux or Context API)',
      'Knowledge of modern build tools (Webpack, Vite)',
      'Experience with version control (Git)',
      'Strong attention to detail and design sensibility'
    ],
    postedDate: '2024-01-14T14:30:00Z',
    applicationUrl: 'https://indeed.com/apply/456',
    isRemote: true,
    tags: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Redux', 'Responsive Design']
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'Innovation Labs',
    location: 'Austin, TX',
    platform: 'Naukri.com',
    type: 'full-time',
    experienceLevel: 'mid',
    salary: '$90K - $130K',
    description: `We are seeking a talented Full Stack Developer to join our innovative team. You will work on both frontend and backend technologies to build robust, scalable web applications that serve our global customer base.

Your role will include:
• Developing full-stack web applications using modern frameworks
• Building RESTful APIs and microservices
• Working with databases and data modeling
• Implementing security best practices
• Collaborating with product managers and designers
• Participating in the entire software development lifecycle

We offer excellent benefits, flexible working hours, and a collaborative work environment that encourages innovation and creativity.`,
    requirements: [
      '4+ years of full-stack development experience',
      'Proficiency in both frontend (React, Vue.js) and backend (Node.js, Python) technologies',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Knowledge of RESTful API design and implementation',
      'Familiarity with cloud services and DevOps practices',
      'Strong problem-solving skills and attention to detail',
      'Experience with testing frameworks and CI/CD pipelines'
    ],
    postedDate: '2024-01-13T09:15:00Z',
    applicationUrl: 'https://naukri.com/apply/789',
    isRemote: false,
    tags: ['Full Stack', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'REST API']
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'DataDriven Co.',
    location: 'New York, NY',
    platform: 'Glassdoor',
    type: 'full-time',
    experienceLevel: 'senior',
    salary: '$110K - $160K',
    description: `Join our data science team to help drive business decisions through advanced analytics and machine learning. We're looking for an experienced Data Scientist who can translate complex data into actionable insights.

Key responsibilities:
• Develop and deploy machine learning models
• Analyze large datasets to identify patterns and trends
• Create data visualizations and reports for stakeholders
• Collaborate with engineering teams to implement ML solutions
• Design and conduct A/B tests and statistical analyses
• Present findings to both technical and non-technical audiences

We work with cutting-edge technologies and big data platforms, offering opportunities to work on challenging problems that impact millions of users.`,
    requirements: [
      'PhD or Master\'s in Data Science, Statistics, or related field',
      '5+ years of experience in data science and machine learning',
      'Proficiency in Python, R, and SQL',
      'Experience with ML frameworks (TensorFlow, PyTorch, Scikit-learn)',
      'Strong statistical analysis and modeling skills',
      'Experience with big data technologies (Spark, Hadoop)',
      'Excellent communication and presentation skills'
    ],
    postedDate: '2024-01-12T16:45:00Z',
    applicationUrl: 'https://glassdoor.com/apply/101',
    isRemote: false,
    tags: ['Data Science', 'Machine Learning', 'Python', 'TensorFlow', 'SQL', 'Statistics']
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudFirst Solutions',
    location: 'Seattle, WA',
    platform: 'Indeed',
    type: 'full-time',
    experienceLevel: 'mid',
    salary: '$95K - $140K',
    description: `We are looking for a skilled DevOps Engineer to join our infrastructure team. You will be responsible for automating deployments, managing cloud infrastructure, and ensuring the reliability and scalability of our systems.

What you'll be doing:
• Design and implement CI/CD pipelines
• Manage cloud infrastructure on AWS/Azure
• Automate deployment and monitoring processes
• Ensure system security and compliance
• Troubleshoot and resolve infrastructure issues
• Collaborate with development teams to optimize application performance

This role offers great opportunities to work with modern cloud technologies and DevOps practices in a fast-paced environment.`,
    requirements: [
      '3+ years of DevOps or Site Reliability Engineering experience',
      'Strong experience with AWS or Azure cloud platforms',
      'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
      'Experience with containerization (Docker, Kubernetes)',
      'Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)',
      'Scripting skills in Python, Bash, or PowerShell',
      'Understanding of monitoring and logging tools'
    ],
    postedDate: '2024-01-11T11:20:00Z',
    applicationUrl: 'https://indeed.com/apply/202',
    isRemote: true,
    tags: ['DevOps', 'AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Python']
  },
  {
    id: '6',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Boston, MA',
    platform: 'LinkedIn',
    type: 'full-time',
    experienceLevel: 'senior',
    salary: '$130K - $170K',
    description: `We are seeking an experienced Product Manager to lead our product strategy and drive innovation. You will work closely with engineering, design, and business teams to deliver products that delight our customers and drive business growth.

Your responsibilities will include:
• Define product vision, strategy, and roadmap
• Gather and prioritize product and customer requirements
• Work closely with engineering teams to deliver products
• Analyze market trends and competitive landscape
• Define success metrics and track product performance
• Collaborate with stakeholders across the organization

This is a great opportunity to make a significant impact on our product direction and work with a talented team in a fast-growing company.`,
    requirements: [
      '5+ years of product management experience in tech companies',
      'Strong analytical and problem-solving skills',
      'Experience with product analytics tools',
      'Excellent communication and presentation skills',
      'Understanding of software development processes',
      'Experience with A/B testing and data-driven decision making',
      'Bachelor\'s degree in Business, Engineering, or related field'
    ],
    postedDate: '2024-01-10T13:30:00Z',
    applicationUrl: 'https://linkedin.com/jobs/apply/303',
    isRemote: false,
    tags: ['Product Management', 'Strategy', 'Analytics', 'Leadership', 'Agile', 'User Research']
  }
];

export const searchJobs = async (title: string, location: string): Promise<Job[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Filter jobs based on search criteria
  let filteredJobs = mockJobs;
  
  if (title) {
    const titleLower = title.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(titleLower) ||
      job.tags.some(tag => tag.toLowerCase().includes(titleLower)) ||
      job.description.toLowerCase().includes(titleLower)
    );
  }
  
  if (location && location.toLowerCase() !== 'remote') {
    const locationLower = location.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(locationLower) ||
      (location.toLowerCase().includes('remote') && job.isRemote)
    );
  }
  
  // If location is "remote", show remote jobs
  if (location && location.toLowerCase().includes('remote')) {
    filteredJobs = filteredJobs.filter(job => job.isRemote);
  }
  
  return filteredJobs;
};

export const getJobById = async (jobId: string): Promise<Job | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockJobs.find(job => job.id === jobId) || null;
};