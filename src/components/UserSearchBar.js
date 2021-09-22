import React, { useState, useEffect } from "react";
import styled from "styled-components";


export default function UserSearchBar() {

  return (
      <UserSearchBox>
          <SearchInput placeholder="Search for people and friends"></SearchInput>
          <UsersRecommendations>
              <User></User>
          </UsersRecommendations>
      </UserSearchBox>
  );
}

const UserSearchBox = styled.div`
    width: 563px;
    height: auto;
    background: #E7E7E7;
    border-radius: 8px;
    border: none;
`;

const SearchInput = styled.input`
    width: 563px;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    border: none;
    padding-left: 17px;
    padding-top: 5px;
    ::placeholder {
        font-family: Lato;
        font-style: normal;
        font-weight: normal;
        font-size: 19px;
        color: #C6C6C6;
    }
`;

const UsersRecommendations = styled.ul`

`;

const User = styled.li`

`;