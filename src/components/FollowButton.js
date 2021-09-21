import { useEffect, useState } from "react";
import styled from "styled-components";
import { followUser,getFollowedUsers,unFollowUser } from "./Api";

export default function FollowButton ({ userId,followers }) {

    const [userIsFollowed, setFollow] = useState(false);
    const [followedUsers, setUserFollowed] = useState(followers);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const promise = getFollowedUsers();
        promise.then(res => setUserFollowed(res.data.users))
        .catch(err => alert(err.request.response))
        if (followedUsers === undefined) {
            return
        }
        const followedIndex = followedUsers.findIndex(user => user.id == userId);
        console.log(followedIndex,userId,followedUsers)
        if (followedIndex !== -1) {
            setFollow(true)
        } else {
            setFollow(false)
        }
        console.log('oi')
        setLoading(false)
    },[])

    function handleClick () {
        setLoading(true)
        if (userIsFollowed) {
            const promise = unFollowUser(userId);
            promise.then(res => res.data)
            .catch((err) => alert(err.request.response))
            setFollow(false)
        } else {
            const promise = followUser(userId);
            promise.then(res => res.data)
            .catch((err) => alert(err.request.response))
            setFollow(true)      
        }
        setTimeout(() => {
            setLoading(false)
        },1000)
    }
    

    return (
        <FollowButtonStyle onClick={() => handleClick()} 
        disabled={isLoading}
        style={
            {
                backgroundColor: userIsFollowed ? '#FFFFFF' : '#1877F2',
                color: userIsFollowed ? '#1877F2' : '#FFFFFF'
            }
        }>
            {userIsFollowed ? 'Unfollow' : 'Follow'}
        </FollowButtonStyle>
    )
}

const FollowButtonStyle = styled.button`
    align-self: flex-end;
    width: 112px;
    height: 31px;
    margin: auto 0;
    background: #1877F2;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    text-align: center;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    :disabled {
        background-color: grey;
    }
`;