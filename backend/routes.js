const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/query', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "order" LIMIT 10');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
