// pages/api/auth/login.js

import { setCookie } from 'cookies-next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await verifyUserCredentials(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = createJwtToken(user);

    setCookie('token', token, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
    });

    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
