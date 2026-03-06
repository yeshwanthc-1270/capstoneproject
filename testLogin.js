const axios = require('axios');

(async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('status', res.status, 'data', res.data);
  } catch (err) {
    if (err.response) console.error('err', err.response.status, err.response.data);
    else console.error('err', err.message);
  }
})();
