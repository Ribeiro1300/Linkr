// font-family: 'Lato', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Passion One', cursive;

import styled from "styled-components";


const LoginWrapper = styled.div`
    display: flex;
`

const Banner = styled.div`
    height: 100vh;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    background-color: #151515;
    letter-spacing: 4px;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 15%;
    }

    div h1 {
        font-family: 'Passion One', cursive;
        font-size: 55px;
    }
    div p {
        font-family: 'Oswald', sans-serif;
        font-size: 36px;
    }
`

const LoginStyle = styled.div`
    height: 100vh;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #E5E5E5;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    

    input {
        border: none;
        height: 50px;
        background-color: white;
        border-radius: 8px;
        margin: 10px 15%;
        opacity: 0.9;
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
    }
`

const Button = styled.button`
    border: none;
    height: 50px;
    background-color: #1877F2;
    border-radius: 8px;
    margin: 10px 15%;
    color: white;
    font-size: 26px;
    font-weight: bold;
`

const SigninOrSignup = styled.button`
    border: none;
    background-color: inherit;
    color: black;
    Link {
        border-bottom: 1 solid black;
    }
`

export {Banner,LoginStyle,LoginWrapper,Form,Button,SigninOrSignup};