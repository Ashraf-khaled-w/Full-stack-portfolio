import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSeed() {
  console.log('Seeding started...');
  try {
    // Read and run schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schemaSql);
    console.log('Database schema applied.');

    // Clear existing data
    await pool.query('TRUNCATE TABLE users, skills, experiences, projects, certifications, messages CASCADE');
    console.log('Cleared existing data.');

    // Seed Admin User
    const adminUsername = 'ashraf';
    const adminPassword = 'ashraf_portfolio_secure';
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2)',
      [adminUsername, passwordHash]
    );
    console.log(`Admin user created: username="${adminUsername}", password="${adminPassword}"`);

    // Seed Skills
    const skills = [
      // Languages
      { category: 'Languages', name: 'JavaScript (ES6+)', proficiency: 95 },
      { category: 'Languages', name: 'TypeScript', proficiency: 92 },
      { category: 'Languages', name: 'Python', proficiency: 85 },
      { category: 'Languages', name: 'SQL', proficiency: 90 },
      { category: 'Languages', name: 'Java', proficiency: 75 },
      // Frontend
      { category: 'Frontend', name: 'React.js (19)', proficiency: 95 },
      { category: 'Frontend', name: 'Next.js', proficiency: 88 },
      { category: 'Frontend', name: 'Redux Toolkit', proficiency: 85 },
      { category: 'Frontend', name: 'Tailwind CSS', proficiency: 95 },
      { category: 'Frontend', name: 'Material UI', proficiency: 80 },
      // Backend & Databases
      { category: 'Backend & Databases', name: 'Node.js', proficiency: 92 },
      { category: 'Backend & Databases', name: 'Express.js', proficiency: 95 },
      { category: 'Backend & Databases', name: 'Prisma ORM', proficiency: 90 },
      { category: 'Backend & Databases', name: 'PostgreSQL (JSONB)', proficiency: 92 },
      { category: 'Backend & Databases', name: 'RESTful APIs', proficiency: 95 },
      // Tools & DevOps
      { category: 'Tools & DevOps', name: 'Git & GitHub', proficiency: 90 },
      { category: 'Tools & DevOps', name: 'CI/CD', proficiency: 80 },
      { category: 'Tools & DevOps', name: 'Vite', proficiency: 92 },
      { category: 'Tools & DevOps', name: 'Docker', proficiency: 80 },
      { category: 'Tools & DevOps', name: 'Postman', proficiency: 90 },
      { category: 'Tools & DevOps', name: 'Linux', proficiency: 85 },
      // Core Concepts
      { category: 'Core Concepts', name: 'System Architecture', proficiency: 85 },
      { category: 'Core Concepts', name: 'Data Structures & Algorithms', proficiency: 80 },
      { category: 'Core Concepts', name: 'SDLC', proficiency: 88 },
      { category: 'Core Concepts', name: 'Role-Based Access Control (RBAC)', proficiency: 90 },
    ];

    for (const skill of skills) {
      await pool.query(
        'INSERT INTO skills (category, name, proficiency) VALUES ($1, $2, $3) ON CONFLICT (name) DO UPDATE SET proficiency = EXCLUDED.proficiency',
        [skill.category, skill.name, skill.proficiency]
      );
    }
    console.log('Skills seeded.');

    // Seed Experiences
    const experiences = [
      {
        company: 'Freelance',
        role: 'Web Developer',
        start_date: 'Dec 2023',
        end_date: 'Present',
        points: JSON.stringify([
          'Architected a high-performance SPA for HR Management & CRM using React 19, Vite, and Tailwind CSS.',
          'Engineered complex client-side state management using TanStack Query, optimizing API integration and data caching.',
          'Developed interactive, real-time data visualization dashboards with Recharts to enhance HR metric reporting.',
          'Implemented secure Role-Based Access Control (RBAC) and dynamic client-side routing.'
        ])
      },
      {
        company: 'Cura Care',
        role: 'IT & Database Administrator',
        start_date: 'Jun 2024',
        end_date: 'Jan 2025',
        points: JSON.stringify([
          'Optimized data tracking and reporting infrastructure through advanced Google Sheets automation and custom scripting.',
          'Managed company IT infrastructure, ensuring 99% system uptime and secure data handling.'
        ])
      }
    ];

    for (const exp of experiences) {
      await pool.query(
        'INSERT INTO experiences (company, role, start_date, end_date, points) VALUES ($1, $2, $3, $4, $5)',
        [exp.company, exp.role, exp.start_date, exp.end_date, exp.points]
      );
    }
    console.log('Experiences seeded.');

    // Seed Projects
    const projects = [
      {
        title: 'DataForge',
        description: 'Full-Stack Custom Data Modeling Platform',
        tech_stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Neon', 'Prisma'],
        github_url: 'https://github.com/Ashraf-khaled-w/DataForge',
        demo_url: 'https://data-forge-lyart.vercel.app/',
        image_url: 'dataforge.png',
        details: JSON.stringify({
          points: [
            'Engineered a schema-less data modeling engine using PostgreSQL JSONB, allowing dynamic user-defined data structures without migration overhead.',
            'Developed an in-memory high-performance ingestion pipeline using SheetJS and Multer, enabling bulk insertion of thousands of records in milliseconds.',
            'Implemented secure, stateless authentication using HTTP-only cookies and SameSite protection to prevent XSS/CSRF.',
            'Designed a resource-constrained engine to dynamically enforce subscription-based limits (Free, Pro, Team).',
            'Concurrent Session Limiting: Engineered a database-backed session state management system restricting active logins to a maximum of one concurrent device, invalidating existing user session tokens automatically upon new logins to prevent password/account sharing.',
            'Workspace Activity Audit Logging: Designed a structured activity audit engine recording all state-modifying database transactions (insertions, deletions, configuration updates, and bulk imports) with timestamps and active user IDs, displaying interactive change history logs to improve data integrity and compliance visibility.'
          ]
        })
      },
      {
        title: 'Lead Report Handler',
        description: 'Telesales Analytics Tool',
        tech_stack: ['React', 'Hooks', 'LocalStorage', 'Tailwind CSS'],
        github_url: 'https://github.com/Ashraf-khaled-w/Lead-Report-Handler-React-version-',
        demo_url: 'https://lead-report-handler-react.vercel.app/',
        image_url: 'lead_report_handler.png',
        details: JSON.stringify({
          points: [
            'Built a high-speed React application for real-time sales performance tracking and conversion analytics.',
            'Automated end-of-day metric reporting by implementing custom math engines for instant outreach calculations.'
          ]
        })
      },
      {
        title: 'Express & EJS Blog Platform',
        description: 'Event-Driven Content Management System',
        tech_stack: ['Node.js', 'Express', 'EJS', 'PostgreSQL'],
        github_url: 'https://github.com/Ashraf-khaled-w/NodeJS-exprees-EJS-Blog-Wed-site-',
        demo_url: null,
        image_url: 'ejs_blog_platform.png',
        details: JSON.stringify({
          points: [
            'Asynchronous Event Queue: Designed and implemented an event-driven task queue using Node.js EventEmitters to offload background tasks (such as sending user mail alerts, compiling analytics logs, and running automated cleanup routines) out of the main request-response cycle, significantly reducing API response latency.',
            'Server-Side Rendering (SSR): Built a dynamic frontend view rendering engine using EJS (Embedded JavaScript Templates) and Express, maximizing SEO indexing and minimizing initial page-load times compared to client-rendered applications.',
            'RESTful CRUD Architecture: Engineered RESTful endpoints for user registration, blog post curation, category tagging, and comment moderation, enforcing secure data validation rules at the server boundary.',
            'Structured Storage & Routing: Configured relational/JSON data schemas to persist blog entries, utilizing modular route middleware to manage authentication states and authorization rules.'
          ]
        })
      }
    ];

    for (const proj of projects) {
      await pool.query(
        'INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image_url, details) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [proj.title, proj.description, proj.tech_stack, proj.github_url, proj.demo_url, proj.image_url, proj.details]
      );
    }
    console.log('Projects seeded.');

    // Seed Certifications
    const certifications = [
      { title: 'React Web Developer', issuer: 'Root Academy', date: '2024' },
      { title: 'Python Programmer Bootcamp', issuer: '365 Data Science', date: '2023' },
      { title: 'Introduction to AI & Applications', issuer: 'Zewail City', date: '2023' }
    ];

    for (const cert of certifications) {
      await pool.query(
        'INSERT INTO certifications (title, issuer, date) VALUES ($1, $2, $3)',
        [cert.title, cert.issuer, cert.date]
      );
    }
    console.log('Certifications seeded.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();
