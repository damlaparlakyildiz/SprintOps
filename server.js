
const express = require("express");

const logger = require("./middleware/logger");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 3000;

// JSON verilerini işle
app.use(express.json());

// Logger Middleware
app.use(logger);

// Ana sayfa
app.get("/", (req, res) => {
  res.json({
    message: "SprintOps API çalışıyor!"
  });
});

// Görev yönetimi endpoint'leri
app.use("/tasks", taskRoutes);

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
