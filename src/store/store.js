import { configureStore } from "@reduxjs/toolkit";
import userLogin from "../features/userLogin/userLoginSlice";

export const store = configureStore({
    reducer: { userLogin}
})