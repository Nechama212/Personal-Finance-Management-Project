import { Router, Request, Response } from 'express';
import {
  getAllUsers,
  getUserByEmail,
  checkExistingUsers,
  createUser,
  updateUserDetails,
  deleteUser
} from '../controllers/userController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/users');
  getAllUsers(req, res);
});

router.get('/:email', (req: Request, res: Response) => {
  console.log('GET /api/users/:email');
  getUserByEmail(req, res);
});

router.get('/check-users', (req: Request, res: Response) => {
  console.log('GET /api/users/check-users');
  checkExistingUsers(req, res);
});

router.post('/', (req: Request, res: Response) => {
  console.log('POST /api/users');
  createUser(req, res);
});

router.put('/:email', (req: Request, res: Response) => {
  console.log('PUT /api/users/:email');
  updateUserDetails(req, res);
});

router.delete('/:email', (req: Request, res: Response) => {
  console.log('DELETE /api/users/:email');
  deleteUser(req, res);
});

export { router as usersRouter };
