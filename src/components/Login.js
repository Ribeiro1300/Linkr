import { useState } from "react";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [config, setConfig] = useState(localStorage.getItem("config") || "");
  const histoy = useHistory();

  function submitLogin(event) {
    if (config != "") {
      histoy.push("/timeline");
      return;
    }
    const promise = LoginReq({ email, password });
    promise
      .then((res) => {
        setConfig({
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });
        localStorage.setItem("userId", res.data.user.id);
      })
      .catch((err) => alert(err.request));
    if (config === "") return;
    localStorage.setItem("config", config);
    histoy.push("/timeline");
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
        <Form onSubmit={submitLogin}>
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
          <Button type="submit">Log In</Button>
        </Form>
        <SigninOrSignup>
          <Link to="/signUp">First time? Create an account!</Link>
        </SigninOrSignup>
      </LoginStyle>
    </LoginWrapper>
  );
}
