
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IProduct } from "@/src/types/schema";

type TProductComparison = {
  comparisonProducts: IProduct[];
};

const initialState: TProductComparison = {
  comparisonProducts: [],
};

const productComparisonSlice = createSlice({
  name: "compareProducts",
  initialState,
  reducers: {
    setCompareProducts: (state, action) => {
      const { products } = action.payload;
      state.comparisonProducts = products;
    },
    removeCompareProducts: (state, action) => {
      const productId = action.payload;
      state.comparisonProducts = state.comparisonProducts.filter(
        (product) => product.id !== productId
      );
    },
    clearCompareProducts: (state) => {
      state.comparisonProducts = [];
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
  state.compareProducts.comparisonProducts;
