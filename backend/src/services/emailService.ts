import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

// Your OAuth2 credentials from Google Cloud Console
const CLIENT_ID = process.env.CLIENT_ID || '343516240235-digjemlmvd3k2q4suln9fusn13pr07ca.apps.googleusercontent.com';

const CLIENT_SECRET = process.env.CLIENT_SECRET || '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';
const REDIRECT_URI = process.env.REDIRECT_URI || 'https://8fdc-2a01-6502-6458-710d-eccb-5da0-363a-2ee7.ngrok-free.app'; // The URI for redirect after authentication

// Create a new OAuth2 client instance
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Function to get a new access token using the authorization code (for first-time login)
async function getAccessToken(authCode: string): Promise<string> {
  // Get the access token using the authorization code
  const { tokens } = await oAuth2Client.getToken(authCode);
  oAuth2Client.setCredentials(tokens);

  if (!tokens.access_token) {
    throw new Error('Failed to obtain access token.');
  }

  console.log('New access token:', tokens.access_token); // Log the new access token
  return tokens.access_token;
}

// Function to send the monthly financial summary email
export const sendMonthlySummaryEmail = async (
  to: string, // Recipient's email address
  totalExpenses: number,
  totalIncomes: number,
  balance: number,
  authCode: string // Authorization code from the OAuth2 flow
) => {
  const subject = 'Your Monthly Financial Summary'; // Email subject

  // Create the text content of the email based on the balance
  const text =
    balance >= 0
      ? `Great job! You saved ₪${balance.toFixed(2)} last month. Total Expenses: ₪${totalExpenses.toFixed(2)}, Total Incomes: ₪${totalIncomes.toFixed(2)}.`
      : `Be careful! You have a deficit of ₪${Math.abs(balance).toFixed(2)} last month. Total Expenses: ₪${totalExpenses.toFixed(2)}, Total Incomes: ₪${totalIncomes.toFixed(2)}.`;

  // Get the new access token using the authorization code
  const newAccessToken = await getAccessToken(authCode);

  // Create the transporter object using Gmail and OAuth2 authentication
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail as the email service
    auth: {
      type: 'OAuth2',
      user: 'nechamasayada@gmail.com', // Your Gmail address
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      accessToken: newAccessToken, // Use the new access token
    },
  });

  // Send the email using the transporter
  await transporter.sendMail({
    from: 'nechamasayada@gmail.com', // Sender's email address
    to, // Recipient's email address (this is the email of your user)
    subject, // Subject of the email
    text, // Body of the email
  });

  // Log the success message
  console.log(`Email sent to ${to}`);
};

// Call this function and pass the email address you want to send to
sendMonthlySummaryEmail('d0548508923@gmail.com', 1000, 1500, 500, 'your-auth-code'); 