import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.get("/",(req,res)=> res.json({success:true}))

// 🏥 Get nearby hospitals
app.get("/api/hospitals", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const radius = 5000;
    const type = "hospital";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Hospital API error:", error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
});

// 🚑 Get nearby ambulances
app.get("/api/ambulances", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const radius = 5000;
    const keyword = "ambulance";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Ambulance API error:", error);
    res.status(500).json({ error: "Failed to fetch ambulances" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
