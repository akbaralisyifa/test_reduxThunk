import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// fungsi Untuk mendapatkan Data Product
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  }
);

// fungsi Untuk menambahkan Data Product
export const saveProducts = createAsyncThunk(
  "products/saveProducts",
  async ({ title, price }) => {
    const response = await axios.post("http://localhost:5000/products", {
      title,
      price,
    });
    return response.data;
  }
);

// fungsi Untuk Delete Data Product
export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    return id;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

// fungsi Untuk Edit Data Product
export const updateProducts = createAsyncThunk(
  "products/updateProducts",
  async ({ id, title, price }) => {
    const response = await axios.put(`http://localhost:5000/products/${id}`, {
      title,
      price,
    });
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      productEntity.setAll(state, action.payload);
    });

    builder.addCase(saveProducts.fulfilled, (state, action) => {
      productEntity.addOne(state, action.payload);
    });

    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      productEntity.removeOne(state, action.payload);
    });

    builder.addCase(updateProducts.fulfilled, (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
  },
});

export const productSelectors = productEntity.getSelectors(
  (state) => state.product
);

export default productSlice.reducer;
