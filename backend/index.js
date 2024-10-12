const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./routes');

const port = process.env.PORT || 5000;

app.use(express.json());

// Handle API routes
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
