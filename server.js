require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { MongoClient } = require("mongodb");
const multer = require('multer');
const MongoStore = require('connect-mongo'); 

const upload = multer();

const app = express();
const port = process.env.PORT || 8080;

let activeSessionsCount = 0;

app.use(cors({
  origin: 'http://localhost:8000', 
  credentials: true 
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: uri }), 
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 3600000 
  }
}));

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to database");
    } catch (err) {
        console.error("Database connection error", err);
    }
}

connectToDatabase();

app.post('/register', upload.none(), async (req, res) => {
    const db = client.db("UserAccountInfo");
    const collection = db.collection("UserInfo");

    const { email } = req.body;
    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already exists." });
    }

    const result = await collection.insertOne(req.body);
    if (result.acknowledged) {
        activeSessionsCount++;
        req.session.userId = email;
        res.json({ success: true, message: "Registration successful. You are now logged in." });
    } else {
        res.status(500).json({ success: false, message: "Registration failed due to server error." });
    }
});

app.post('/login', upload.none(), async (req, res) => {
    const db = client.db("UserAccountInfo");
    const collection = db.collection("UserInfo");
    const { email, password } = req.body;

    const user = await collection.findOne({ email: email });

    if (user && user.password === password) {
        req.session.userId = user.email;
        activeSessionsCount++;
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.status(401).json({ success: false, message: "Login failed: Incorrect email or password." });
    }
});

app.post('/check-availability', async (req, res) => {
  const { adults, children } = req.body;
  const db = client.db("RoomInfo");
  const collection = db.collection("RoomInfo");
  const availableRooms = await collection.aggregate([
      {
          $match: {
              isOccupied: false,
              adultsCapacity: { $gte: parseInt(adults) },
              childrenCapacity: { $gte: parseInt(children) }
          }
      },
      {
          $group: {
              _id: "$type",
              availableRoomsCount: { $sum: 1 }
          }
      },
      {
          $project: {
              _id: 0,
              type: "$_id",
              availableRoomsCount: 1
          }
      }
  ]).toArray();

  res.json(availableRooms);
});

app.get('/end-session', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (!err) {
          activeSessionsCount--;
          res.send(`Session ended successfully. Total active sessions: ${activeSessionsCount}`);
        }
      });
    } else {
      res.send("No active session.");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/session-test', (req, res) => {
    res.send(`Total active sessions: ${activeSessionsCount}`);
    if (req.session.userId) {
        res.send('You are logged in.');
    } else {
        res.send('No active session.');
    }
});
