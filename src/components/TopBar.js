import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { getFollowedUsers } from "./Api";
import UserSearchBar from "./UserSearchBar";

export default function TopBar() {
  const [avatar, setAvatar] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [followedUsers,setFollowedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const history = useHistory();

  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }

    getFollowedUsers()
        .then((res) => setFollowedUsers(res.data.users))
        .catch((err) =>
        alert("Houve uma falha ao obter os usuários que você segue, por favor atualize a página")
    );

    setAvatar( JSON.parse(localStorage.getItem('user')).avatar );
  }, []);

  function Logout() {
    localStorage.clear();
  }

  function clearSearchBar() {
    setLoading(false);
    setOptions([]);
    setInputValue('');
  }

  return ( 

    <Top>
      <Logo>
        <StyledLink to="/timeline">
          <h2>Linkr</h2>
        </StyledLink>
      </Logo>
      <UserSearchBar 
        loading={loading} 
        setLoading={setLoading}
        options={options}
        setOptions={setOptions}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onClickOutside={clearSearchBar}
        clearSearchBar={clearSearchBar}
      />
          <UserBox onClick={onClick} >
            { isActive ? <IoChevronUp size="1.8em"/> : <IoChevronDown size="1.8em"/> }
            <UserAvatar src={avatar} />
          </UserBox>
        <Menu active={isActive}>
          <ul>
            <li>
              <StyledLink to="/my-posts">My posts</StyledLink>
            </li>
            <li>
              <StyledLink to="/my-likes">My likes</StyledLink>
            </li>
            <li>
              <StyledLink to="/" onClick={Logout} >Logout</StyledLink>
            </li>
          </ul>
        </Menu>
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
  z-index: 100;

  @media (max-width: 413) {
    width: 100%;
    position: fixed;
    top: 0px;
  }
`;

const Logo = styled.div`
  width: 108px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffffff;
  background-color: #151515;
  letter-spacing: 4px;
  h2 {
    font-family: "Passion One", cursive;
    font-size: 49px;
    text-decoration: none;
    color: #ffffff;
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
  background-color: #151515;
  cursor: pointer;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
`;

const Menu = styled.nav`
  padding: 10px 0 17px 28px;
  position: absolute;
  top: 80px;
  right: -17px;
  width: 150px;
  height: auto;
  background: #171717;
  border-radius: 0px 0px 20px 20px;
  opacity: ${(props) => (props.active ? "1" : "0")};
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  transform: ${(props) =>
    props.active ? "translateY(-20px)" : "translateY(0);"};
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #ffffff;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 5px 0 5px 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
