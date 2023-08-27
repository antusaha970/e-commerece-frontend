import axios from "axios";

// For fetching user orders
export async function fetchUserOrders(userId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/orders?user.id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
