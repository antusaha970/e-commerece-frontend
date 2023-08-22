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

// For fetching filtered products
export async function fetchFilterProducts(filter, sort) {
  // filter = {"category" : ["phones","laptops"]}
  // sort = {_sort: "price", order: "asc"}
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
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
