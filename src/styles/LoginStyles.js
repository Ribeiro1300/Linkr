// font-family: 'Lato', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Passion One', cursive;

import styled from "styled-components";

const LoginWrapper = styled.div`
  display: flex;

  a {
    color: white;
    font-size: 15px;
  }

  @media (max-width: 415px) {
    display: flex;
    flex-direction: column;
  }
`;

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
    margin: 15px 15%;
  }

  div h1 {
    font-family: "Passion One", cursive;
    font-size: 55px;
  }
  div p {
    font-family: "Oswald", sans-serif;
    font-size: 36px;
  }
  div h2 {
    font-family: "Passion One", cursive;
    font-size: 49px;
  }
  @media (max-width: 415px) {
    width: 100%;
    height: 180px;

    div {
      width: 80%;
      line-height: 30px;
    }

    div h1 {
      text-align: center;
    }

    div p {
      margin: 10px 0;
      font-size: 20px;
    }
  }
`;

const LoginStyle = styled.div`
  height: 100vh;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #484848;

  @media (max-width: 415px) {
    width: 100%;
    background-color: #484848;
    justify-content: flex-start;
  }
`;

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

  @media (max-width: 415px) {
    margin-top: 30px;
  }
`;

const Button = styled.button`
  border: none;
  height: 50px;
  background-color: #1877f2;
  border-radius: 8px;
  margin: 10px 15%;
  color: white;
  font-size: 26px;
  font-weight: bold;

  :disabled {
    background-color: grey;
  }
`;

const SigninOrSignup = styled.button`
  border: none;
  background-color: inherit;
  color: black;
  Link {
    border-bottom: 1 solid black;
  }
`;

export { Banner, LoginStyle, LoginWrapper, Form, Button, SigninOrSignup };
