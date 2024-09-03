const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.post('/api/gastos', (req, res) => {
  console.log(req.body); // Verifica los datos recibidos
  res.json({ success: true }); // Respuesta JSON
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
