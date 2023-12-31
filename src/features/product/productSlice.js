import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts,
  fetchFilterProducts,
  fetchProductById,
  fetchSearchedProducts,
  fetchSuggestedProduct,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  suggestedProductLoadingStatus: "idle",
  totalItems: 0,
  selectedProduct: null,
  suggestedProducts: [],
};

export const getAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);

export const getProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const getSuggestedProductsAsync = createAsyncThunk(
  "product/fetchSuggestedProduct",
  async (category) => {
    const response = await fetchSuggestedProduct(category);
    return response;
  }
);

export const getFilterProductsAsync = createAsyncThunk(
  "product/fetchFilterProducts",
  async ({ filter, sort, pagination, searchText }) => {
    const response = await fetchFilterProducts(
      filter,
      sort,
      pagination,
      searchText
    );
    return response;
  }
);

export const fetchSearchedProductsAsync = createAsyncThunk(
  "product/fetchSearchedProducts",
  async (query) => {
    const response = await fetchSearchedProducts(query);
    return response;
  }
);
export const getAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    return response;
  }
);

export const getAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    return response;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getFilterProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFilterProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getFilterProductsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSearchedProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchedProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchSearchedProductsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllBrandsAsync.pending, () => {})
      .addCase(getAllBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(getAllBrandsAsync.rejected, () => {})
      .addCase(getAllCategoriesAsync.pending, () => {})
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getAllCategoriesAsync.rejected, () => {})
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByIdAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getSuggestedProductsAsync.pending, (state) => {
        state.suggestedProductLoadingStatus = "loading";
      })
      .addCase(getSuggestedProductsAsync.fulfilled, (state, action) => {
        state.suggestedProductLoadingStatus = "idle";
        state.suggestedProducts = action.payload;
      })
      .addCase(getSuggestedProductsAsync.rejected, (state) => {
        state.suggestedProductLoadingStatus = "failed";
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(createProductAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(updateProductAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

//Selectors
export const selectProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.status;
export const selectSuggestedProductLoadStatus = (state) =>
  state.product.suggestedProductLoadingStatus;
export const selectSuggestProducts = (state) => state.product.suggestedProducts;

export default productSlice.reducer;
