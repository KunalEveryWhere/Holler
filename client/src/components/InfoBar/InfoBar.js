import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({room, socketOff, actuRoom}) => (
    <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{actuRoom}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/" onClick={e => socketOff(e)}><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
)

export default InfoBar;