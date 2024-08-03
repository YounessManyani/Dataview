import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';

dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables
const HOST = process.env.DB_HOST || 'localhost';
const USER = process.env.DB_USER || 'webApp';
const PASSWORD = process.env.DB_PASSWORD || 'Xi7ebmX!X@QSHnPy';
const DATABASE = process.env.DB_NAME || 'world';
const DB_PORT = process.env.DB_PORT || 3306;
const PORT = process.env.PORT || 3000;

// Create an Express app
const app = express();

// Enable CORS for all origins
app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// MySQL connection pool configuration
const pool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: DB_PORT,
}).promise();

// Function to execute SQL queries
async function runQuery(query, params = []) {
  try {
    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// API routes

// Fetch all countries in the world
app.get('/api/countries/world', async (req, res) => {
  const query = 'SELECT Name, Population FROM country ORDER BY Population DESC';
  try {
    const countries = await runQuery(query);
    res.json(countries);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch countries by region
app.get('/api/countries/region/:region', async (req, res) => {
  const { region } = req.params;
  const query = 'SELECT Name, Population FROM country WHERE Region = ? ORDER BY Population DESC';
  try {
    const countries = await runQuery(query, [region]);
    res.json(countries);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch a limited number of countries in the world
app.get('/api/countries/world/:limit', async (req, res) => {
  const limit = parseInt(req.params.limit, 10);
  const query = 'SELECT Name, Population FROM country ORDER BY Population DESC LIMIT ?';
  try {
    const countries = await runQuery(query, [limit]);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch countries in a continent with a limit
app.get('/api/countries/continent/:continent/:limit', async (req, res) => {
  const { continent, limit } = req.params;
  const query = 'SELECT Name, Population FROM country WHERE Continent = ? ORDER BY Population DESC LIMIT ?';
  try {
    const countries = await runQuery(query, [continent, parseInt(limit, 10)]);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch cities worldwide with a limit
app.get('/api/cities/world/:limit', async (req, res) => {
  const limit = parseInt(req.params.limit, 10);
  const query = 'SELECT Name, CountryCode, District, Population FROM city ORDER BY Population DESC LIMIT ?';
  try {
    const cities = await runQuery(query, [limit]);
    res.json(cities);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch cities in a continent with a limit
app.get('/api/cities/continent/:continent/:limit', async (req, res) => {
  const { continent, limit } = req.params;
  const query = `
    SELECT city.Name, city.CountryCode, city.District, city.Population
    FROM city
    JOIN country ON city.CountryCode = country.Code
    WHERE country.Continent = ?
    ORDER BY city.Population DESC
    LIMIT ?
  `;
  try {
    const cities = await runQuery(query, [continent, parseInt(limit, 10)]);
    res.json(cities);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch cities in a region with a limit
app.get('/api/cities/region/:region/:limit', async (req, res) => {
  const { region, limit } = req.params;
  const query = `
    SELECT city.Name, city.CountryCode, city.District, city.Population
    FROM city
    JOIN country ON city.CountryCode = country.Code
    WHERE country.Region = ?
    ORDER BY city.Population DESC
    LIMIT ?
  `;
  try {
    const cities = await runQuery(query, [region, parseInt(limit, 10)]);
    res.json(cities);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch all cities in the world
app.get('/api/cities/world', async (req, res) => {
  const query = 'SELECT Name, CountryCode, District, Population FROM city ORDER BY Population DESC';
  try {
    const cities = await runQuery(query);
    res.json(cities);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch a report of all countries
app.get('/api/country/report', async (req, res) => {
  const query = 'SELECT Code, Name, Continent, Region, Population, Capital FROM country ORDER BY Population DESC';
  try {
    const countries = await runQuery(query);
    res.json(countries);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Fetch a report of all cities
app.get('/city/report', async (req, res) => {
  const query = `
    SELECT city.Name AS CityName, country.Name AS CountryName, District, city.Population
    FROM city
    JOIN country ON city.CountryCode = country.Code
    ORDER BY city.Population DESC
  `;
  try {
    const cities = await runQuery(query);
    res.json(cities); // Ensure the response is JSON
  } catch (error) {
    console.error('Error retrieving city data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Serve the React app's static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
