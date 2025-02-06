import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthorized, setLoading, setUser } from "../slice/UserSlice";

export const UserAPI = createApi({
    reducerPath: "UserAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/user" }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ body }) => ({
                url: "/login",
                method: "POST",
                body,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(UserAPI.endpoints.getProfile.initiate(null));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        register: builder.mutation({
            query: ({ body }) => ({
                url: "/register",
                method: "POST",
                body,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(UserAPI.endpoints.getProfile.initiate(null));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        logout: builder.query({
            query: () => ({
                url: "/logout",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(setIsAuthorized(false));
                    dispatch(setUser(null));
                    dispatch(setLoading(false));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        forgotPassword: builder.mutation({
            query: ({ body }) => ({
                url: `/password/forgot`,
                body,
                method: "POST"
            })
        }),
        resetVerifyToken: builder.query({
            query: (token) => ({
                url: `/password/verify/${token}`
            })
        }),
        resetPassword: builder.mutation({
            query: ({ body, token }) => ({
                url: `/password/reset/${token}`,
                body,
                method: "PUT"
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user"]
        }),
        getProfile: builder.query({
            query: () => ({
                url: "/profile",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setIsAuthorized(true));
                    dispatch(setUser(data.user));
                    dispatch(setLoading(false));
                } catch (error) {
                    dispatch(setIsAuthorized(false));
                    dispatch(setLoading(false));
                    console.log(error);
                }
            },
            providesTags: ["user"],
        }),
        updatePassword: builder.mutation({
            query: ({ body }) => ({
                url: "/update/password",
                method: "POST",
                body
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/admin/users",
            }),
            providesTags: ["user"],

        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery, useForgotPasswordMutation, useResetVerifyTokenQuery, useResetPasswordMutation, useDeleteUserMutation, useGetProfileQuery, useUpdatePasswordMutation, useLazyGetProfileQuery, useGetAllUsersQuery } = UserAPI;
