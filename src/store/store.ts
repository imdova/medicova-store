import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/store/slices/cartSlice";
import localStorageMiddleware from "./localStorageMiddleware"; // Import your middleware

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
    // If you have more middleware, add them like this:
    // .concat(anotherMiddleware, yetAnotherMiddleware)
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// If you create a single store instance for the client-side (e.g., for Next.js app router)
// you might want to export it directly as well.
// const store = makeStore();
// export default store;
