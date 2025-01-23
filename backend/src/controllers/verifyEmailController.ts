import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the 'email' query parameter is provided in the request URL
    const { email } = req.query; // Use 'email' with lowercase 'e'

    // If the email is not provided, log an error and return a bad request response
    if (!email) {
      console.log('Error: No email provided in the verification link');
      console.log('Query Parameters:', req.query); // Log query parameters for debugging
      res.status(400).send('Invalid verification link.');
      return;
    }

    console.log(`Verifying email: ${email}`);

    // Find the user in the database using the email field (lowercase 'email')
    const user = await prisma.user.findUnique({
      where: { Email: String(email) }, // Ensure email is treated as a string
    });

    // If the user is not found in the database, return an error
    if (!user) {
      console.log(`Error: User not found with email: ${email}`);
      res.status(400).send('User not found');
      return;
    }

    // Log user data for debugging
    console.log(`User found: ${JSON.stringify(user)}`);

    // Check if the email has already been verified
    if (user.emailVerified) {
      console.log(`User with email: ${email} is already verified`);
      res.status(200).send('Email is already verified.');
      return;
    }

    // Update the user's emailVerified status to true if not already verified
    console.log(`Updating emailVerified status for user: ${email}`);
    await prisma.user.update({
      where: { Email: String(email) },
      data: { emailVerified: true }, // Set emailVerified to true
    });

    console.log(`Email verification successful for: ${email}`);

    // Redirect the user to the success page after successful verification
    res.redirect(`http://localhost:3000/verify-email/success?email=${email}`);
  } catch (error) {
    // Handle any server errors
    console.error('Error verifying email:', error);
    res.status(500).json({ error: 'Server error during email verification' });
  }
};

export { verifyEmail };