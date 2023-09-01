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

// For fetching all orders
export async function fetchAllOrders(pagination) {
  // pagination = {_page: 1, _limit: 10}
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/orders?${queryString}`
    );
    const totalItems = response.headers.get("X-Total-Count");
    return { orders: response.data, totalItems };
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For updating a order
export async function updateOrder(order) {
  try {
    const response = await axios.patch(
      `http://localhost:8080/orders/${order.id}`,
      order
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
