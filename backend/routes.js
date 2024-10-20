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

router.get('/dailyRequestCounts', async (req, res) => {
    try {
        const limit = 30;
        const dailyRequestCounts = await db.getDailyRequestCounts(limit);
        res.json(dailyRequestCounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch daily request counts');
    }
});

router.get('/dailyItemCounts', async (req, res) => {
    try {
        const limit = 29;
        const dailyItemCounts = await db.getDailyItemCounts(limit);
        res.json(dailyItemCounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch daily item counts');
    }
});

router.get('/hotBuildingCounts', async (req, res) => {
    try {
        const limit = 10;
        const days = 90
        const hotBuildingCounts = await db.getHotBuildingCounts(limit, days);
        res.json(hotBuildingCounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch hot building counts');
    }
});

module.exports = router;
