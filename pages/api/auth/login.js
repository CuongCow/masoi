import { createClient } from '@vercel/edge-config';

const edgeConfig = createClient({
  id: 'ecfg_rcpagu6nlfhtmdtqx2rn7fjynh2y',
  token: '17358adf-6f14-4e96-a66f-a30f5565e381'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;
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