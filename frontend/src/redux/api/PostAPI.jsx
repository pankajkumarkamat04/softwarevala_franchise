import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostAPI = createApi({
    reducerPath: "PostAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/post" }),
    tagTypes: ["post"],
    endpoints: (builder) => ({
        getAllPost: builder.query({
            query: (params) => ({
                url: "/",
                params: params
            }),
            providesTags: ["post"]
        }),
        getPost: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
            }),
            providesTags: ["post"]
        }),
        createPost: builder.mutation({
            query: ({ body }) => ({
                url: '/create',
                body,
                method: "POST",
                fromData: true
            }),
            invalidatesTags: ["post"]
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["post"]
        }),
        updatePost: builder.mutation({
            query: ({ id, body }) => ({
                url: `/update/${id}`,
                body,
                method: "PUT",
            }),
            invalidatesTags: ["post"]
        }),
        getAllAdminPost: builder.query({
            query: () => ({
                url: `/admin/get`,
            }),
            providesTags: ["post"]
        }),
        getAllPostCategory: builder.query({
            query: () => ({
                url: "/categories",
            }),
            providesTags: ["post"]
        }),
        getPostCategory: builder.query({
            query: (id) => ({
                url: `/category/get/${id}`,
            }),
            providesTags: ["post"]
        }),
        createPostCategory: builder.mutation({
            query: ({ body }) => ({
                url: '/category/create',
                body,
                method: "POST",
                fromData: true
            }),
            invalidatesTags: ["post"]
        }),
        deletePostCategory: builder.mutation({
            query: (id) => ({
                url: `/category/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["post"]
        }),
        updatePostCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: `/category/update/${id}`,
                body,
                method: "PUT",
            }),
            invalidatesTags: ["post"]
        }),
        getPostSubCategory: builder.query({
            query: (id) => ({
                url: `/category/subcategory/${id}`,
            }),
            providesTags: ["post"]
        }),
    }),
});

export const { useCreatePostCategoryMutation, useUpdatePostCategoryMutation, useCreatePostMutation, useGetAllPostQuery, useLazyGetPostSubCategoryQuery, useDeletePostCategoryMutation, useDeletePostMutation, useGetAllAdminPostQuery, useGetAllPostCategoryQuery, useGetPostCategoryQuery, useGetPostQuery, useGetPostSubCategoryQuery, useUpdatePostMutation } = PostAPI;