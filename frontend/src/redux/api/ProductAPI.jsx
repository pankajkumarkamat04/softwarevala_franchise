import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import siteData from "../../utils/siteData";


export const ProductAPI = createApi({
  reducerPath: "ProductAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://softwarevala.net/api/v2/franchise" }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (params) => ({
        url: "/product/getall",
        params
      }),
      providesTags: ["product"]
    }),
    product: builder.query({
      query: (id) => ({
        url: `/product/get/${id}`,
        params: {
          key: siteData?.apiKey,
          secret: siteData?.apiSecret
        }
      }),
      providesTags: ["product"]
    }),
    getTopProduct: builder.query({
      query: () => ({
        url: `/product/top`,
        params: {
          key: siteData?.apiKey,
          secret: siteData?.apiSecret
        }
      }),
    }),
    getAllAdminProduct: builder.query({
      query: () => ({
        url: `/admin/product/getall`,
        params: {
          key: siteData?.apiKey,
          secret: siteData?.apiSecret
        }
      }),
      providesTags: ["product"]
    }),
    searchProduct: builder.query({
      query: ({ keyword }) => ({
        url: `/search`,
        params: {
          keyword,
          key: siteData?.apiKey,
          secret: siteData?.apiSecret
        }
      }),
    }),
  }),
});

export const { useSearchProductQuery, useGetProductQuery, useProductQuery, useGetTopProductQuery, useGetAllAdminProductQuery } = ProductAPI;
