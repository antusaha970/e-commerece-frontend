import axios from "axios";

// For fetch all products
export async function fetchAllProducts() {
  try {
    const response = await axios.get("http://localhost:8080/products");
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For fetch all products
export async function fetchFilterProducts(filter) {
  let queryString = "";

  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  console.log(queryString);
  try {
    const response = await axios.get(
      `http://localhost:8080/products?${queryString}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
