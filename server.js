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
    const { query } = url.parse(info.req.url, true);
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
  // Send list of rooms, when client connected to websocket with the number of users in each room
  const rooms_extended = db_rooms.map(room => {
    room.users = rooms[room.name].length;
    return room;
  });
  ws.send(
    JSON.stringify({
      type: "receive-rooms",
      rooms: rooms_extended
    })
  );

  ws.on("message", message => {
    const data = JSON.parse(message);

    switch (data.type) {
      case "join-room":
        // Insert the user in the clients array of the room
        rooms[data.room.name] = rooms[data.room.name].concat({
          ws,
          user: req.jwt.name
        });
        // Get all messages of the room from the database
        db.query(
          "SELECT m.id, r.name as room, u.name as user, m.text, m.created FROM messages m  LEFT OUTER JOIN rooms r ON (m.room_id = r.id) LEFT OUTER JOIN users u ON (u.id = m.user_id) WHERE r.name = $1 ORDER BY m.created ASC",
          [data.room.name],
          (err, res) => {
            if (err) throw err;

            if (res) {
              // Send all the room messages to the user
              ws.send(
                JSON.stringify({
                  type: "receive-messages",
                  messages: res.rows
                })
              );
            }
          }
        );
        // Get all users which are in the room and send it to the user
        ws.send(
          JSON.stringify({
            type: "receive-users",
            users: rooms[data.room.name]
          })
        );
        // Send the updated number of users in the room to all clients
        Object.values(rooms).forEach(arr => {
          arr.forEach(client =>
            client.ws.send(
              JSON.stringify({
                type: "update-users",
                room: {
                  name: data.room.name,
                  users: rooms[data.room.name].length
                }
              })
            )
          );
        });
        // Send the user object to all clients in the room
        rooms[data.room.name].forEach(client => {
          if (client.user !== req.jwt.name) {
            client.ws.send(
              JSON.stringify({
                type: "receive-user",
                user: {
                  ws,
                  user: req.jwt.name
                }
              })
            );
          }
        });
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
          client => client.user !== req.jwt.name
        );

        // Send the updated number of users in the room to all clients
        Object.values(rooms).forEach(arr => {
          arr.forEach(client =>
            client.ws.send(
              JSON.stringify({
                type: "update-users",
                room: {
                  name: data.room.name,
                  users: rooms[data.room.name].length
                }
              })
            )
          );
        });

        ws.send(
          JSON.stringify({
            type: "update-users",
            room: {
              name: data.room.name,
              users: rooms[data.room.name].length
            }
          })
        );

        // Remove the user from the redux state of all clients of the room
        rooms[data.room.name].forEach(client => {
          client.ws.send(
            JSON.stringify({
              type: "remove-user",
              user: req.jwt
            })
          );
        });
        break;
      case "create-room":
        console.log(data.room);
        console.log(req.jwt);
        // Insert the room to the database
        db.query(
          "INSERT INTO rooms (user_id, name) VALUES ($1, $2) RETURNING *",
          [req.jwt.id, data.room],
          (err, res) => {
            if (err) throw err;

            if (res) {
              // Create array in the rooms object for the new room's users to join
              rooms[res.rows[0].name] = [];
              // Create the room object with the current number of users in it
              const room = {
                ...res.rows[0],
                users: rooms[res.rows[0].name].length
              };
              // Send the new room to all clients
              Object.values(rooms).forEach(arr => {
                arr.forEach(client =>
                  client.ws.send(
                    JSON.stringify({
                      type: "add-room",
                      room
                    })
                  )
                );
              });
            }
          }
        );
        break;
    }
  });
});

// Routes
app.use("/api/users", users);

server.listen(5000, () => console.log(`Server listening on port ${5000}`));
