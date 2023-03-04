const express = require('express');
const app = express();
const connectDB = require('./config/database');

require('dotenv').config({ path: './config/.env' });

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
