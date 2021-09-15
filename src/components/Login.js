import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Banner, Button, Form, LoginStyle, LoginWrapper, SigninOrSignup } from "../styles/LoginStyles";
import { LoginReq } from "./Api";

export default function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [response,setResponse] = useState();
  
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      history.push("/timeline",response)
      return
    }
    if (response !== undefined) {
      localStorage.setItem('token', response.token)
      history.push("/timeline",response)
    }
  },[response])

  function submitLogin(e){
    e.preventDefault();
    const promise = LoginReq({email,password});
    promise
      .then(res => setResponse(res.data))
      .catch(err => alert(err.request));
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
