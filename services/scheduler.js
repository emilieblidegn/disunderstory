const orderModel = require('../models/orderModel');
const { sendEventFinishedMail } = require('./mailService');

async function checkForFinishedEvents() {
  try {
    const orders = await orderModel.getOrdersForFinishedEvents();

    for (const order of orders) {
      await sendEventFinishedMail(order.Email, order.KundeNavn, order.EventNavn);
      await orderModel.setOrderStatus(order.OrdreID, 1);
      console.log(`Mail sendt til ${order.Email}`);
    }

  } catch (err) {
    console.error("Fejl i checkForFinishedEvents:", err);
  }
}


function startScheduler() {
  console.log("Scheduler started (tjekker hvert minut)");
  setInterval(checkForFinishedEvents, 60_000);
}

module.exports = startScheduler;

