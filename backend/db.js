const { Pool } = require('pg');
require('dotenv').config();

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
        COUNT(*) AS request_count
    FROM 
        request
    WHERE 
        accept_date NOTNULL 
    GROUP BY 
        month_year,
        DATE_TRUNC('month', accept_date)
    ORDER BY 
        DATE_TRUNC('month', accept_date) DESC
    LIMIT
        $1;`
    
    const result = await pool.query(query, [limit]);
    return result.rows;
}

module.exports = {
    getMonthlyRequestCounts,
};
