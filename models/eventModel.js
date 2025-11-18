const { poolPromise, sql } = require('../db');

// Henter alle events fra databasen
exports.getAllEvents = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Oplevelse ORDER BY StartTid');
    return result.recordset; // returnerer et array med alle events
  } catch (err) {
    console.error('Fejl ved hentning af events:', err);
    throw err;
  }
};