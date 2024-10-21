const { Pool, types } = require('pg');
require('dotenv').config();

// parse integers as number (rather than string) for json formatting
types.setTypeParser(23, (val) => parseInt(val, 10));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const getMonthlyRequestCounts = async (limit) => {
    const query = `
        SELECT 
            TO_CHAR(accept_date, 'Month YYYY') AS month_year, 
            CAST(COUNT(*) AS INT) AS request_count
        FROM 
            request
        WHERE 
            accept_date NOTNULL 
        GROUP BY 
            month_year,
            DATE_TRUNC('month', accept_date)
        ORDER BY 
            DATE_TRUNC('month', accept_date)
        LIMIT
            $1;`
    
    const result = await pool.query(query, [limit]);
    return result.rows;
}

const getDailyRequestCounts = async (limit) => {
    const query = `
        SELECT
            TO_CHAR(accept_date, 'YYYY-MM-DD') AS day,
            CAST(COUNT(*) AS INT) AS request_count
        FROM
            request
        WHERE
            accept_date NOTNULL
        GROUP BY
            TO_CHAR(accept_date, 'YYYY-MM-DD'),
            DATE_TRUNC('day', accept_date)
        ORDER BY 
            DATE_TRUNC('day', accept_date)
        LIMIT
            $1;`
    
    const result = await pool.query(query, [limit]);
    return result.rows;
}

const getDailyItemCounts = async (limit) => {
    const query = `
        WITH daily_request_counts AS (
            SELECT accept_date::DATE AS date, COUNT(*) AS request_count
            FROM request
            WHERE accept_date NOTNULL
            GROUP BY date 
            ORDER BY date DESC 
            LIMIT $1
        ), daily_order_counts AS (
            SELECT TO_DATE(request_date, 'MM-DD-YYYY') AS date, COUNT(*) AS order_count
            FROM "order"
            WHERE request_date NOTNULL
            GROUP BY date
        )
            SELECT TO_CHAR(r.date, 'YYYY-MM-DD') AS date, CAST(request_count AS INT), CAST(order_count AS INT)
            FROM daily_request_counts r LEFT JOIN daily_order_counts o
            ON r.date = o.date
            ORDER BY r.date`

    const result = await pool.query(query, [limit]);
    return result.rows;
}

const getHotBuildingCounts = async (limit, days) => {
    const query = `
    WITH building_dates AS (
        SELECT 
            building,
            CAST(SUBSTRING(priority, 0, 2) AS INT) AS priority,
            request_date::DATE
        FROM
            "order"
        WHERE 
            request_date NOTNULL 
    )
    SELECT
        COUNT(*)::INT AS count,
        building,
        AVG(priority) AS average_priority
    FROM
        building_dates
    WHERE
        request_date <= CURRENT_DATE
        AND request_date >= CURRENT_DATE - INTERVAL '${days} days'
    GROUP BY
        building
    ORDER BY count DESC
    LIMIT ${limit}`;

    const result = await pool.query(query);
    return result.rows;
}

const getBuildingRequestCounts = async (days) => {
    const query = `
    SELECT
        building,
        CAST(COUNT(*) AS INT) AS count
    FROM 
        request
    WHERE
        building NOTNULL 
        AND accept_date NOTNULL
        AND accept_date <= CURRENT_DATE
        AND accept_date >= CURRENT_DATE - INTERVAL '${days} days'
    GROUP BY 
        building
    ORDER BY
        building`;

    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    getMonthlyRequestCounts,
    getDailyRequestCounts,
    getDailyItemCounts,
    getHotBuildingCounts,
    getBuildingRequestCounts,
};
