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
    const userData = req.body;
    const users = await edgeConfig.get('users') || [];
    
    // Kiểm tra username đã tồn tại
    if (users.some(user => user.username === userData.username)) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }
    
    // Thêm user mới
    users.push(userData);
    await edgeConfig.set('users', users);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
} 