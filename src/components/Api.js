import axios from "axios";

function LoginReq(body) {
  return axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/sign-in",
    body
  );
}

function SignupReq(body) {
  return axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up",
    body
  );
}
function HashtagReq(hashtag) {
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/hashtags/${hashtag}/posts`,
    localStorage.getItem("token")
  );
}
function getPosts() {
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts`,
    localStorage.getItem("token")
  );
}

export { LoginReq, SignupReq, HashtagReq, getPosts };
