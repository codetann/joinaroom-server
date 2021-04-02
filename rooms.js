const rooms = [];

// - Add a room to the rooms array - //
function addToRoom(room, socket) {
  let found = false;

  /* check if the room already exists */
  for (let i in rooms) {
    if (rooms[i].room === room) {
      found = true;
    }
  }

  /* if found it will increase the member count */
  /* if not found it will create the room in the rooms array */
  if (found) {
    for (let i in rooms) {
      if (rooms[i].room === room) {
        rooms[i].userCount++;
      }
    }
  } else {
    rooms.push({ room, userCount: 1 });
  }
}

function removeFromRoom(socket) {}

exports.rooms = rooms;
exports.addToRoom = addToRoom;
