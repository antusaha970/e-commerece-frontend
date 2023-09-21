import { client } from "../../app/utils";

// For fetch all products
export async function fetchAllProducts() {
  try {
    const response = await client.get("/products");
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For fetching filtered products
export async function fetchFilterProducts(
  filter,
  sort,
  pagination,
  searchText = ""
) {
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
  queryString += `searchText=${searchText}&`;

  try {
    const response = await client.get(`/products?${queryString}`);
    const totalItems = response.headers.get("X-Total-Count");
    return { products: response.data, totalItems };
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For search products by query
export async function fetchSearchedProducts(query) {
  try {
    const response = await client.get(`/products/search?text=${query}`);
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
    const response = await client.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
// For fetching suggested products by category
export async function fetchSuggestedProduct(category) {
  try {
    const response = await client.get(`/products/suggestion/${category} `);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For fetching all brands
export async function fetchAllBrands() {
  try {
    const response = await client.get("/brands");
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For fetching all categories
export async function fetchAllCategories() {
  try {
    const response = await client.get("/categories");
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For create a new product
export async function createProduct(product) {
  try {
    const response = await client.post("/products", product);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// For updating a single product
export async function updateProduct(product) {
  try {
    const response = await client.patch(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
