// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/auth.slice";
import productReducer from "@/src/lib/redux/features/products/product.slice";
import couponReducer from "@/src/lib/redux/features/coupon/couponSlice";
import compareProductReducer from "@/src/lib/redux/features/compare/compare.slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

// Persist configuration for auth state
const persistConfig = {
  key: "auth",
  storage,
};

const productsPersistConfig = {
  key: "products",
  storage,
};

const couponPersistConfig = {
  key: "coupon",
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedProductReducer = persistReducer(
  productsPersistConfig,
  productReducer
);
const persistedCouponReducer = persistReducer(
  couponPersistConfig,
  couponReducer
);

// Function to make the store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
    products: persistedProductReducer,
    coupon: persistedCouponReducer,
    compareProducts: compareProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);