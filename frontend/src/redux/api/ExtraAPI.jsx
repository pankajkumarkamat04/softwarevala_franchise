import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ExtraAPI = createApi({
    reducerPath: "ExtraAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/extra" }),
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: ({ body }) => ({
                url: `contact/create`,
                method: "POST",
                body
            }),
        }),
        getAllContactForm: builder.query({
            query: () => ({
                url: `/contact/getall`
            }),
        }),
    }),
});

export const { useCreateContactMutation, useGetAllContactFormQuery } = ExtraAPI;
