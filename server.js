const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const url = require("url");
const users = require("./routes/users");
const keys = require("./config/keys");
const db = require("./db");

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Passport configuration
require("./config/passport")(passport);

// WebSocket Server
const wss = new WebSocket.Server({
  server,
  verifyClient: (info, done) => {
    let query = url.parse(info.req.url, true).query;
    jwt.verify(query.token, keys.secretOrKey, (err, decoded) => {
      if (err) return done(false, 403, "Not valid token");
      info.req.jwt = decoded;
      done(true);
    });
  }
});

const rooms = {};
let db_rooms;
db.query("SELECT * FROM rooms", (err, res) => {
  if (err) throw err;

  if (res.rows.length > 0) {
    res.rows.forEach(room => (rooms[room.name] = []));
    db_rooms = res.rows;
  }
});

wss.on("connection", (ws, req) => {
  rooms["Lobby"].push({ ws, user: { id: req.jwt.id, name: req.jwt.name } });
  console.log(rooms);
  const data = {
    type: "receive_rooms",
    rooms: db_rooms
  };
  ws.send(JSON.stringify(data));
  ws.on("message", message => {
    const data = JSON.parse(message);

    switch (data.type) {
      case "send-message":
        db.query(
          "INSERT INTO messages (user_id, room_id, text) VALUES ($1, $2, $3) RETURNING *",
          [data.user.id, data.room.id, data.message],
          (err, res) => {
            if (err) throw err;

            if (res) {
              console.log(res.rows[0]);
              rooms[data.room.name];
            }
          }
        );
    }
  });
});

// Routes
app.use("/api/users", users);

server.listen(5000, () => console.log(`Server listening on port ${5000}`));
