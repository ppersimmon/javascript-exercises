import { fetchClient } from "./fetchClient";
import { User } from "../interfaces/userType";

interface LoginData {
  username?: string;
  password?: string;
}

export const registerUser = async ({ username, password }: LoginData) => {
  return await fetchClient("/users/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

export const loginUser = async ({ username, password }: LoginData) => {
  return await fetchClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

export const getUserData = async () => {
  return await fetchClient<User>("/users/my-profile");
};
