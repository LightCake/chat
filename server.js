const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const url = require("url");
const users = require("./routes/users");
const keys = require("./config/keys");

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
      done(true);
    });
  }
});

wss.on("connection", ws => {
  // get decoded JWT here?
  console.log("User connected");
});

// Routes
app.use("/api/users", users);

server.listen(5000, () => console.log(`Server listening on port ${5000}`));
