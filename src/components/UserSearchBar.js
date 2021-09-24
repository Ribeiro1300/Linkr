import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSearchedUsers } from "./Api";
import { AiOutlineSearch } from "react-icons/ai";

export default function UserSearchBar() {

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    function updateValue(newValue) {
        setInputValue(newValue);
        getSuggestions(newValue);
    };

    function getSuggestions(word) {
        if (word) {
            setLoading(true);
            getSearchedUsers(word)
                .then((res) => {
                    setOptions(res.data.users);
                    setLoading(false);
                })
                .catch((err) =>
                alert("Houve uma falha ao pesquisar usuários, por favor atualize a página")
            );
        } else {
            setOptions([]);
        }
    };

  return (
    <SearchBarBox>

            <SearchInput 
                placeholder="Search for people and friends " 
                type="search"
                value={inputValue}
                onChange={(e) => updateValue(e.target.value)}
            />
            <IconBox>
                <AiOutlineSearch size="1.6em"/>
            </IconBox>

        <SuggestUsers>
            <UsersList>
                {loading && <Users>Loading...</Users>}
                {options.length > 0 &&
                    !loading &&
                    options.map(({username, avatar}) => (
                    <Users>
                        <UserAvatar src={avatar} />
                        <p>{username}</p>
                    </Users>
                ))}
            </UsersList>
        </SuggestUsers>
    </SearchBarBox>
  );
}

const SearchInput = styled.input`
    width: 100%;
    height: 45px;
    margin-top: 20px;
    background: #FFFFFF;
    border-radius: 8px;
    border: none;
    padding-left: 17px;
    padding-right: 45px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    color: #171717;
    ::placeholder {
        font-size: 19px;
        color: #C6C6C6;
    }
`;

const SearchBarBox = styled.div`
    position: relative;
    width: 563px;
    margin-bottom: 25px;
    @media (max-width: 1040px) {
        display: block;
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        width: 100%;
        padding: 0 10px 0 10px;
    }
`;

const IconBox = styled.div`
    position: absolute;
    top: 30px;
    right: 15px;
    color: #C6C6C6;
`;

const SuggestUsers = styled.div`
    width: 563px;
    max-height: 130px;
    height: auto;
    position: fixed;
    background: #E7E7E7;
    border-radius: 8px;
    border: none;
    font-family: Lato;
    font-style: normal;
    font-weight: 300;
    font-size: 19px;
    color: #515151;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    @media (max-width: 1040px) {
        width: 100%;
    }
`;

const UsersList = styled.ul`
    border: none;
    display: flex;
    flex-direction: column;
    align-content: center;
`;

const Users = styled.ul`
    background: #E7E7E7;
    height: 40px;
    display: flex;
    align-items: center;
    overflow: hidden;    
    margin: 8px 12px 8px 17px; 
    p {
        overflow:hidden; 
        white-space: nowrap; 
        text-overflow: ellipsis; 
    }
`;

const UserAvatar = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 304px;
    margin-right: 12px;
`;
