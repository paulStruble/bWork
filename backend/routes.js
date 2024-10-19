const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/requestChart', async (req, res) => {
    try {
        const limit = 12;
        const monthlyRequestCounts = await db.getMonthlyRequestCounts(limit);
        res.json(monthlyRequestCounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch monthly request counts');
    }
});

module.exports = router;
