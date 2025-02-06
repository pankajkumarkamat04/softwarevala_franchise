import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SettingAPI = createApi({
    reducerPath: "SettingAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/setting" }),
    tagTypes: ["setting"],
    endpoints: (builder) => ({
        updateGeneralSetting: builder.mutation({
            query: ({ body }) => ({
                url: `/general/update`,
                body,
                method: "PUT",
                fromData: true
            }),
            invalidatesTags: ["setting"],
        }),
        getGeneralSetting: builder.query({
            query: () => ({
                url: "/general/get",
            }),
            providesTags: ["setting"]
        }),
        updateMailSetting: builder.mutation({
            query: ({ body }) => ({
                url: `/mail/update`,
                body,
                method: "PUT"
            }),
            invalidatesTags: ["setting"],
        }),
        getMailSetting: builder.query({
            query: () => ({
                url: "/mail/get",
            }),
            providesTags: ["setting"]
        }),
        updatePaymentSetting: builder.mutation({
            query: ({ body }) => ({
                url: `/payment/update`,
                body,
                method: "PUT"
            }),
            invalidatesTags: ["setting"],
        }),
        getPaymentSetting: builder.query({
            query: () => ({
                url: "/payment/get",
            }),
            providesTags: ["setting"]
        }),
        updateAPISetting: builder.mutation({
            query: ({ body }) => ({
                url: `/api/update`,
                body,
                method: "PUT"
            }),
            invalidatesTags: ["setting"],
        }),
        getAPISetting: builder.query({
            query: () => ({
                url: "/api/get",
            }),
            providesTags: ["setting"]
        }),
    }),
});

export const { useUpdateGeneralSettingMutation, useGetGeneralSettingQuery, useUpdateMailSettingMutation, useGetMailSettingQuery, useGetPaymentSettingQuery, useUpdatePaymentSettingMutation ,useGetAPISettingQuery,useUpdateAPISettingMutation} = SettingAPI;
