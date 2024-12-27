import { createClient } from '@vercel/edge-config';

const edgeConfig = createClient({
  id: process.env.EDGE_CONFIG_ID,
  token: process.env.EDGE_CONFIG_TOKEN
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const users = await edgeConfig.get('users') || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
} 
