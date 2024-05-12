const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

require("dotenv").config({ path: "../../.env" });

const app = express();

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post("/subscribe", async (req, res) => {
  const subscriberData = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Tu correo
      pass: process.env.EMAIL_PASS, // Tu contraseña
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: "johnmarket36@gmail.com", // list of receivers
    subject: "Nuevo suscriptor", // Subject line
    text: JSON.stringify(subscriberData, null, 2), // plain text body
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al enviar el correo: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
