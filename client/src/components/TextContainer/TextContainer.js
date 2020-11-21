import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users, actuName }) => (
  <div className="textContainer">
    <div>
      <h1>Holler</h1><br />
      <h3>Chatting Module</h3>
    </div>
    {
      users
        ? (
          <div>
            <h4>People currently Active: </h4><br/>
            <div className="activeHr">
            <hr/>
            </div>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {(name.replace('--', ' ')).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;