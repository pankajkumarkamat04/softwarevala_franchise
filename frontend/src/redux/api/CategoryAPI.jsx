import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import siteData from "../../utils/siteData";


export const CategoryAPI = createApi({
    reducerPath: "CategoryAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://softwarevala.net/api/v2/franchise" }),
    tagTypes: ["category"],
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: "/category/getall",
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                }
            }),
            providesTags: ["category"]
        }),
        getCategory: builder.query({
            query: (id) => ({
                url: `/category/get/${id}`,
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                },
            }),
            providesTags: ["category"]
        }),
        getSubCategory: builder.query({
            query: (id) => ({
                url: `/subcategory/get/${id}`,
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                },
            }),
            providesTags: ["category"]
        }),
    }),
});

export const { useGetAllCategoryQuery, useGetCategoryQuery, useGetSubCategoryQuery, useLazyGetSubCategoryQuery } = CategoryAPI