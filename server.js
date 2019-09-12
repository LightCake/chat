const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const passport = require("passport");
const users = require("./routes/users");

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Passport configuration
require("./config/passport")(passport);

// WebSocket Server
const wss = new WebSocket.Server({ server });

// Routes
app.use("/api/users", users);

server.listen(5000, () => console.log(`Server listening on port ${5000}`));
