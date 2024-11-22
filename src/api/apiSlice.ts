import { AddAdminData, updateAdminData } from "@/types/Admin";
import { queryBuilder } from "@/Utils";
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

  tagTypes: [
    "Admin",
    "Store",
    "StoreList",
    "List",
    "Products",
    "Withdrawal",
    "WithdrawalList",
    "Ads",
    "AdsList",
    "Users",
    "UsersList",
    "Faqs",
    "FaqsList",
    "Categs",
    "CategsList",
    "HelpCategs",
    "HelpCategsList",
  ],

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
      query: () => `/admin/dashboard/stats`,
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

  useGetAllStatsQuery,
} = apiSLice;
