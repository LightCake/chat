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
  // Join the lobby on connection
  rooms["Lobby"].push({ ws, user: req.jwt.name });

  db.query(
    "SELECT m.id, r.name as room, u.name as user, m.text, m.created FROM messages m  LEFT OUTER JOIN rooms r ON (m.room_id = r.id) LEFT OUTER JOIN users u ON (u.id = m.user_id) WHERE r.name = $1 ORDER BY m.created ASC",
    ["Lobby"],
    (err, res) => {
      if (err) throw err;

      if (res) {
        const data = {
          type: "receive-messages",
          messages: res.rows
        };
        ws.send(JSON.stringify(data));
      }
    }
  );

  // rooms["Lobby"].forEach(client => client.ws.send("hello"));
  // Send list of rooms, when client connected to websocket
  const tent = db_rooms.map(room => {
    room.users = rooms[room.name].length;
    return room;
  });
  const data = {
    type: "receive-rooms",
    rooms: tent
  };
  ws.send(JSON.stringify(data));

  ws.on("message", message => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "join-room":
        [room.name].length[data.room.name].push({ ws, user: data.user.name });
        break;
      case "send-message":
        db.query(
          "INSERT INTO messages (user_id, room_id, text) VALUES ($1, $2, $3) RETURNING *",
          [data.user.id, data.room.id, data.message],
          (err, res) => {
            if (err) throw err;

            if (res) {
              const temp = {
                type: "receive-message",
                message: { ...res.rows[0], user: data.user.name }
              };
              rooms[data.room.name].forEach(client =>
                client.ws.send(JSON.stringify(temp))
              );
            }
          }
        );
        break;
      case "leave-room":
        // When leaving the room, remove the user from the clients array of the room
        rooms[data.room.name] = rooms[data.room.name].filter(
          client => client.user !== data.user.name
        );
    }
  });
});

// Routes
app.use("/api/users", users);

server.listen(5000, () => console.log(`Server listening on port ${5000}`));
