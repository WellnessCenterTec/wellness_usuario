import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";
import reservationSlice from "./slices/reservationSlice";





const store = configureStore({
  reducer: {
    auth:AuthSlice,
    reservation:reservationSlice
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
