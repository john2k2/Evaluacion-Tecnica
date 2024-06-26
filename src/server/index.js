const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config({ path: "./.env" });

const app = express();

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Sirve archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, "../../public")));

app.post("/subscribe", async (req, res) => {
  const subscriberData = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Tu correo
      pass: process.env.EMAIL_PASS, // Tu contraseña
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // dirección del remitente
    to: "admin@grupocober.online ", // lista de receptores
    subject: "Nuevo suscriptor", // Asunto
    text: JSON.stringify(subscriberData, null, 2), // cuerpo de texto sin formato
  };
  try {
    await transporter.sendMail(mailOptions);
    res.redirect("/success"); // Redirige a la página de éxito
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al enviar el correo: ${error.message}`);
  }
});

app.get("/success", (req, res) => {
  res.send(`
    <h1>Correo enviado</h1>
    <p>Serás redirigido en unos segundos...</p>
    <script>
      setTimeout(function(){
        window.location.href = '/';
      }, 3000);
    </script>
  `);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
