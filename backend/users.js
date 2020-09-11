const users = [];

//RECIEVE THE UID FROM FIREBASE
const addUser = ({id, name, room, imageURL, textColor, uid, loggedInStatus}) => {

    room = room.trim().toLowerCase();

    const isUserInRoom = users.find((user) => user.uid === uid && user.room === room);

    if(isUserInRoom)
        return;

    const user = {id, name, room, imageURL, textColor, uid, loggedInStatus};

    users.push(user);

    return {user};

}
const removeUser = (id) => {

    const index = users.findIndex((user) => user.id === id);

    if(index !== -1 ){
        console.log("index not -1");
        return users.splice(index, 1)[0];
    }else {
        console.log("index equals to -1");
    }
}

// const userOffline = (uid) => {
//     let index = getUser(uid);
//     users[index].loggedInStatus = false;
// }
const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };