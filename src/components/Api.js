import axios from "axios";

function LoginReq(body) {
  return axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in",
    body
  );
}

function SignupReq(body) {
  return axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up",
    body
  );
}
function HashtagReq(config, hashtag) {
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,
    config
  );
}
function getPosts(config) {
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts`,
    config
  );
}

export { LoginReq, SignupReq, HashtagReq };
