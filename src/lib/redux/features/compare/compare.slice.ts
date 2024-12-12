
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IProduct } from "@/src/types/schema";

type TProductComparison = {
  products: IProduct[];
};

const initialState: TProductComparison = {
  products: [],
};

const productComparisonSlice = createSlice({
  name: "compareProducts",
  initialState,
  reducers: {
    setCompareProducts: (state, action) => {
      console.log(action.payload);
      state.products = action.payload;
    },
    removeCompareProducts: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    clearCompareProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  setCompareProducts,
  removeCompareProducts,
  clearCompareProducts,
} = productComparisonSlice.actions;

export default productComparisonSlice.reducer;

export const selectCompareProducts = (state: RootState) =>
  state.compareProducts.products;