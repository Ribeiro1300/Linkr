import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";

export default function TopBar() {

  const [avatar,setAvatar] = useState('');

  useEffect(() => {
    setAvatar( JSON.parse(localStorage.getItem('user')).avatar );
  }, []);

  return ( 

    <Top>
      <Logo>
        <Link to="/timeline" style={{ textDecoration: 'none' }}><h2>Linkr</h2></Link>
      </Logo>
        <UserBox>
          <IoChevronDown size="1.8em" /> 
          <UserAvatar src={avatar} />
        </UserBox>
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

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 90px;
  height: auto;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
`;