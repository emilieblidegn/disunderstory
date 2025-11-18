const { poolPromise, sql } = require('../db');

async function createUser(name, email, hashedPassword) {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .query(`
        INSERT INTO dbo.Kunde (Navn, Email, HashedPassword)
        VALUES (@name, @email, @password)
      `);

    console.log("Bruger oprettet i databasen");
  } catch (err) {
    console.error("Fejl i createUser:", err);
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query(`
        SELECT * FROM dbo.Kunde WHERE Email = @email
      `);

    return result.recordset[0];
  } catch (err) {
    console.error("Fejl i getUserByEmail:", err);
    throw err;
  }
}

module.exports = {
  createUser,
  getUserByEmail
};
