import axios from "axios";

// For fetching user orders
export async function fetchUserOrders(userId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/orders/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For fetching logged in users info
export async function fetchLoggedInUserInfo() {
  try {
    const response = await axios.get(`http://localhost:8080/users/own`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

//  Function for updating user information
export async function updateUser(userData) {
  try {
    const response = await axios.patch(
      `http://localhost:8080/users/${userData.id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
