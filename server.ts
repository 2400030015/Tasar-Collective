import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("tasar.db");
const JWT_SECRET = process.env.JWT_SECRET || "tasar-secret-key-2026";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'artisan', 'buyer', 'analyst')) DEFAULT 'buyer',
    region TEXT,
    bio TEXT,
    approved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    image_url TEXT,
    artisan_id INTEGER,
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artisan_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    buyer_id INTEGER,
    total_amount REAL NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    shipment_status TEXT DEFAULT 'processing',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    buyer_id INTEGER,
    product_id INTEGER,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER,
    receiver_id INTEGER,
    product_id INTEGER,
    content TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS artisan_verifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artisan_id INTEGER,
    loom_image_url TEXT,
    certificate_url TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artisan_id) REFERENCES users(id)
  );

  -- Seed Data
  INSERT OR IGNORE INTO users (id, name, email, password, role, region, bio, approved) 
  VALUES (1, 'Lakshmi Devi', 'lakshmi@example.com', '$2a$10$6B4423C8A951A67C52D9C5B2', 'artisan', 'Bhagalpur', '4th generation weaver', 1);

  INSERT OR IGNORE INTO products (id, name, description, category, price, stock, image_url, artisan_id)
  VALUES 
  (1, 'Tasar Silk Saree', 'Authentic hand-woven Tasar silk', 'Sarees', 12499, 10, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600', 1),
  (2, 'Hand-woven Stole', 'Natural dyed silk stole', 'Accessories', 2850, 25, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600', 1),
  (3, 'Raw Silk Fabric', 'Premium raw silk by the meter', 'Fabrics', 1200, 100, 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=600', 1);
`);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // --- Auth Routes ---
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password, role, region, bio } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare("INSERT INTO users (name, email, password, role, region, bio) VALUES (?, ?, ?, ?, ?, ?)");
      const result = stmt.run(name, email, hashedPassword, role || 'buyer', region || null, bio || null);
      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  });

  // --- Product Routes ---
  app.get("/api/products", (req, res) => {
    const products = db.prepare(`
      SELECT p.*, u.name as artisan_name 
      FROM products p 
      JOIN users u ON p.artisan_id = u.id
    `).all();
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    db.prepare("UPDATE products SET views = views + 1 WHERE id = ?").run(req.params.id);
    res.json(product);
  });

  app.post("/api/products", authenticateToken, (req: any, res) => {
    if (req.user.role !== 'artisan' && req.user.role !== 'admin') return res.sendStatus(403);
    const { name, description, category, price, stock, image_url } = req.body;
    const stmt = db.prepare("INSERT INTO products (name, description, category, price, stock, image_url, artisan_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
    const result = stmt.run(name, description, category, price, stock, image_url, req.user.id);
    res.status(201).json({ id: result.lastInsertRowid });
  });

  // --- Analytics Routes ---
  app.get("/api/analytics/sales", authenticateToken, (req: any, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'analyst') return res.sendStatus(403);
    const sales = db.prepare(`
      SELECT date(created_at) as date, SUM(total_amount) as total 
      FROM orders 
      GROUP BY date(created_at) 
      ORDER BY date ASC
    `).all();
    res.json(sales);
  });

  // --- Messaging Routes ---
  app.get("/api/messages", authenticateToken, (req: any, res) => {
    const messages = db.prepare(`
      SELECT m.*, u.name as sender_name, u2.name as receiver_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      JOIN users u2 ON m.receiver_id = u2.id
      WHERE m.sender_id = ? OR m.receiver_id = ?
      ORDER BY m.created_at DESC
    `).all(req.user.id, req.user.id);
    res.json(messages);
  });

  app.post("/api/messages", authenticateToken, (req: any, res) => {
    const { receiver_id, product_id, content } = req.body;
    const stmt = db.prepare("INSERT INTO messages (sender_id, receiver_id, product_id, content) VALUES (?, ?, ?, ?)");
    const result = stmt.run(req.user.id, receiver_id, product_id || null, content);
    res.status(201).json({ id: result.lastInsertRowid });
  });

  // --- Verification Routes ---
  app.post("/api/artisan/verify", authenticateToken, (req: any, res) => {
    if (req.user.role !== 'artisan') return res.sendStatus(403);
    const { loom_image_url, certificate_url } = req.body;
    const stmt = db.prepare("INSERT INTO artisan_verifications (artisan_id, loom_image_url, certificate_url) VALUES (?, ?, ?)");
    const result = stmt.run(req.user.id, loom_image_url, certificate_url);
    res.status(201).json({ id: result.lastInsertRowid });
  });

  app.get("/api/artisan/verification-status", authenticateToken, (req: any, res) => {
    const status = db.prepare("SELECT * FROM artisan_verifications WHERE artisan_id = ? ORDER BY created_at DESC LIMIT 1").get(req.user.id);
    res.json(status || { status: 'none' });
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

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
