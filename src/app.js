const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const { logger } = require("./utils/winston");
const cors = require('cors');
const log = logger();
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    const apiKey = req.headers["authorization"];
    if (!apiKey || apiKey !== `Bearer ${process.env.API_KEY}`) {
        log.warn(`${ip} has incorrect API key: ${apiKey}`);
        return res.status(403).json({ error: "Forbidden: Invalid API Key" });
    }
    log.info(`Authorized ${req.method} request from IP: ${ip}, Body: ${JSON.stringify(req.body)}`);
    next();
});

app.post("/create-table", async (req, res) => {
  const { tableName, columns } = req.body;
  try {
    await pool.query(`CREATE TABLE ${tableName} (${columns})`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/drop-table", async (req, res) => {
  const { tableName } = req.body;
  try {
    await pool.query(`DROP TABLE IF EXISTS ${tableName}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/insert", async (req, res) => {
  const { tableName, data } = req.body;
  try {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map(() => "?").join(", ");
    await pool.query(`INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`, values);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/view", async (req, res) => {
  const { tableName } = req.query;
  try {
    const [rows] = await pool.query(`SELECT * FROM ${tableName}`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/update", async (req, res) => {
  const { tableName, updates, where } = req.body;
  try {
    const setClause = Object.entries(updates).map(([k]) => `${k} = ?`).join(", ");
    const whereClause = Object.entries(where).map(([k]) => `${k} = ?`).join(" AND ");
    const values = [...Object.values(updates), ...Object.values(where)];
    await pool.query(`UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`, values);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/delete", async (req, res) => {
  const { tableName, where } = req.body;
  try {
    const whereClause = Object.entries(where).map(([k]) => `${k} = ?`).join(" AND ");
    const values = Object.values(where);
    await pool.query(`DELETE FROM ${tableName} WHERE ${whereClause}`, values);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/sql", async (req, res) => {
    const { sql, params = [] } = req.body;
    if (typeof sql !== "string") {
        return res.status(400).json({ error: "SQL must be a string." });
    }
    try {
        const [result] = await pool.query(sql, params);
        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
  log.info('Thanks for using NetDB! Made by Linus.');
  log.info(`Access NetDB APIs at ${port}`);
});