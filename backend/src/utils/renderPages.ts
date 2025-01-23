// Utility function to render the verification success page
export const renderVerificationPage = (email: string): string => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
  </head>
  <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
    <h1>Email Verification Successful!</h1>
    <p>Your email <strong>${email}</strong> has been successfully verified.</p>
    <a href="http://localhost:3001/login" style="color: blue; text-decoration: underline; font-size: 18px;">Go to Login</a>
  </body>
  </html>
`;