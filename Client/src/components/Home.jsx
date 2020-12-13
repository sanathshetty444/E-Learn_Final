import React, { useState, useContext ,useEffect} from 'react';
import axios from 'axios'
import UserContext from '../context/UserContext';
import {Button } from 'antd';
import './home.css'
import { Tabs } from 'antd';
import Typed from 'react-typed';

function Home() {
  
  const { TabPane } = Tabs;

  const { userData, setUserData } = useContext(UserContext);
  
  let salutation = 'Welcome to Home Page';
  if (userData.user) {
    salutation = `Welcome ${userData.user.name}, this is the Homepage `;

  }

  


  return (
    <div id='home-main'>
      
          <div className='home-svg' style={{ overflow: 'hidden',position:'absolute',top:0,left:0}}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}><path d="M543.11,-137.85 C-108.69,155.22 567.94,-97.40 -68.06,258.84 L-18.96,159.17 L0.00,-0.00 Z" style={{stroke: 'none', fill: '#08f'}} /></svg></div>
          <Typed
                    strings={['An End to End Open Source E-Learning Platform','Learn. Grow. Conquer.',
                    'Learn At Your Own Pace']}
                    typeSpeed={80}
                    loop
                    style={{fontSize:'30px',color:'white',fontFamily:'Verdana'}}
                />
            <br/>
            
          
          <div className='home-tabs'>
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Chat Bot" key="1">
                <p style={{padding:'10px',fontSize:'25px'}}>The chatbot is helping the students during the admission processes also providing them all the necessary information about their courses, its modules, and faculties.</p>
                </TabPane>
                <TabPane tab="Chat Room" key="2">
                <p style={{padding:'10px',fontSize:'25px'}}>Chat room is a way of communication of teachers with the students. It will also enable students with similar interests to collaborate and exchange ideas. This will help students in networking and also gain knowledge they didn't have before </p>
                </TabPane>
                <TabPane tab="Forum" key="3">
                  <p style={{padding:'10px',fontSize:'25px'}}>Forum An efficient way to clear doubts  from their peers and teachers and also learn much more from outside the course </p>
                </TabPane>
            </Tabs>
        </div>
    </div>

  );
}

export default Home;
