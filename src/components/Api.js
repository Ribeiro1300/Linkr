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

function getTrendingHashtags() {
  const config = generateConfig();

  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/hashtags/trending`,
    config
  );
}

function getHashtagPosts(hashtagName) {
  const config = generateConfig();

  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/hashtags/${hashtagName}/posts`,
    config
  );
}

function getPosts() {
  const config = generateConfig();

  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts`,
    config
  );
}

function LikePost(body) {
  const config = generateConfig();

  return axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${body}/like`,
    [],
    config
  );
}

function DislikePost(body) {
  const config = generateConfig();

  return axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${body}/dislike`,
    [],
    config
  );
}

function sendCreatePost(body) {
  const config = generateConfig();

  return axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts`,
    body,
    config
  );
}

function getMyPosts() {
  const config = generateConfig();

  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${
      JSON.parse(localStorage.getItem("user")).id
    }/posts`,
    config
  );
}

function getLikedPosts() {
  const config = generateConfig();

  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/liked`,
    config
  );
}

function getUserPosts(id) {
  const config = generateConfig();

  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${id}/posts`,
    config
  );
}

function followUser(id) {
  const config = generateConfig();

  return axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${id}/follow`, [],
    config
  );
}

function unFollowUser(id) {
  const config = generateConfig();

  return axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${id}/unfollow`,[],
    config
  );
}

function getFollowedUsers () {
  const config = generateConfig();
  
  return axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/follows`,
    config
  );
}

function sendPostEdit(postID, body) {
    const config = generateConfig();
    
    return axios.put(
    `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${postID}`, body, config
    );
}

function generateConfig () {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    }
  };
  return config
}

export {
  LoginReq,
  SignupReq,
  getTrendingHashtags,
  getHashtagPosts,
  getPosts,
  LikePost,
  DislikePost,
  sendCreatePost,
  getMyPosts,
  getLikedPosts,
  getUserPosts,
  followUser,
  unFollowUser,
  getFollowedUsers,
  sendPostEdit
};
