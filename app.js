// Import Express.js
const express = require("express");
const resend = require("resend");

const Resend = new resend.Resend(process.env.RESEND_KEY);

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;

// Route for POST requests
app.post("/", (req, res) => {
  const body = req.body;
  Resend.emails
    .send({
      from: body.from,
      to: body.to,
      subject: body.subject,
      html: `
      <html>
        <body>
          <h1>Teste Resend</h1>
          <p>Cor: #FF0000</p>
          <p>Fonte: Inter</p>
        </body>
      </html>`,
    })
    .then(() => {
      console.log("Email enviado com sucesso para: " + body.to);
    });
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
