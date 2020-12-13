import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <div>
      <Menu
        mode="horizontal"
        onClick={props.handleNav}
        selectedKeys={[props.current]}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        
        <Menu.Item key="courses">
          <Link to="/courses">Courses</Link>
        </Menu.Item>
        <Menu.Item key="chatroom">
          <Link to="/join">Chat Now</Link>
        </Menu.Item>
        <Menu.Item key="Forum">
          <Link to="/forum">Forum</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default LeftMenu;
