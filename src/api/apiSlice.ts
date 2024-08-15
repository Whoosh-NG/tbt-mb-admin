import { AddAdminData, updateAdminData } from '@/Interfaces/Admin';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://apiv2.staging.whooshing.xyz/api/v2',

  prepareHeaders: (headers) => {
    // Get your token from wherever you have it stored
    const userToken = Cookies.get('whooshNgToken');

    if (userToken) {
      // Set the 'Authorization' header with the token
      headers.set('Authorization', `Bearer ${userToken}`);
      headers.set('x-access-token', userToken);
    }

    return headers;
  },
});

export const apiSLice = createApi({
  baseQuery: customBaseQuery,

  tagTypes: [
    'Admin',
    'Store',
    'StoreList',
    'List',
    'Products',
    'Withdrawal',
    'WithdrawalList',
    'Ads',
    'AdsList',
    'Users',
    'UsersList',
    'Faqs',
    'FaqsList',
    'Categs',
    'CategsList',
    'HelpCategs',
    'HelpCategsList',
  ],

  // All endpoints
  endpoints: (builder) => ({
    // === Admin start ===
    getAllAdmin: builder.query<any, any>({
      query: () => `/access/admins`,
      providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    addNewAdmin: builder.mutation<any, AddAdminData>({
      query: (formData) => ({
        url: `/access/admin`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    editAdmin: builder.mutation<any, updateAdminData>({
      query: ({ formData, id }) => ({
        url: `/access/update/admin/${id}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/access/admin/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    changeNewAdminPassword: builder.mutation({
      query: (formData) => ({
        url: `/admins/team/add-password`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    // === Admin end ===

    // === Overview Start ===
    getTotalRevnue: builder.query({
      query: () => `/admins/totalRevenue`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getTotalWithdrawal: builder.query({
      query: () => `/admins/total/withdrawal`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getTotalRevenueFilter: builder.query({
      query: (query) => `/admins/filter/total/revenue?filter=${query}`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getTotalRegisteredUser: builder.query({
      query: () => `/admins/all/registered/users`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getTotalApprovedUser: builder.query({
      query: () => `/admins/all/approved/users`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getTotalAdsRevenue: builder.query({
      query: () => `/admins/totalAd/revenue`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getTotalServiceCharge: builder.query({
      query: () => `/admins/totalAd/revenue`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getTopStores: builder.query({
      query: () => `/admins/fetch/top/stores`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getAllApprovedStores: builder.query({
      query: () => `/admins/stores/ads/sales`,
      // query: () => `/admins/fetch/top/stores/all`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getStoreById: builder.query({
      query: (sellerId) => `/sellers/${sellerId}`,
      // providesTags: [{ type: 'Admin', id: 'AdminList' }],
    }),

    getStoreAdsById: builder.query({
      query: (sellerId) => `admins/fetch/all/seller/ads/${sellerId}`,
      providesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    getProductBySubCatName: builder.query({
      query: ({ formData, sellerId }) => ({
        url: `/products/sub/name/${sellerId}`,
        method: 'POST',
        body: formData,
      }),
    }),

    deleteProductById: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'List' }],
    }),
    // === Overview End ===

    // === Request Start ===
    getPendingStores: builder.query({
      query: () => `/admins/get/pending/stores`,
      providesTags: [{ type: 'Store', id: 'StoreList' }],
    }),

    getPendingWithdrawals: builder.query({
      query: () => `/access/admins/get/pending/withdrawals`,
      providesTags: [{ type: 'Withdrawal', id: 'WithdrawalList' }],
    }),

    getWithdrawalReqBySellerId: builder.query({
      query: (sellerId) => `/admins/get/withdrawal/details/${sellerId}`,
      providesTags: [{ type: 'Withdrawal', id: 'WithdrawalList' }],
    }),

    getAWithdrawalById: builder.query({
      query: (withdrawalId) => `/admins/fetch/withdrawal/byId/${withdrawalId}`,
      providesTags: [{ type: 'Withdrawal', id: 'WithdrawalList' }],
    }),

    approveWithdrawalById: builder.mutation({
      query: (withdrawalId) => ({
        url: `/admins/approve/seller/withdrawal/request/${withdrawalId}`,
        method: 'POST',
      }),

      invalidatesTags: [{ type: 'Withdrawal', id: 'WithdrawalList' }],
    }),

    declineWithdrawalById: builder.mutation({
      query: ({ formData, withdrawalId }) => ({
        url: `/access/admins/decline/seller/withdrawal/request/${withdrawalId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'Withdrawal', id: 'WithdrawalList' }],
    }),

    approveStores: builder.mutation({
      query: ({ formData, sellerId }) => ({
        url: `/admins/approve/store/status/${sellerId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'Store', id: 'StoreList' }],
    }),

    rejectStores: builder.mutation({
      query: ({ formData, sellerId }) => ({
        url: `/admins/reject/a/store/${sellerId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'Store', id: 'StoreList' }],
    }),
    // === Request End ===

    // =====ADVERTS START====

    getAllAdsRequest: builder.query({
      query: () => `admins/all/pending/ads`,
      providesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    getAllApprovedAds: builder.query({
      query: () => `admins/all/approved/ads`,
      providesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    getAllDeclinedAds: builder.query({
      query: () => `admins/all/non/approved/ads`,
      providesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    getOngoingAds: builder.query({
      query: () => `/admins/all/ongoing/ads`,
      providesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    getCompletedAds: builder.query({
      query: () => `/admins/all/completed/ads`,
      providesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    getAdById: builder.query({
      query: (adId) => `admins/fetch/ad/byId/${adId}`,
      providesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    approveAdsbyId: builder.mutation({
      query: (adsId) => ({
        url: `/admins/approve/seller/ads/${adsId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    declinedAdsbyId: builder.mutation({
      query: ({ formData, adsId }) => ({
        url: `/admins/decline/seller/ads/${adsId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    getAllAdsBudget: builder.query({
      query: () => `/budgets/`,
      providesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    createAdsBudget: builder.mutation({
      query: (formData) => ({
        url: `/budgets`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    editAdsBudgetById: builder.mutation({
      query: ({ formData, budgetId }) => ({
        url: `/budgets/update/${budgetId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Ads', id: 'AdsList' }],
    }),

    // =====ADVERTS END====

    // =====USER INSIGTHS  START====

    getAllUsers: builder.query({
      query: () => `/admins/registered/users`,
      providesTags: [{ type: 'Users', id: 'UsersList' }],
    }),

    getTotalApprovedStors: builder.query({
      query: () => `/admins/approved/seller/stores`,
      providesTags: [{ type: 'Users', id: 'UsersList' }],
    }),

    getTotalApprovedBuyers: builder.query({
      query: () => `/admins/all/buyers`,
      providesTags: [{ type: 'Users', id: 'UsersList' }],
    }),

    getTotalSellers: builder.query({
      query: () => `/admins/all/sellers`,
      providesTags: [{ type: 'Users', id: 'UsersList' }],
    }),

    getAllUsersAverageTime: builder.query({
      query: () => `/admins/total/average/time/spent`,
      providesTags: [{ type: 'Users', id: 'UsersList' }],
    }),

    getAUserById: builder.query({
      query: (userId) => `/admins/fetch/a/user/details/${userId}`,
      providesTags: [{ type: 'Users', id: 'UsersList' }],
    }),

    // =====USER INSIGTHS  END====

    // =====FAQS  START====
    getAllFaqs: builder.query({
      query: () => `/admins/get/all/faqs`,
      providesTags: [{ type: 'Faqs', id: 'FaqsList' }],
    }),

    createFaqs: builder.mutation({
      query: (formData) => ({
        url: `/admins/create/faq`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Faqs', id: 'FaqsList' }],
    }),

    editFaqById: builder.mutation({
      query: ({ formData, faqId }) => ({
        url: `/admins/update/faq/${faqId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Faqs', id: 'FaqsList' }],
    }),

    deleteFaqById: builder.mutation({
      query: (faqId) => ({
        url: `/admins/delete/faq/${faqId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Faqs', id: 'FaqsList' }],
    }),
    // =====FAQS END====

    // =====VENDA CATEGORY  START====
    getAllCategories: builder.query({
      query: () => `/admins/all/local/venda/category`,
      providesTags: [{ type: 'Categs', id: 'CategsList' }],
    }),

    createCategory: builder.mutation({
      query: (formData) => ({
        url: `/vendaCats`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Categs', id: 'CategsList' }],
    }),

    editCategoryById: builder.mutation({
      query: ({ formData, categoryId }) => ({
        url: `/vendaCats/update/${categoryId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Categs', id: 'CategsList' }],
    }),

    deleteCategoryById: builder.mutation({
      query: (categoryId) => ({
        url: `/vendaCats/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Categs', id: 'CategsList' }],
    }),

    getAllSubCategoriesById: builder.query({
      query: (vendaId) => `/vendaCats/sub/${vendaId}`,
      providesTags: [{ type: 'Categs', id: 'CategsList' }],
    }),

    createSubCategory: builder.mutation({
      query: ({ formData, vendaId }) => ({
        url: `/vendaCats/sub/${vendaId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Categs', id: 'CategsList' }],
    }),

    editSubCategoryById: builder.mutation({
      query: ({ formData, subId }) => ({
        url: `/vendaCats/sub/update/${subId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Categs', id: 'CategsList' }],
    }),

    deleteSubCategoryById: builder.mutation({
      query: (subId) => ({
        url: `/vendaCats/sub/${subId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Categs', id: 'CategsList' }],
    }),

    // =====VENDA CATEGORY END====

    // =====HELP FAQS  START====
    getAllHelpCategories: builder.query({
      query: () => `/faq/admin/category`,
      providesTags: [{ type: 'HelpCategs', id: 'HelpCategsList' }],
    }),

    createHelpCategory: builder.mutation({
      query: (formData) => ({
        url: `/faq/category`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'HelpCategs', id: 'HelpCategsList' }],
    }),

    editHelpCategoryById: builder.mutation({
      query: ({ formData, categId }) => ({
        url: `/faq/category/update/${categId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'HelpCategs', id: 'HelpCategsList' }],
    }),

    deleteHelpCategoryById: builder.mutation({
      query: (categId) => ({
        url: `/faq/category/${categId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'HelpCategs', id: 'HelpCategsList' }],
    }),

    getAllHelpSupportFaq: builder.query({
      query: (faqCategId) =>
        `/faq/help/support/admin/get/by/category/${faqCategId}`,
      providesTags: [{ type: 'HelpCategs', id: 'HelpCategsList' }],
    }),

    createHelpSupportFaq: builder.mutation({
      query: (formData) => ({
        url: `/faq/help/support`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'HelpCategs', id: 'HelpCategsList' }],
    }),

    editHelpSupportFaq: builder.mutation({
      query: ({ formData, faqId }) => ({
        url: `/faq/help/support/update/${faqId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'HelpCategs', id: 'HelpCategsList' }],
    }),

    deleteHelpSupporFaqById: builder.mutation({
      query: (faqId) => ({
        url: `/faq/help/support/${faqId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'HelpCategs', id: 'HelpCategsList' }],
    }),
    // =====HELP FAQS END====

    // =====OTHERS START====

    createBulkMessages: builder.mutation({
      query: (formData) => ({
        url: `/admins/bulk/create/messages`,
        method: 'POST',
        body: formData,
      }),
      // invalidatesTags: [{ type: 'Users', id: 'UsersList' }],
    }),

    suspendUser: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/admins/suspend/${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Users', id: 'UsersList' }],
    }),

    getServiceCharges: builder.query({
      query: () => `/access/admins/venda/service`,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admins/delete/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Users', id: 'UsersList' }],
    }),
    // =====OTHERS END====
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

  // ==== OVERVIEW START====
  useGetTotalWithdrawalQuery,
  useGetTotalRevnueQuery,
  useGetTotalRevenueFilterQuery,
  useGetTotalApprovedUserQuery,
  useGetTotalRegisteredUserQuery,
  useGetTotalAdsRevenueQuery,
  useGetTotalServiceChargeQuery,
  useGetTopStoresQuery,
  useGetAllApprovedStoresQuery,
  useGetStoreByIdQuery,
  useDeleteProductByIdMutation,
  useGetProductBySubCatNameQuery,
  useGetStoreAdsByIdQuery,
  // ==== OVERVIEW START====

  // ==== NEW REQUEST START====
  useGetPendingStoresQuery,
  useGetWithdrawalReqBySellerIdQuery,
  useApproveStoresMutation,
  useRejectStoresMutation,
  useGetPendingWithdrawalsQuery,
  useApproveWithdrawalByIdMutation,
  useDeclineWithdrawalByIdMutation,
  useGetAWithdrawalByIdQuery,
  // ==== NEW REQUEST END====

  // ==== ADS START====
  useGetAllAdsRequestQuery,
  useGetAllApprovedAdsQuery,
  useGetAllDeclinedAdsQuery,
  useGetOngoingAdsQuery,
  useGetCompletedAdsQuery,
  useGetAdByIdQuery,
  useApproveAdsbyIdMutation,
  useDeclinedAdsbyIdMutation,
  useGetAllAdsBudgetQuery,
  useEditAdsBudgetByIdMutation,
  useCreateAdsBudgetMutation,
  // ==== ADS END====

  // ==== USER INSIGTHS START====
  useGetAllUsersQuery,
  useGetAUserByIdQuery,
  useGetAllUsersAverageTimeQuery,
  useGetTotalApprovedStorsQuery,
  useGetTotalApprovedBuyersQuery,
  useGetTotalSellersQuery,
  // ==== USER INSIGTHS END====

  // ==== FAQS START====
  useCreateFaqsMutation,
  useGetAllFaqsQuery,
  useEditFaqByIdMutation,
  useDeleteFaqByIdMutation,
  // ==== FAQS END====

  // ==== CATEGORIES START====
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryByIdMutation,
  useDeleteCategoryByIdMutation,
  useGetAllSubCategoriesByIdQuery,
  useCreateSubCategoryMutation,
  useEditSubCategoryByIdMutation,
  useDeleteSubCategoryByIdMutation,
  // ==== CATEGORIES END====

  // ==== HELP AND SUPPORT FAQS START====
  useGetAllHelpCategoriesQuery,
  useCreateHelpCategoryMutation,
  useEditHelpCategoryByIdMutation,
  useDeleteHelpCategoryByIdMutation,
  useGetAllHelpSupportFaqQuery,
  useCreateHelpSupportFaqMutation,
  useEditHelpSupportFaqMutation,
  useDeleteHelpSupporFaqByIdMutation,
  // ==== HELP AND SUPPORT FAQS END====

  // ==== OTHERS START====
  useSuspendUserMutation,
  useDeleteUserMutation,
  useCreateBulkMessagesMutation,
  useGetServiceChargesQuery,
  // ==== OTHERS END====
} = apiSLice;
