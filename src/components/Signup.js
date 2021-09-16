import { useEffect, useState } from "react";
import { useHistory,Link } from "react-router-dom";
import { Banner, Form, LoginStyle, LoginWrapper, SigninOrSignup,Button} from "../styles/LoginStyles";
import { SignupReq } from "./Api";
import React from "react";
export default function Signup() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('')
    const [pictureUrl, setPicture] = useState('')
    const [response,setResponse] = useState();
    const [isLoading, setLoading] = useState(false)

    const history = useHistory()
    
    useEffect(() => {
        if (localStorage.getItem('auth') !== '' && localStorage.getItem('auth') !== null ) {
            history.push("/timeline",response)
            return
        }
        if (response !== undefined) {
          localStorage.setItem('auth', response.token)
          history.push("/timeline",response)
        }
        setLoading(false)
      },[response,isLoading])

    function submitSignup(e) {
        e.preventDefault();
        if (email === '' || password === '' || username === '' || pictureUrl === '') {
            alert('Preencha todos os campos')
            return
        } 
        const promise = SignupReq({email,password,username,pictureUrl});
        promise
            .then(res => setResponse(res.data))
            .catch(err => {
                setLoading(false)
                alert(JSON.parse(err.request.response).message)
            });
        setLoading(true)
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
                    <Button type='submit' disabled={isLoading}>Sign Up</Button>
                </Form>
                <SigninOrSignup>
                    <Link to='/'>Switch back to log in</Link>
                </SigninOrSignup>
            </LoginStyle>
        </LoginWrapper>
    )
}
