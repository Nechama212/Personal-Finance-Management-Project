import nodemailer from 'nodemailer';

/**
 * Send verification email to the user's email address.
 * @param email - The email address of the user to send the verification link to.
 * @param verificationLink - The verification link to be included in the email.
 */
export const sendVerificationEmail = async (email: string, verificationLink: string): Promise<void> => {
  // Create a transporter object using SMTP transport.
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can replace this with your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email user (from .env)
      pass: process.env.EMAIL_PASS, // Your email password (from .env)
    },
    tls: {
      rejectUnauthorized: false, // Disable certificate validation, may help in certain environments
    },
  });

  // Set up the email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: email, // Receiver's email address
    subject: 'Please Verify Your Email Address', // Subject of the email
    text: `Hello, \n\nPlease click on the link below to verify your email address: \n\n${verificationLink}\n\nThank you!`, // Body of the email
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email.');
  }
};