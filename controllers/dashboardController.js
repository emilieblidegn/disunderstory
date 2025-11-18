const eventModel = require('../models/eventModel');

async function renderDashboard(req, res) {
  try {
    // Hent user fra cookie (auth middleware garanterer at den findes)
    const user = req.cookies.user;

    // Hent alle events
    const events = await eventModel.getAllEvents();

    const formattedEvents = events.map(event => {
      const start = new Date(event.StartTid);
      const end = new Date(event.SlutTid);

      return {
        OplevelseID: event.OplevelseID,
        Navn: event.Navn,
        Pris: event.Pris,

        Dato: start.toLocaleDateString('da-DK', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),

        Start: start.toLocaleTimeString('da-DK', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),

        Slut: end.toLocaleTimeString('da-DK', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
    });

    // RENDER MED USERNAME + EVENTS
    res.render('dashboard', { 
      user: user,           
      events: formattedEvents 
    });

  } catch (err) {
    console.error("Fejl ved visning af dashboard:", err);
    res.status(500).send("Kunne ikke hente dashboard.");
  }
}

module.exports = {
  renderDashboard
};
