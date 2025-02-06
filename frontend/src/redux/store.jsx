import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slice/UserSlice"
import { UserAPI } from "./api/UserAPI";
import { OrderAPI } from "./api/OrderAPI";
import { ProductAPI } from "./api/ProductAPI";
import { CategoryAPI } from "./api/CategoryAPI";
import { AdminAPI } from "./api/AdminAPI";
import { ExtraAPI } from "./api/ExtraAPI";
import { SettingAPI } from "./api/SettingAPI";
import { PostAPI } from "./api/PostAPI";

const store = configureStore({
    reducer: {
        user: UserSlice,
        [UserAPI.reducerPath]: UserAPI.reducer,
        [OrderAPI.reducerPath]: OrderAPI.reducer,
        [ProductAPI.reducerPath]: ProductAPI.reducer,
        [CategoryAPI.reducerPath]: CategoryAPI.reducer,
        [AdminAPI.reducerPath]: AdminAPI.reducer,
        [ExtraAPI.reducerPath]: ExtraAPI.reducer,
        [SettingAPI.reducerPath]: SettingAPI.reducer,
        [PostAPI.reducerPath]: PostAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            UserAPI.middleware,
            OrderAPI.middleware,
            ProductAPI.middleware,
            CategoryAPI.middleware,
            AdminAPI.middleware,
            ExtraAPI.middleware,
            SettingAPI.middleware,
            PostAPI.middleware,
        )
    }
})

export default store;