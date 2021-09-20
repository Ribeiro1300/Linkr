import axios from "axios";

function LoginReq(body) {
  return axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/sign-in",
    body
  );
}

function SignupReq(body) {
  return axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/sign-up",
    body
  );
}
function HashtagReq(hashtag) {
  const config = {headers: {
    "Authorization" : `Bearer ${localStorage.getItem("auth")}`
    }
  }
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/hashtags/${hashtag}/posts`, config
  );
}
function getPosts() {
  const config = {headers: {
    "Authorization" : `Bearer ${localStorage.getItem("auth")}`
    }
  }
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts`, config
  );
}

function LikePost(body) {
  const config = {headers: {
    "Authorization" : `Bearer ${localStorage.getItem("auth")}`
    }
  }

  return axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${body}/like`, [], config
  );
}

function DislikePost(body) {
  const config = {headers: {
    "Authorization" : `Bearer ${localStorage.getItem("auth")}`
    }
  }
  return axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${body}/dislike`,[], config
  );
}

function getMyPosts() {
  const config = {headers: {
    "Authorization" : `Bearer ${localStorage.getItem("auth")}`
    }
  }
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${JSON.parse(localStorage.getItem('user')).id}/posts`, config
  );
}

function getLikedPosts() {
  const config = {headers: {
    "Authorization" : `Bearer ${localStorage.getItem("auth")}`
    }
  }
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/liked`, config
  );
}

export { LoginReq, SignupReq, HashtagReq, getPosts, LikePost, DislikePost, getMyPosts, getLikedPosts };
