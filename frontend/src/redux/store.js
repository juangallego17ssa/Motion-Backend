import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/user'
import requestReducer from "./slices/request";

export default configureStore({
    reducer: {
        user: userReducer,
        request: requestReducer,
    }
});