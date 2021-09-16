import axios from "axios";

function LoginReq(body) {
    return axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', body )
}

function SignupReq(body){
    return axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up', body)
}

export {LoginReq,SignupReq};