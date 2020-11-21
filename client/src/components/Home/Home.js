import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import fire from "../../fire"

import loadingGif from '../../icons/loadingGif.gif';
import il1 from '../../icons/il1.svg';

import Chat from "../Chat/Chat"
import Service from "../Service/Service"
import './Home.css';

const Home = ({handleLogout, user}) => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [actuName, setActuName] = useState("");
    const [actuRoom, setActuRoom] = useState("");
    //var actuName, actuRoom;

    //To read name and room
    const readData = () => {
        var userId = fire.auth().currentUser.uid;
        fire.database().ref('users/'+userId).once('value').then((snapshot) => {
            // actuName = snapshot.val().name.name;
            // actuRoom = snapshot.val().room.room;
            setActuName(snapshot.val().name.name);
            setActuRoom(snapshot.val().room.room);
            setName(actuName);
            setRoom(actuRoom);
        })
      }

      useEffect(()=>{
        var userId = fire.auth().currentUser.uid;
        fire.database().ref('users/'+userId).once('value').then((snapshot) => {
            // actuName = snapshot.val().name.name;
            // actuRoom = snapshot.val().room.room;
            setActuName(snapshot.val().name.name);
            setActuRoom(snapshot.val().room.room);
            setName(actuName);
            setRoom(actuRoom);
        }).then(()=>{
            setName(actuName.replace(' ','--'));
            setRoom(actuRoom.replace(' ','--'));
        }).catch((e)=>{
            console.log(e);
        })
          }, [actuName, actuRoom])

    return (
        <React.Fragment>
            <section className="hero">
            <div className="homeInfo">
                    <h1>
                        Welcome to <span>Holler</span>
                    </h1><hr/>
                    <h3>To begin, click on the Chat Button on the top navigation bar</h3>
                    <h4>The Service Module is under development. <br/> We're trying our best to bring it as soon as possible</h4>
                </div>
                <Router>
                <nav>
                    <h2 className="navHoller">Holler</h2>
                    <li>
                        {
                            (actuName && actuRoom) ? (<Link className="navLink" to={`/chat?name=${actuName.replace(' ','--')}&room=${actuRoom.replace(' ','--')}`} onClick={readData}>Chat</Link>) 
                            : 
                            (<Link ><img src={loadingGif} alt="loading gif" /></Link>)
                        }
                    {/*  */}
                    </li>
                    <li>
                    <Link className="navLink" to="/service">Service</Link>
                    </li>
                    <button onClick={handleLogout} className="navLogout">Logout</button>
                </nav>
                <Switch>
                    <Route path="/chat">
                        <Chat user={user} actuName={actuName} actuRoom={actuRoom}/>
                    </Route>
                    <Route path="/service" exact>
                        <Service user={user}/>
                    </Route>
                </Switch>
                </Router>
                
                <div className="illusBG">
                <img  src={il1} alt="background illustration" />
                </div>
            </section>
            
        </React.Fragment>
    )
}

export default Home;