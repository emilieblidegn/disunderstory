const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendEventFinishedMail(to, customerName, eventName) {
  const info = await transporter.sendMail({
    from: `"xxxx" <${process.env.MAIL_USER}>`,
    to: to,
    subject: `Tak for at deltage i ${eventName}!`,
    text: `Hej ${customerName}! Tak fordi du deltog i ${eventName}.`,
    html: `<p>Hej <b>${customerName}</b></p><p>Tak for at du deltog i <b>${eventName}</b></p>`,
  });

  console.log("Mail sent:", info.messageId);
}

module.exports = { sendEventFinishedMail };
