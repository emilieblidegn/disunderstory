const { poolPromise, sql } = require('../db');

exports.createOrder = async (kundeId, oplevelseId) => {
    try {
        const pool = await poolPromise;

        await pool.request()
            .input('kundeId', sql.Int, kundeId)
            .input('oplevelseId', sql.Int, oplevelseId)
            .query(`
                INSERT INTO dbo.Ordre (KundeID, OplevelseID, DatoOprettet)
                VALUES (@kundeId, @oplevelseId, GETDATE())
            `);

        console.log("Ordre oprettet");
    } catch (err) {
        console.error("Fejl i createOrder:", err);
        throw err;
    }
};

exports.getOrdersForFinishedEvents = async () => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT 
          o.OrdreID,
          k.Email,
          k.Navn AS KundeNavn,
          e.Navn AS EventNavn,
          e.SlutTid
        FROM dbo.Ordre o
        JOIN dbo.Kunde k ON o.KundeID = k.KundeID
        JOIN dbo.Oplevelse e ON o.OplevelseID = e.OplevelseID
        WHERE e.SlutTid < GETDATE() AND o.Status = 0
      `);
  
      return result.recordset;
    } catch (err) {
      console.error("Fejl i getOrdersForFinishedEvents:", err);
      throw err;
    }
  };

  exports.setOrderStatus = async (ordreId, status) => {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('ordreId', sql.Int, ordreId)
        .input('status', sql.Int, status)
        .query(`
          UPDATE dbo.Ordre
          SET Status = @status
          WHERE OrdreID = @ordreId
        `);
    } catch (err) {
      console.error("Fejl i setOrderStatus:", err);
      throw err;
    }
  };