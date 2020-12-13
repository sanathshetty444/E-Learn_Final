import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {Input,Button} from 'antd'
import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer join-main">
      <div className='join-svg' style={{ overflow: 'hidden',position:'absolute',zIndex:-1}}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}><path d="M-5.42,80.23 C188.14,195.69 271.49,-49.99 502.48,62.46 L500.00,0.00 L0.00,0.00 Z" style={{stroke: 'none', fill: '#08f'}} /></svg></div>

      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <Input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <Input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
