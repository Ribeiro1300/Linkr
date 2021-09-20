import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Banner,
  Button,
  Form,
  LoginStyle,
  LoginWrapper,
  SigninOrSignup,
} from "../styles/LoginStyles";
import { LoginReq } from "./Api";
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState();
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (
      localStorage.getItem("auth") !== "" &&
      localStorage.getItem("auth") !== null
    ) {
      history.push("/timeline", response);
      return;
    }
    if (response !== undefined) {
      localStorage.setItem("user", response.user);
      localStorage.setItem("auth", response.token);
      history.push("/timeline", response);
    }
    setLoading(false);
  }, [response]);

  function submitLogin(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }
    const promise = LoginReq({ email, password });
    promise
      .then((res) => setResponse(res.data))
      .catch((err) => {
        setLoading(false);
        alert(JSON.parse(err.request.response).message);
      });
    setLoading(true);
  }

  return (
    <LoginWrapper>
      <Banner>
        <div>
          <h1>Linkr</h1>
          <p>save, share and discover the best links on the web</p>
        </div>
      </Banner>
      <LoginStyle>
        <Form onSubmit={(e) => submitLogin(e)}>
          <input
            value={email}
            type="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <Button type="submit" disabled={isLoading}>
            Log In
          </Button>
        </Form>
        <SigninOrSignup>
          <Link to="/signUp">First time? Create an account!</Link>
        </SigninOrSignup>
      </LoginStyle>
    </LoginWrapper>
  );
}
