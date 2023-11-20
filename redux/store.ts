import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";
import reservasbleSlice from "./slices/reservasbleSlice";




const store = configureStore({
  reducer: {
    auth:AuthSlice,
    reservable:reservasbleSlice
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
