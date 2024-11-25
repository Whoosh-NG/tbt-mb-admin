import { AddAdminData, updateAdminData } from "@/types/Admin";
import { CategoryRspData, MarketsRsp } from "@/types/Markets";
import { AddNewProductRsp, SingleProducts } from "@/types/Products";
import { queryBuilder } from "@/Utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://tbt-agro.whooshing.xyz/api/v1",

  prepareHeaders: (headers) => {
    // Get your token from wherever you have it stored
    const userToken = Cookies.get("whooshNgToken");

    if (userToken) {
      // Set the 'Authorization' header with the token
      headers.set("Authorization", `Bearer ${userToken}`);
      headers.set("x-access-token", userToken);
    }

    return headers;
  },
});

export const apiSLice = createApi({
  baseQuery: customBaseQuery,

  tagTypes: ["Admin", "Agents", "Products"],

  // All endpoints
  endpoints: (builder) => ({
    // === Admin start ===
    getAllAdmin: builder.query({
      query: () => `admin/list`,
      providesTags: [{ type: "Admin", id: "AdminList" }],
    }),

    addNewAdmin: builder.mutation<any, AddAdminData>({
      query: (formData) => ({
        url: `/access/admin`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: [{ type: "Admin", id: "AdminList" }],
    }),

    editAdmin: builder.mutation<any, updateAdminData>({
      query: ({ formData, id }) => ({
        url: `/access/update/admin/${id}`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: [{ type: "Admin", id: "AdminList" }],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/access/admin/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Admin", id: "AdminList" }],
    }),

    changeNewAdminPassword: builder.mutation({
      query: (formData) => ({
        url: `/admins/team/add-password`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: [{ type: "Admin", id: "AdminList" }],
    }),

    // === Admin end ===

    getAllStats: builder.query({
      query: () => `/admin/dashboard/mb/stats`,
    }),

    // === Users Start ===
    getAllUsers: builder.query({
      query: (params) => `/admin/user/list?${queryBuilder(params)}`,
    }),

    getAllBuyers: builder.query({
      query: (params) => `/admin/user/buyers?${queryBuilder(params)}`,
    }),

    getAllSellers: builder.query({
      query: (params) => `/admin/user/sellers?${queryBuilder(params)}`,
    }),

    getUserById: builder.query({
      query: (userId) => `/admin/user/show/${userId}`,
    }),
    // === Users end ===

    // === Products start ===
    getAllProducts: builder.query({
      query: (params) =>
        `/admin/mile-12-market/product/my-product/get-all?${queryBuilder(params)}`,
      providesTags: [{ type: "Products", id: "LIST" }],
    }),

    getProductById: builder.query<SingleProducts, string>({
      query: (productId) =>
        `/admin/mile-12-market/product/my-product/get-one/${productId}`,
      providesTags: [{ type: "Products", id: "LIST" }],
    }),

    createProducts: builder.mutation<AddNewProductRsp, FormData>({
      query: (formData) => ({
        url: `/admin/mile-12-market/product/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProducts: builder.mutation({
      query: (formData) => ({
        url: `/admin/mile-12-market/product/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    deleteProductsImgs: builder.mutation({
      query: (formData) => ({
        url: `/admin/mile-12-market/product/delete-image`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/admin/mile-12-market/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    // === Products end ===

    createAgents: builder.mutation({
      query: (formData) => ({
        url: `/admin/agent/create`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: [{ type: "Agents", id: "LIST" }],
    }),

    getAllAgents: builder.query({
      query: (params) => `/agent/list?${queryBuilder(params)}`,
      providesTags: [{ type: "Agents", id: "LIST" }],
    }),

    updateAgents: builder.query({
      query: (formData) => ({
        url: `/admin/agent/update`,
        method: "POST",
        body: formData,
      }),
    }),

    getAllMarkets: builder.query<{ data: MarketsRsp[] }, any>({
      query: (params) => `/market/list?${queryBuilder(params)}`,
    }),

    getMarketById: builder.query({
      query: (id) => `/market/show/${id}`,
    }),

    createMarkets: builder.mutation({
      query: (formData) => ({
        url: `/admin/market/create`,
        method: "POST",
        body: formData,
      }),
    }),

    updateMarkets: builder.mutation({
      query: (formData) => ({
        url: `/admin/market/update`,
        method: "POST",
        body: formData,
      }),
    }),

    getCategoriesByMarketId: builder.query({
      query: (id) => `/mile-12-market/category/listbymarket/${id}`,
    }),

    getAllCategories: builder.query<CategoryRspData, any>({
      query: () => `/mile-12-market/category/list`,
    }),

    getCategoryById: builder.query({
      query: (id) => `/mile-12-market/category/show/${id}`,
    }),

    getBrands: builder.query({
      query: () => `/admin/brand/list-tbt-brands`,
    }),

    createCategories: builder.mutation({
      query: (formData) => ({
        url: `/admin/mile-12-market/category/create`,
        method: "POST",
        body: formData,
      }),
    }),

    updateCategories: builder.mutation({
      query: (formData) => ({
        url: `/admin/mile-12-market/category/update`,
        method: "POST",
        body: formData,
      }),
    }),

    deleteCategoryById: builder.query({
      query: (id) => ({
        url: `/admin/mile-12-market/category/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // ==== ADINM START====
  useAddNewAdminMutation,
  useEditAdminMutation,
  useGetAllAdminQuery,
  useDeleteAdminMutation,
  useChangeNewAdminPasswordMutation,
  // ==== ADINM ENDS====

  // ==== CUSTOMERS START====
  useGetAllBuyersQuery,
  useGetAllSellersQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  // ==== CUSTOMERS START====

  // ==== PRODUCTS START====
  useGetAllProductsQuery,
  useCreateProductsMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  useGetProductByIdQuery,
  useDeleteProductsImgsMutation,
  // ==== PRODUCTS START====

  // ==== MARKETS START====
  useGetAllAgentsQuery,
  useUpdateAgentsQuery,
  useDeleteCategoryByIdQuery,
  useCreateAgentsMutation,
  useCreateCategoriesMutation,
  useCreateMarketsMutation,
  useUpdateCategoriesMutation,
  useUpdateMarketsMutation,
  useGetAllCategoriesQuery,
  useGetAllMarketsQuery,
  useGetCategoryByIdQuery,
  useGetMarketByIdQuery,
  useGetCategoriesByMarketIdQuery,
  // ==== MARKETS START====

  useGetAllStatsQuery,
  useGetBrandsQuery,
} = apiSLice;
