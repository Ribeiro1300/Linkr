import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Banner,
  Form,
  LoginStyle,
  LoginWrapper,
  SigninOrSignup,
  Button,
} from "../styles/LoginStyles";
import { SignupReq } from "./Api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pictureUrl, setPicture] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const histoy = useHistory();

  function submitSignup(event) {
    const promise = SignupReq({ email, password, username, pictureUrl });
    promise
      .then((res) => setToken(res.data.token))
      .catch((err) => alert(err.request));
    localStorage.setItem("token", token);
    histoy.push("/");
    event.preventDefault();
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
        <Form onSubmit={submitSignup}>
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
          <input
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            value={pictureUrl}
            type="url"
            placeholder="picture url"
            onChange={(e) => setPicture(e.target.value)}
          ></input>
          <Button type="submit">Sign Up</Button>
        </Form>
        <SigninOrSignup>
          <Link to="/">Switch back to log in</Link>
        </SigninOrSignup>
      </LoginStyle>
    </LoginWrapper>
  );
}
