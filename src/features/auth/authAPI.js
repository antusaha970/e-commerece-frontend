import axios from "axios";

//  Function for creating user
export async function createUser(userData) {
  try {
    const response = await axios.post("http://localhost:8080/users", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// Function for checking user
export async function checkUser(loginInfo) {
  try {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await axios.get(
      `http://localhost:8080/users?email=${email}`
    );
    if (response.data.length) {
      if (password === response.data[0].password) {
        return response.data;
      } else {
        throw new Error("Wrong password");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
