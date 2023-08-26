import axios from "axios";

//  Function for making order
export async function createOrder(orderData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/orders",
      orderData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
