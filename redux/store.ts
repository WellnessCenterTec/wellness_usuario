import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";
import indexSlice  from "./slices/indexSlice";




const store = configureStore({
  reducer: {
    auth:AuthSlice,
    index:indexSlice
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
