import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name, actuName }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser //(actuName.split(' ')[0])
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{(actuName.split(' ')[0]).charAt(0).toUpperCase() + (actuName.split(' ')[0]).slice(1)}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{((user.split('--')[0]).charAt(0).toUpperCase() + (user.split('--')[0]).slice(1))}</p>
          </div>
        )
  );
}

export default Message;