import axios from "axios";
import { client } from "../../app/utils";

//  Function for creating user
export async function createUser(userData) {
  try {
    const response = await client.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// Function for checking user
export function checkUser(loginInfo) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.post(`/auth/login`, loginInfo);

      if (response.status === 200) {
        resolve(response.data); // Resolve the promise with the data
      } else if (response.status === 401) {
        reject("Unauthorized: Wrong credentials"); // Reject with an error
      } else {
        reject(`HTTP Error: ${response.status}`); // Reject with an error
      }
    } catch (error) {
      console.log({ error });
      reject(error.response.data); // Reject with an error
    }
  });
}

// for checking auth
export function checkAuth() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.get(`/auth/check`);
      console.log(response.status);
      if (response.status === 200) {
        resolve(response.data); // Resolve the promise with the data
      } else if (response.status === 401) {
        reject("Unauthorized: Wrong credentials"); // Reject with an error
      } else {
        reject(`HTTP Error: ${response.status}`); // Reject with an error
      }
    } catch (error) {
      console.log({ error });
      reject(error.response.data); // Reject with an error
    }
  });
}

// Function for sign out user
export async function signOut() {
  try {
    const response = axios.get("/auth/logout");
    return response?.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
