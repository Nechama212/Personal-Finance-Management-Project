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

router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.get('/check-users', checkExistingUsers);
router.post('/', createUser);
router.put('/:email', updateUserDetails);
router.delete('/:email', deleteUser);

export { router as usersRouter };
