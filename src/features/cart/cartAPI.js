import axios from "axios";

// function to add a item to the cart list
export async function addToCart(item) {
  console.log(item);
  try {
    const response = await axios.post("http://localhost:8080/cart", item);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
// function to add a item to the cart list
export async function loadItemsToCart(id) {
  try {
    const response = await axios.get(`http://localhost:8080/cart?user=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
