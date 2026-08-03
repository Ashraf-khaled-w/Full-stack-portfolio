import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../controllers/skillsController.js';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '../controllers/experiencesController.js';
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/projectsController.js';
import { getCertifications, addCertification, updateCertification, deleteCertification } from '../controllers/certificationsController.js';
import { getMessages, addMessage } from '../controllers/messagesController.js';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

// Auth route
router.post('/auth/login', login);

// Skills routes
router.get('/skills', getSkills);
router.post('/skills', authMiddleware, addSkill);
router.put('/skills/:id', authMiddleware, updateSkill);
router.delete('/skills/:id', authMiddleware, deleteSkill);

// Experiences routes
router.get('/experiences', getExperiences);
router.post('/experiences', authMiddleware, addExperience);
router.put('/experiences/:id', authMiddleware, updateExperience);
router.delete('/experiences/:id', authMiddleware, deleteExperience);

// Projects routes
router.get('/projects', getProjects);
router.post('/projects', authMiddleware, upload.single('image'), addProject);
router.put('/projects/:id', authMiddleware, upload.single('image'), updateProject);
router.delete('/projects/:id', authMiddleware, deleteProject);

// Certifications routes
router.get('/certifications', getCertifications);
router.post('/certifications', authMiddleware, addCertification);
router.put('/certifications/:id', authMiddleware, updateCertification);
router.delete('/certifications/:id', authMiddleware, deleteCertification);

// Messages routes
router.get('/messages', authMiddleware, getMessages);
router.post('/messages', addMessage);

export default router;
