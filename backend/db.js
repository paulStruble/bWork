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

// const getDailyItemCounts = async (limit) => {
//     const query = `
//         WITH daily_request_counts AS (
//             SELECT accept_date::DATE AS date, COUNT(*) AS request_count
//             FROM request
//             WHERE accept_date NOTNULL
//             GROUP BY date 
//             ORDER BY date DESC 
//             LIMIT $1
//         ), daily_order_counts AS (
//             SELECT TO_DATE(request_date, 'MM-DD-YYYY') AS date, COUNT(*) AS order_count
//             FROM "order"
//             WHERE request_date NOTNULL
//             GROUP BY date
//         )
//             SELECT TO_CHAR(r.date, 'YYYY-MM-DD') AS date, CAST(request_count AS INT), CAST(order_count AS INT)
//             FROM daily_request_counts r LEFT JOIN daily_order_counts o
//             ON r.date = o.date
//             ORDER BY r.date`

//     const result = await pool.query(query, [limit]);
//     return result.rows;
// }

const getDailyItemCounts = async (days) => {
    const query = `
    WITH daily_order_counts AS (
        SELECT
            request_date::DATE AS date, COUNT(*) AS order_count
        FROM
            "order"
        WHERE 
        request_date NOTNULL
        GROUP BY 
            date
        ORDER BY
            date DESC 
    ), recent_order_counts AS (
        SELECT 
            *
        FROM 
            daily_order_counts
        WHERE 
            date <= CURRENT_DATE
            AND DATE >= CURRENT_date - INTERVAL '${days - 1} days'
    ), daily_request_counts AS (
        SELECT
            accept_date::DATE AS date, COUNT(*) AS request_count
        FROM
        request
        WHERE 
            accept_date NOTNULL 
        GROUP BY 
            date
    ), recent_request_counts AS (
        SELECT 
            *
        FROM 
            daily_request_counts
        WHERE 
            date <= CURRENT_DATE
            AND DATE >= CURRENT_DATE - INTERVAL '${days - 1} days'
    ), date_series AS (
        SELECT generate_series(
            CURRENT_DATE - INTERVAL '${days - 1} days', 
            CURRENT_DATE, 
            '1 day'::interval
        ) AS date
    )
    SELECT
        TO_CHAR(d.date, 'YYYY-MM-DD') AS date,
        COALESCE(order_count, 0)::INT AS order_count,
        COALESCE(request_count, 0)::INT AS request_count
    FROM 
        date_series d LEFT JOIN recent_order_counts o
            ON d.date = o.date
        LEFT JOIN recent_request_counts r
            ON d.date = r.date`;

    const result = await pool.query(query);
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
        AND request_date >= CURRENT_DATE - INTERVAL '${days - 1} days'
    GROUP BY
        building
    ORDER BY count DESC
    LIMIT ${limit}`;

    const result = await pool.query(query);
    return result.rows;
}

const getBuildingRequestCounts = async (days) => {
    const query = `
    WITH all_buildings AS (
        SELECT
            DISTINCT building
        FROM
            request
        WHERE 
            building NOTNULL 
        GROUP BY 
            building
    ), recent_building_counts AS (
    SELECT
        building,
        CAST(COUNT(*) AS INT) AS count
    FROM 
        request
    WHERE
        building NOTNULL 
        AND accept_date NOTNULL
        AND accept_date <= CURRENT_DATE
        AND accept_date >= CURRENT_DATE - INTERVAL '${days - 1} days'
    GROUP BY 
        building
    )
    SELECT
        a.building,
        COALESCE(count, 0) AS count
    FROM 
        all_buildings a LEFT JOIN recent_building_counts r
        ON a.building = r.building
    ORDER BY 
        a.building`;

    const result = await pool.query(query);
    return result.rows;
}

const getRecentRequestCount = async (days) => {
    const query = `
    SELECT
        COUNT(*) AS recent_request_count
    FROM 
        request
    WHERE 
        accept_date NOTNULL 
        AND accept_date <= CURRENT_DATE
        AND accept_Date >= CURRENT_DATE - INTERVAL '${days - 1} days'`;

    const result = await pool.query(query);
    const recentRequestCount = parseInt(result.rows[0].recent_request_count);
    return recentRequestCount;
}

const getRecentOrderCount = async (days) => {
    const query = `
    WITH order_dates AS (
        SELECT 
            request_date::DATE AS date
        FROM 
            "order"
        WHERE 
            request_date NOTNULL
    )
    SELECT
        COUNT(*) AS recent_order_count
    FROM
        order_dates
    WHERE 
        date <= CURRENT_DATE
        AND date >= CURRENT_DATE - INTERVAL '${days - 1} days'`;

    const result = await pool.query(query);
    const recentOrderCount = parseInt(result.rows[0].recent_order_count);
    return recentOrderCount;
}

const getRecentBuildingRequests = async (building, days) => {
    const query = `
    WITH norton_requests AS (
        SELECT
            building,	
            id,
            room,
            status,
            COALESCE(accept_date, reject_date) AS date,
            CASE WHEN status = 'Pending' THEN 1 ELSE 0 END AS pending
        FROM 
            request
        WHERE 
            building = '${building}'
    )
    SELECT
        id,
        room,
        status
    FROM
        norton_requests
    WHERE
        pending = 1
        OR (date >= CURRENT_DATE - INTERVAL '${days - 1} days' AND date <= CURRENT_DATE)
    ORDER BY 
        pending DESC,
        id DESC`;

    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    getMonthlyRequestCounts,
    getDailyRequestCounts,
    getDailyItemCounts,
    getHotBuildingCounts,
    getBuildingRequestCounts,
    getRecentRequestCount,
    getRecentOrderCount,
    getRecentBuildingRequests,
};
