import { useEffect, useState } from "react";
import { useHistory,Link } from "react-router-dom";
import { Banner, Form, LoginStyle, LoginWrapper, SigninOrSignup,Button} from "../styles/LoginStyles";
import { SignupReq } from "./Api";

export default function Signup () {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('')
    const [pictureUrl, setPicture] = useState('')
    const [response,setResponse] = useState();
    
    const history = useHistory()
    
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

    function submitSignup(e) {
        e.preventDefault();
        const promise = SignupReq({email,password,username,pictureUrl});
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
                <Form onSubmit={(e) => submitSignup(e)}>
                    <input value={email} type='email' placeholder='e-mail' onChange={(e) => setEmail(e.target.value)}></input>
                    <input value={password} type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
                    <input value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
                    <input value={pictureUrl} type='url' placeholder='picture url' onChange={(e) => setPicture(e.target.value)}></input>
                    <Button type='submit'>Sign Up</Button>
                </Form>
                <SigninOrSignup>
                    <Link to='/'>Switch back to log in</Link>
                </SigninOrSignup>
            </LoginStyle>
        </LoginWrapper>
    )
}