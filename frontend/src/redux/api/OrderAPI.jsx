import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import siteData from "../../utils/siteData";

export const OrderAPI = createApi({
    reducerPath: "OrderAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://softwarevala.net/api/v2/franchise/order" }),
    tagTypes: ["order"],
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: (id) => ({
                url: `/getall/${id}`,
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                }
            }),
            providesTags: ["order"]
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                }
            }),
            providesTags: ["order"]

        }),
        createOrder: builder.mutation({
            query: ({ body }) => ({
                url: "/create",
                method: "POST",
                body,
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                }
            }),
            invalidatesTags: ["order"],
        }),
        getAllAdminOrder: builder.query({
            query: () => ({
                url: `/admin/getall`,
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                }
            }),
            providesTags: ["order"]
        }),
        updateOrder: builder.mutation({
            query: ({ body, id }) => ({
                url: `/update/${id}`,
                body,
                method: "PUT",
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                }
            }),
            invalidatesTags: ["order"]
        }),
        isOrderAvailable: builder.query({
            query: (id) => ({
                url: `/isorderavailable/${id}`,
                params: {
                    key: siteData?.apiKey,
                    secret: siteData?.apiSecret
                }
            })
        }),
    })
})

export const { useIsOrderAvailableQuery, useGetAllOrderQuery, useGetOrderQuery, useCreateOrderMutation, useUpdateOrderMutation, useGetAllAdminOrderQuery } = OrderAPI