import { deleteCookie } from 'cookies-next';

export default function handler(req, res) {
  if (req.method === 'POST') {
    deleteCookie('token', { req, res });

    return res.status(200).json({ message: 'Logout successful' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}