import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { sendVerificationEmail } from '../services/emailService'; // Import the email service

const prisma = new PrismaClient();

/**
 * Retrieve all users from the database.
 */
const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', (error as Error).message);
    return res.status(400).json({ error: (error as Error).message });
  }
};

/**
 * Retrieve a specific user by email.
 */
const getUserByEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(`Fetching user with email: ${req.params.email}`);
    const user = await prisma.user.findUnique({
      where: { Email: req.params.email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', (error as Error).message);
    return res.status(400).json({ error: (error as Error).message });
  }
};

/**
 * Check and list all existing users.
 */
const checkExistingUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log('Fetching all users...');
    const users = await prisma.user.findMany();
    console.log('Users:', users);
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error checking users:', (error as Error).message);
    return res.status(400).json({ error: (error as Error).message });
  }
};

/**
 * Create a new user and send a verification email.
 */
const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { Email, UserName, Password, Language } = req.body;

    // Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { Email },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user with emailVerified set to false
    const newUser = await prisma.user.create({
      data: { 
        Email, 
        UserName, 
        Password: hashedPassword, // Store the hashed password
        Language 
      },
    });

    // Generate a verification link
    const verificationLink = `http://your-app.com/verify-email?token=${newUser.Email}`;

    // Send verification email
    await sendVerificationEmail(newUser.Email, verificationLink);

    console.log('Verification email sent to:', newUser.Email);
    return res.status(201).json({ message: 'User created. Please verify your email.' });
  } catch (error) {
    console.error('Error creating user:', (error as Error).message);
    return res.status(400).json({ error: (error as Error).message });
  }
};

/**
 * Update user details.
 */
const updateUserDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { Email: req.params.email },
      data: req.body,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', (error as Error).message);
    return res.status(400).json({ error: (error as Error).message });
  }
};

/**
 * Delete a user by email.
 */
const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    await prisma.user.delete({
      where: { Email: req.params.email },
    });
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', (error as Error).message);
    return res.status(400).json({ error: (error as Error).message });
  }
};

/**
 * Verify user email.
 */
const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  const email = req.params.email;

  try {
    // Update the emailVerified field to true
    const updatedUser = await prisma.user.update({
      where: { Email: email },
      data: { emailVerified: true },
    });

    return res.status(200).json({ message: 'Email verified successfully', user: updatedUser });
  } catch (error) {
    console.error('Error verifying email:', (error as Error).message);
    return res.status(400).json({ error: (error as Error).message });
  }
};

// Exporting functions for use in routes
export {
  getAllUsers,
  getUserByEmail,
  checkExistingUsers,
  createUser,
  updateUserDetails,
  deleteUser,
  verifyEmail
};