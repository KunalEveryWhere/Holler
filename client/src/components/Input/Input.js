import React from 'react';

import sendIcon from '../../icons/sendIcon.png';
import './Input.css';
import queryString from "query-string"

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type something fun.."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => {sendMessage(e)}}><img className="onlineSendIcon" src={sendIcon} alt="send icon" /></button>
  </form>
)

export default Input;