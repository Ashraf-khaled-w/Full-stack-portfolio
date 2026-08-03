-- Create tables for portfolio

-- Table for Admin Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Skills
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL, -- 'Languages', 'Frontend', 'Backend', 'Tools & DevOps', 'Core Concepts'
    name VARCHAR(100) UNIQUE NOT NULL,
    proficiency INT DEFAULT 100, -- value from 0 to 100
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Experiences
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    points JSONB NOT NULL, -- Array of description strings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tech_stack VARCHAR(100)[] NOT NULL, -- Array of strings
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    image_url VARCHAR(255), -- Saved local filename or online URL
    details JSONB, -- Dynamic key-value pairs or structured points
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Certifications
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    date VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
