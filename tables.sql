CREATE DATABASE chat;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(100),
  password VARCHAR(100),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
  ID SERIAL PRIMARY KEY,
  user_id INT,
  name VARCHAR(100),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(ID)
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  user_id INT,
  room_id INT,
  text VARCHAR(100),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(ID),
  FOREIGN KEY (room_id) REFERENCES rooms(ID)
);