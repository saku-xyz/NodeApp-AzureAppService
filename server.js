const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My Azure Node.js App 🚀</h1>
    <p>Deployed from GitHub to Azure App Service Free Tier.</p>
  `);
});

// Health route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
