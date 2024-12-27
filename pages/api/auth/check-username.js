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
    const { username } = req.body;
    const users = await edgeConfig.get('users') || [];
    
    const exists = users.some(user => user.username === username);
    
    return res.status(200).json({ exists });
  } catch (error) {
    console.error('Check username error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 