import { CategoryRspData, MarketsRsp } from "@/types/Markets";
import {
  AddNewProductRsp,
  ProductsRspData,
  SingleProducts,
} from "@/types/Products";
import { queryBuilder } from "@/Utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://api.tbt.live.whooshing.xyz/api/v1",
  // baseUrl: "https://tbt-agro.whooshing.xyz/api/v1",

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
    "Agents",
    "Products",
    "Brands",
    "Categories",
    "Markets",
    "Orders",
    "Pickup",
    "Banners",
  ],

  // All endpoints
  endpoints: (builder) => ({
    // === Admin start ===
    getAllAdmin: builder.query({
      query: () => `admin/list`,
      providesTags: [{ type: "Admin", id: "AdminList" }],
    }),

    addNewAdmin: builder.mutation({
      query: (formData) => ({
        url: `/access/admin`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: [{ type: "Admin", id: "AdminList" }],
    }),

    editAdmin: builder.mutation({
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

    getProductByCategoryId: builder.query<
      ProductsRspData,
      { categId: string; params: { [key: string]: string } }
    >({
      query: ({ categId, params }) =>
        `/admin/mile-12-market/product/category/${categId}?${queryBuilder(params)}`,
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

    markUserAsAgents: builder.mutation({
      query: (formData) => ({
        url: `/admin/agent/toggle-agent`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: [{ type: "Agents", id: "LIST" }],
    }),

    addAgentToMarket: builder.mutation({
      query: (formData) => ({
        url: `/admin/agent/add-to-market`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: [{ type: "Agents", id: "LIST" }],
    }),

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

    getAllAgentsbyMarketId: builder.query({
      query: (id) => `/admin/agent/list-agents-in-market/${id}`,
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
      providesTags: [{ type: "Markets", id: "LIST" }],
    }),

    getMarketById: builder.query({
      query: (id) => `/market/show/${id}`,
      providesTags: [{ type: "Markets", id: "LIST" }],
    }),

    createMarkets: builder.mutation({
      query: (formData) => ({
        url: `/admin/market/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Markets", id: "LIST" }],
    }),

    updateMarkets: builder.mutation({
      query: (formData) => ({
        url: `/admin/market/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Markets", id: "LIST" }],
    }),

    getCategoriesByMarketId: builder.query({
      query: (id) => `/mile-12-market/category/listbymarket/${id}`,
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),

    getAllCategories: builder.query<CategoryRspData, any>({
      query: () => `/mile-12-market/category/list`,
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),

    getCategoryById: builder.query({
      query: (id) => `/mile-12-market/category/show/${id}`,
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),

    getBrandById: builder.query({
      query: (id) => `/admin/brand/show/${id}`,
      providesTags: [{ type: "Brands", id: "LIST" }],
    }),

    getAllBrands: builder.query({
      query: () => `/admin/brand/list-tbt-brands`,
      providesTags: [{ type: "Brands", id: "LIST" }],
    }),

    createBrands: builder.mutation({
      query: (formData) => ({
        url: `/admin/brand/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Brands", id: "LIST" }],
    }),

    updateBrands: builder.mutation({
      query: (formData) => ({
        url: `/admin/brand/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Brands", id: "LIST" }],
    }),

    createCategories: builder.mutation({
      query: (formData) => ({
        url: `/admin/mile-12-market/category/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    updateCategories: builder.mutation({
      query: (formData) => ({
        url: `/admin/mile-12-market/category/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    deleteCategoryById: builder.mutation({
      query: (id) => ({
        url: `/admin/mile-12-market/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    //===== ORDERS ====

    getAllOrders: builder.query({
      query: (params) =>
        `/admin/mile-12-market/order/list?${queryBuilder(params)}`,
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),

    getOrderbyId: builder.query({
      query: (id) => `/admin/order/show/${id}`,
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),

    getOrderByStatus: builder.query({
      query: (status) => `/admin/order/status/${status}`,
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),

    updateOrderStatus: builder.mutation({
      query: (formData) => ({
        url: `/admin/mile-12-market/order/update-status`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),

    getPayments: builder.query({
      query: (params) =>
        `/admin/mile-12-market/payment/list?${queryBuilder(params)}`,
    }),
    getPaymentById: builder.query({
      query: (id) => `/admin/payment/show/${id}`,
    }),
    //===== ORDERS ====

    //===== LOGISTICS ====
    createPickupCharge: builder.mutation({
      query: (formData) => ({
        url: `/admin/pickup-charge/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Pickup", id: "LIST" }],
    }),

    updatePickupCharge: builder.mutation({
      query: (formData) => ({
        url: `/admin/pickup-charge/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Pickup", id: "LIST" }],
    }),

    deletePickupCharge: builder.mutation({
      query: (id) => ({
        url: `/admin/pickup-charge/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Pickup", id: "LIST" }],
    }),

    getAllPickupCharge: builder.query({
      query: () => `/admin/pickup-charge/list`,

      providesTags: [{ type: "Pickup", id: "LIST" }],
    }),

    getPickupChargeById: builder.query({
      query: (id) => `/admin/pickup-charge/show/${id}`,

      providesTags: [{ type: "Pickup", id: "LIST" }],
    }),

    // === BANNERS===
    createNewBanners: builder.mutation({
      query: (formData) => ({
        url: `/admin/sliders/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Banners", id: "LIST" }],
    }),

    updateBanners: builder.mutation({
      query: (formData) => ({
        url: `/admin/sliders/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Banners", id: "LIST" }],
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/admin/sliders/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Banners", id: "LIST" }],
    }),

    getAllBanners: builder.query({
      query: () => `/admin/sliders/list/mb`,

      providesTags: [{ type: "Banners", id: "LIST" }],
    }),

    getBannerById: builder.query({
      query: (id) => `/admin/sliders/show/${id}`,

      providesTags: [{ type: "Banners", id: "LIST" }],
    }),

    // === BANNERS===
    //===== LOGISTICS ====
  }),
});

export const {
  useCreatePickupChargeMutation,
  useUpdatePickupChargeMutation,
  useDeletePickupChargeMutation,
  useGetAllPickupChargeQuery,
  useGetPickupChargeByIdQuery,

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
  useGetProductByCategoryIdQuery,
  useCreateProductsMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  useGetProductByIdQuery,
  useDeleteProductsImgsMutation,
  // ==== PRODUCTS START====

  // ==== MARKETS START====
  useGetAllAgentsQuery,
  useUpdateAgentsQuery,
  useDeleteCategoryByIdMutation,
  useCreateAgentsMutation,
  useMarkUserAsAgentsMutation,
  useCreateCategoriesMutation,
  useCreateMarketsMutation,
  useUpdateCategoriesMutation,
  useUpdateMarketsMutation,
  useGetAllCategoriesQuery,
  useGetAllMarketsQuery,
  useGetCategoryByIdQuery,
  useGetMarketByIdQuery,
  useGetCategoriesByMarketIdQuery,
  useAddAgentToMarketMutation,
  useGetAllAgentsbyMarketIdQuery,
  // ==== MARKETS START====

  // ==== ORDER START====
  useGetAllOrdersQuery,
  useGetOrderByStatusQuery,
  useGetOrderbyIdQuery,
  useUpdateOrderStatusMutation,
  // ==== ORDER END====

  // ==== BANNER START====
  useCreateNewBannersMutation,
  useUpdateBannersMutation,
  useDeleteBannerMutation,
  useGetAllBannersQuery,
  useGetBannerByIdQuery,
  // ==== BANNER END====

  useGetAllStatsQuery,
  useGetAllBrandsQuery,
  useCreateBrandsMutation,
  useUpdateBrandsMutation,
  useGetBrandByIdQuery,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
} = apiSLice;
