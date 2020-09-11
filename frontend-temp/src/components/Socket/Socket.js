import React, {useState, useEffect, useRef} from 'react'
import io from "socket.io-client";
import './Socket.css'

import InputMessage from "../InputMessage/InputMessage";
import Messages from "../Messages/Messages";
import UsersList from '../UsersList/UsersList';

const Socket = ({handleLogout, user}) => {

    const ENDPOINT = "http://localhost:8080/"

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [imageURL, setImageURL] = useState('https://i0.wp.com/media1.bangdals.se/2016/10/Unknown-person.gif?fit=280%2C280');
    const [textColor, setTextColor] = useState('');
    const [uid, setUid] = useState('')

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        setUid(user.uid);
    }, []);

    const socketRef = useRef();
    useEffect(() => {

        setName(user.email);
        setRoom("My room");

        socketRef.current = io.connect(ENDPOINT);

        socketRef.current.emit('join', {name, room, imageURL, 
            textColor, uid}, (error) => {
            if(error)
                alert(error);
        });

        //User disconnect
        return () => {
            socketRef.current.emit('disconnect');

            //Turns off instance
            socketRef.current.off();
        }
    }, [ENDPOINT, name, room]);

    useEffect(() => {
        socketRef.current.on('message', (message) => {
            //Adds message to array
            console.log('In useEffect: Message: ', message);
            setMessages(messages => [...messages, message]);
            return;
        })
        socketRef.current.on("roomData", ({users}) => {
            setUsers(users)
        })
    }, [socketRef.current]);

    const sendMessage = (e) => {
        //Prevents reload
        e.preventDefault();
        if(message) {
            console.log("SendMessage: Message: ",message);
            socketRef.current.emit('sendMessage', message, () => setMessage(''));
        }
    }
    return(
        <div className="outerContainer">
            <label>Enter imageurl</label>
            <input type="text" placeholder="Image url" onChange={(e) => setImageURL(e.target.value)}/>
            <label>Enter hexcode</label>
            <input type="text" placeholder="Hexcode..." onChange={(e) => setTextColor(e.target.value)}/>
            <div className="container">
                <Messages messages={messages} name={name} imageURL={imageURL} textColor={textColor} />
                <InputMessage message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <button onClick={handleLogout}>Logout</button>
            <UsersList users={users} />
        </div>
    )
}
export default Socket;