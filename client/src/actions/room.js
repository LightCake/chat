export const RECEIVE_ROOMS = "RECEIVE_ROOMS";
export const UPDATE_USERS = "UPDATE_USERS";

export const receiveRooms = rooms => ({
  type: RECEIVE_ROOMS,
  rooms
});

export const updateUsers = room => ({
  type: UPDATE_USERS,
  room
});
