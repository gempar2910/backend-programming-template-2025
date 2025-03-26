const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'abc@gmail.com' && password === '12345678') {
    return res.status(200).json({ message: 'Login berhasil' });
  } else {
    return res.status(401).json({ message: 'Email atau password salah' });
  }
});

module.exports = router;
