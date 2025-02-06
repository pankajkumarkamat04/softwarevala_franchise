import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminAPI = createApi({
    reducerPath: "AdminAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/admin" }),
    tagTypes: ["admin"],
    endpoints: (builder) => ({
        dashboardData: builder.query({
            query: () => ({
                url: "/dashboard/data",
            }),
        }),
    }),
});

export const { useDashboardDataQuery } = AdminAPI