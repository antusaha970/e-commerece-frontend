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

// For updating the cart
export async function updateCart(item) {
  try {
    const response = await axios.patch(
      `http://localhost:8080/cart/${item.id}`,
      item
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For deleting item from the cart
export async function deleteItemFromCart(itemId) {
  try {
    const response = await axios.delete(`http://localhost:8080/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For deleting item from the cart
export async function resetCart(userId) {
  try {
    const items = await loadItemsToCart(userId);
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    return { status: "done" };
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
