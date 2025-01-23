import { Router, Request, Response } from 'express';
import {
  getAllUsers,
  getUserByEmail,
  checkExistingUsers,
  createUser,
  updateUserDetails,
  deleteUser,
  verifyEmail, // Import the verifyEmail function
} from '../controllers/userController';

const router = Router();

// Route to fetch all users
router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/users');
  getAllUsers(req, res);
});

// Route to fetch user by email
router.get('/:email', (req: Request, res: Response) => {
  console.log('GET /api/users/:email');
  getUserByEmail(req, res);
});

// Route to check existing users
router.get('/check-users', (req: Request, res: Response) => {
  console.log('GET /api/users/check-users');
  checkExistingUsers(req, res);
});

// Route to create a new user
router.post('/', (req: Request, res: Response) => {
  console.log('POST /api/users');
  createUser(req, res);
});

// Route to update user details
router.put('/:email', (req: Request, res: Response) => {
  console.log('PUT /api/users/:email');
  updateUserDetails(req, res);
});

// Route to delete a user
router.delete('/:email', (req: Request, res: Response) => {
  console.log('DELETE /api/users/:email');
  deleteUser(req, res);
});

// Route to verify email with query parameter for token
router.get('/verify-email', (req: Request, res: Response) => {
  console.log('GET /verify-email?token=' + req.query.token);
  verifyEmail(req, res); // Verify the email using the token
});

export { router as usersRouter };