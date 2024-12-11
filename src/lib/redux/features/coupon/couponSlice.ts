import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TCoupon = {
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
};

type TAuthState = {
  coupon: null | TCoupon;
};

const initialState: TAuthState = {
  coupon: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon: (state, action) => {
      const { coupon } = action.payload;
      state.coupon = coupon;
    },
    clearCoupon: (state) => {
      state.coupon = null;
    },
  },
});

export const { setCoupon, clearCoupon } = couponSlice.actions;

export default couponSlice.reducer;

export const selectApplientCoupon = (state: RootState) => state.coupon.coupon;