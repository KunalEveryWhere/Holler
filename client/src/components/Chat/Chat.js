import React, {useState, useEffect} from 'react';
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import fire from "../../fire"

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";


let socket;
// const ENDPOINT = "https://kew-holler.herokuapp.com/";
const ENDPOINT = "http://localhost:5000/";

const Chat = ({user, actuName, actuRoom}) => {
    const location = window.location;
    
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    //let tempName, tempRoom;

    useEffect(() => {
        const {name, room} = queryString.parse(window.location.search);      

        socket = io(ENDPOINT);
    
        setName(name);
        setRoom(room);

        if(name === '' || room === ''){
            return () => {
                console.log("error occured in retreiving data from db. either 'name' or 'room' was unalbe to be retrived");
                socket.emit('disconnection');
                socket.off();
            }
        }

        if(!user) {
            console.log("user does not exist. disconnecting socket");
            socket.emit('disconnection');
            socket.off();
        }
        socket.emit('join', {name, room, actuName, actuRoom}, ()=>{
           // alert(error);
        });
        return () => {
            console.log("natural disconnect from logout");
            socket.emit('disconnection');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
        // socket.on('message', message => {
        //     setMessages(messages => [ ...messages, message ]);
        //   });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
        //}, [])
     }, [messages])

    // useEffect(() => {
    //     var userId = fire.auth().currentUser.uid;
        
    //     fire.database().ref('users/'+userId).once('value').then((snapshot) => {
    //         console.log("ext name and room from db in Chat.js");
    //         tempName = ((snapshot.val().name.name).replace(' ','--'));
    //         tempRoom = ((snapshot.val().room.room).replace(' ','--'));
    //     }).then(()=>{
    //         console.log("from db in Chat.js")
    //         setName(tempName);
    //     setRoom(tempRoom);
    //     }).then(()=>{
    //         console.log(tempRoom, tempName);
    //     }).catch((e)=>{
    //         console.log(e);
    //     })
    // }, []);


    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            //const {names, rooms} = queryString.parse(window.location.search);
        //     if(!name || !room)
        // {
        //     console.log("an error has occured!");
        //     socket.emit('sendMessage', message, tempName.toLowerCase(), tempRoom.toLowerCase(), () => setMessage(''));
        // }
            socket.emit('sendMessage', message, name, room, () => setMessage(''));
        }
    }

    const socketOff = (event) => {
        console.log("natural disconnect from X");
        socket.emit('disconnection');
        socket.off();
    }
    
    return (
        <React.Fragment>
            {
            (user || name || room) ? (
            <React.Fragment>
                <div className="outerContainer">
                    <div className="container">
                    <InfoBar room={room} socketOff={socketOff} actuRoom={actuRoom}/>
                    <Messages messages={messages} name={name} actuName={actuName}/>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </div>
                    <TextContainer users={users} actuName={actuName}/>
                </div>
            </React.Fragment>
            ) : 
            (<h2>Permission Denied!</h2>)
            }
        </React.Fragment>
    )
}

export default Chat;