import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("agri_smart.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    location TEXT,
    language TEXT DEFAULT 'en'
  );

  CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    query TEXT,
    response TEXT,
    type TEXT, -- 'text', 'image', 'voice'
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS market_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    crop_name TEXT,
    price REAL,
    market TEXT,
    date TEXT
  );

  CREATE TABLE IF NOT EXISTS schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    eligibility TEXT,
    link TEXT
  );
`);

// Seed some data if empty
const schemeCount = db.prepare("SELECT COUNT(*) as count FROM schemes").get() as { count: number };
if (schemeCount.count === 0) {
  const insertScheme = db.prepare("INSERT INTO schemes (title, description, eligibility, link) VALUES (?, ?, ?, ?)");
  insertScheme.run("PM-KISAN", "Direct income support of Rs. 6,000 per year to all landholding farmer families.", "All landholding farmer families.", "https://pmkisan.gov.in/");
  insertScheme.run("Pradhan Mantri Fasal Bima Yojana", "Crop insurance scheme to provide financial support to farmers suffering from crop loss.", "All farmers including sharecroppers and tenant farmers.", "https://pmfby.gov.in/");
  insertScheme.run("Soil Health Card Scheme", "Provides information to farmers on nutrient status of their soil along with recommendations on appropriate dosage of nutrients.", "All farmers in India.", "https://soilhealth.dac.gov.in/");
}

const marketCount = db.prepare("SELECT COUNT(*) as count FROM market_prices").get() as { count: number };
if (marketCount.count === 0) {
  const insertPrice = db.prepare("INSERT INTO market_prices (crop_name, price, market, date) VALUES (?, ?, ?, ?)");
  const crops = ["Wheat", "Rice", "Corn", "Soybean", "Potato", "Tomato"];
  const markets = ["Azadpur Mandi", "Vashi Market", "Kalyan Mandi"];
  const today = new Date().toISOString().split('T')[0];
  
  crops.forEach(crop => {
    markets.forEach(market => {
      insertPrice.run(crop, Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500, market, today);
    });
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/schemes", (req, res) => {
    const schemes = db.prepare("SELECT * FROM schemes").all();
    res.json(schemes);
  });

  app.get("/api/market-prices", (req, res) => {
    const prices = db.prepare("SELECT * FROM market_prices").all();
    res.json(prices);
  });

  app.post("/api/save-query", (req, res) => {
    const { user_id, query, response, type } = req.body;
    const stmt = db.prepare("INSERT INTO queries (user_id, query, response, type) VALUES (?, ?, ?, ?)");
    const info = stmt.run(user_id || 1, query, response, type);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/history/:userId", (req, res) => {
    const history = db.prepare("SELECT * FROM queries WHERE user_id = ? ORDER BY timestamp DESC").all(req.params.userId);
    res.json(history);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
