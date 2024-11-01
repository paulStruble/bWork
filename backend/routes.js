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
        const days = 90;
        const dailyItemCounts = await db.getDailyItemCounts(days);
        res.json(dailyItemCounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch daily item counts');
    }
});

router.get('/buildingDailyItemCounts', async (req, res) => {
    try {
        const building = 'Norton Hall';
        const days = 90;
        const buildingDailyItemCounts = await db.getBuildingDailyItemCounts(building, days);
        res.json(buildingDailyItemCounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: failed to fetch daily building item counts for <${building}>`);
    }
});

router.get('/hotBuildingCounts', async (req, res) => {
    try {
        const limit = 100;
        const days = 90;
        const hotBuildingCounts = await db.getHotBuildingCounts(limit, days);
        res.json(hotBuildingCounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch hot building counts');
    }
});

router.get('/buildingRequestCounts', async (req, res) => {
    try {
        const days = 90;
        const buildingRequestCounts = await db.getBuildingRequestCounts(days);
        res.json(buildingRequestCounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch building request counts');
    }
});

router.get('/recentRequestCount', async (req, res) => {
    try {
        const days = 90;
        const recentRequestCount = await db.getRecentRequestCount(days);
        res.json(recentRequestCount);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch recent request count');
    }
});

router.get('/buildingRecentRequestCount', async (req, res) => {
    try {
        const building = 'Norton Hall';
        const days = 90;
        const buildingRecentRequestCount = await db.getBuildingRecentRequestCount(building, days);
        res.json(buildingRecentRequestCount);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: failed to fetch recent request count for <${building}>`);
    }
});

router.get('/recentOrderCount', async (req, res) => {
    try {
        const days = 90;
        const recentOrderCount = await db.getRecentOrderCount(days);
        res.json(recentOrderCount);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: failed to fetch recent order count');
    }
});

router.get('/buildingRecentOrderCount', async (req, res) => {
    try {
        const building = 'Norton Hall';
        const days = 90;
        const buildingRecentOrderCount = await db.getBuildingRecentOrderCount(building, days);
        res.json(buildingRecentOrderCount);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: failed to fetch recent order count for <${building}>`);
    }
});

router.get('/recentBuildingRequests', async (req, res) => {
    try {
        const building = 'Norton Hall';
        const days = 90;
        const recentRequests = await db.getRecentBuildingRequests(building, days);
        res.json(recentRequests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: failed to fetch recent requests for <${building}>`);
    }
});

module.exports = router;
