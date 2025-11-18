const orderModel = require('../models/orderModel');

async function createOrder(req, res) {
    try {
      console.log("COOKIE:", req.cookies);
      console.log("BODY:", req.body);
  
      const kunde = req.cookies.user;
      const { oplevelseId } = req.body;
  
      await orderModel.createOrder(kunde.id, oplevelseId);
  
      res.status(201).send("Ordre oprettet");
    } catch (err) {
      console.error("Fejl i createOrder:", err);
      res.status(500).send("Serverfejl");
    }
  }

module.exports = {
  createOrder
};
