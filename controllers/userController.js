const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');


async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("Alle felter skal udfyldes.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser(name, email, hashedPassword);

    res.status(201).send("Bruger oprettet");
  } catch (err) {
    console.error("Fejl i signup:", err);
    res.status(500).send("Fejl ved oprettelse");
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).send("Bruger findes ikke.");
    }

    const match = await bcrypt.compare(password, user.HashedPassword);

    if (!match) {
      return res.status(401).send("Forkert adgangskode.");
    }
    // Sætter cookie
    res.cookie("user", {
      id: user.KundeID,
      name: user.Navn
    }, {
      httpOnly: true
    });

    res.status(200).send("Logget ind");
  } catch (err) {
    console.error("Fejl i login:", err);
    res.status(500).send("Fejl ved login");
  }
}

function logout(req, res) {
  res.clearCookie("user");
  res.status(200).send("Logged out");
}


module.exports = {
  signup,
  login,
  logout
};
