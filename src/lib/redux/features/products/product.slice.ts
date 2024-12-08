import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TProductRedux = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  image: string;
  inStock: number;
  vendorId: string;
};

type TInitialState = {
  products: TProductRedux[];
  quantities: Record<string, number>;
  subtotal: number;
};

// quantities Object will be like this: { _id: quantity }
const initialState: TInitialState = {
  products: [],
  quantities: {},
  subtotal: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TProductRedux>) => {
      state.products.push({ ...action.payload });
      state.quantities = state.products.reduce(
        (acc, product) => {
          acc[product.id] = product.quantity || 1;
          return acc;
        },
        {} as Record<string, number>
      );
      state.subtotal = state.products.reduce((acc, product) => {
        return acc + product.price * (product.quantity || 1);
      }, 0);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      delete state.quantities[action.payload];
      state.subtotal = state.products.reduce((acc, product) => {
        return acc + product.price * (product.quantity || 1);
      }, 0);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.quantities[id] = quantity;
      const product = state.products.find((p) => p.id === id);
      if (product) {
        product.quantity = quantity;
        state.subtotal = state.products.reduce((acc, product) => {
          return acc + product.price * (product.quantity || 1);
        }, 0);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantities = {};
      state.subtotal = 0;
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } =
  productSlice.actions;

export const totalProductsCount = (state: RootState) =>
  state.products.products.length;

export default productSlice.reducer;