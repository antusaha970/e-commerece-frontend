import { client } from "../../app/utils";

// function to add a item to the cart list
export async function addToCart(item) {
  try {
    const response = await client.post("/cart", item);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
// function to add a item to the cart list
export async function loadItemsToCart() {
  try {
    const response = await client.get(`/cart`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For updating the cart
export async function updateCart(item) {
  try {
    const response = await client.patch(`/cart/${item.id}`, item);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For deleting item from the cart
export async function deleteItemFromCart(itemId) {
  try {
    const response = await client.delete(`/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For deleting item from the cart
export async function resetCart() {
  try {
    const items = await loadItemsToCart();
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    return { status: "done" };
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
