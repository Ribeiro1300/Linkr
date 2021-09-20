import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";

export default function TopBar() {

  const [avatar,setAvatar] = useState('');
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    setAvatar( JSON.parse(localStorage.getItem('user')).avatar );
  }, []);

  return ( 

    <Top>
      <Logo>
        <Link to="/timeline" style={{ textDecoration: 'none' }}><h2>Linkr</h2></Link>
      </Logo>
      <div className="container">
        <MenuContainer>
          <UserBox onClick={onClick} className="menu-trigger">
            <IoChevronDown size="1.8em" /> 
            <UserAvatar src={avatar} />
          </UserBox>
        <Menu active={isActive}>
          <ul>
            <li>
              <Link to="/my-posts">My posts</Link>
            </li>
            <li>
              <Link to="/my-likes">My likes</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </Menu>
      </MenuContainer>
    </div>
    </Top>

  );
}

const Top = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 70px;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px 0 28px;
`;

const Logo = styled.div`
  width: 108px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  background-color: #151515;
  letter-spacing: 4px;
  h2 {
    font-family: 'Passion One', cursive;
    font-size: 49px;
    text-decoration: none;
    color: #FFFFFF;
  }
`;

const UserBox = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 90px;
  height: auto;
  border: none;
  transition: box-shadow 0.4s ease;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.nav`
  position: absolute;
  top: 70px;
  right: -17px;
  width: 150px;
  height: auto;
  background: #171717;
  border-radius: 0px 0px 20px 20px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  :active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    border-bottom: 1px solid #dddddd;
  }
  Link {
    text-decoration: none;
    color: #333333;
    padding: 15px 20px;
    display: block;
  }
`;