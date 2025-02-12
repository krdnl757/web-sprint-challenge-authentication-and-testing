const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const jokesRoutes = require('./routes/jokes');

const app = express();
app.use(bodyParser.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/jokes', jokesRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
