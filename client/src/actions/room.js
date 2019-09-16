export const RECEIVE_ROOMS = "RECEIVE_ROOMS";
export const UPDATE_USERS = "UPDATE_USERS";
export const JOIN_ROOM = "JOIN_ROOM";

export const receiveRooms = rooms => ({
  type: RECEIVE_ROOMS,
  rooms
});

export const updateUsers = room => ({
  type: UPDATE_USERS,
  room
});

export const joinRoom = room => ({
  type: JOIN_ROOM,
  room
});
