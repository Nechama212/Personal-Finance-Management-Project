import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../services/emailService'; // Correct path to the email service

const prisma = new PrismaClient();

// Sign-up user function
const signUpUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, UserName, Password, Language } = req.body;

    console.log(`Sign-up attempt for email: ${Email}`);

    // Hash password before saving it to the database
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user in the database with emailVerified set to false
    const newUser = await prisma.user.create({
      data: {
        Email,
        UserName,
        Password: hashedPassword,
        Language,
        emailVerified: false, // Set emailVerified to false initially
      },
    });

    // Create a verification link with success page URL
    const verificationLink = `http://localhost:3000/verify-email/success?email=${newUser.Email}`;

    // Send verification email with the link
    await sendVerificationEmail(newUser.Email, verificationLink);
    console.log(`Verification email sent to ${newUser.Email}`);

    // Respond with the new user data (not including password)
    res.status(201).json({
      message: 'User created successfully. Please verify your email.',
      user: { Email: newUser.Email, UserName: newUser.UserName },
    });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(400).json({ error: 'Email is already registered or invalid data provided.' });
  }
};

// Login user function
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Password } = req.body;

    console.log(`Login attempt for email: ${Email}`);

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { Email },
    });

    if (!user) {
      console.log(`Error: User not found with email: ${Email}`);
      res.status(400).json({ error: 'User not found' });
      return;
    }

    // Compare password with the hashed password
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      console.log(`Error: Invalid password for user: ${Email}`);
      res.status(400).json({ error: 'Invalid password' });
      return;
    }

    

    console.log(`Login successful for user: ${Email}`);

    // Generate JWT token if authentication and email verification succeed
    const token = jwt.sign({ email: user.Email }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(400).json({ error: 'Invalid credentials or server error.' });
  }
};

export { signUpUser, loginUser };