import { checkResponse } from "./api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.whattoweartripleten.jumpingcrab.com"
    : "http://localhost:3001";

function signUp(user) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      password: user.password,
    }),
  }).then(checkResponse);
}

function signIn(user) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).then(checkResponse);
}

export { signUp, signIn };
