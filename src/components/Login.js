import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Banner, Button, Form, LoginStyle, LoginWrapper, SigninOrSignup } from "../styles/LoginStyles";
import { LoginReq } from "./Api";

export default function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [token,setToken] = useState(localStorage.getItem('token') || '')
  const histoy = useHistory()

  function submitLogin(){
    if (token != '') {
      histoy.push("/timeline")
      return
    }
    const promise = LoginReq({email,password});
    promise
      .then(res => setToken(res.data.token))
      .catch(err => alert(err.request));
    if (token === '') return
    localStorage.setItem('token', token)
    histoy.push("/timeline")
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
        <Form onSubmit={() => submitLogin()}>
          <input value={email} type='email' placeholder='e-mail' onChange={(e) => setEmail(e.target.value)}></input>
          <input value={password} type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
          <Button type='submit'>Log In</Button>
        </Form>
        <SigninOrSignup>
          <Link to='/signUp'>First time? Create an account!</Link>
        </SigninOrSignup>
      </LoginStyle>
    </LoginWrapper>
  );
}
