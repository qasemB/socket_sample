const express = require('express');
require('./server.js');
const app = express();

app.use(express.json());
app.post('/api/receive-gps-data', (req, res) => {
    console.log('GPS Data received:', req.body);
    res.send('Data received');
});

// مسیر اصلی
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// راه‌اندازی سرور
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});