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
export async function fetchFilterProducts(filter, sort, pagination) {
  // filter = {"category" : ["phones","laptops"]}
  // sort = {_sort: "price", order: "asc"}
  // pagination = {_page: 1, _limit: 10}
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
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/products?${queryString}`
    );
    const totalItems = response.headers.get("X-Total-Count");
    return { products: response.data, totalItems };
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For fetching product by ID
export async function fetchProductById(id) {
  try {
    const response = await axios.get(`http://localhost:8080/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For fetching all brands
export async function fetchAllBrands() {
  try {
    const response = await axios.get("http://localhost:8080/brands");
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For fetching all categories
export async function fetchAllCategories() {
  try {
    const response = await axios.get("http://localhost:8080/categories");
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For create a new product
export async function createProduct(product) {
  try {
    const response = await axios.post(
      "http://localhost:8080/products",
      product
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For updating a single product
export async function updateProduct(product) {
  try {
    const response = await axios.patch(
      `http://localhost:8080/products/${product.id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
