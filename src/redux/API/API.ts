import { IIngredient, IInventory, IProduct } from "../../types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TAG_INGREDIENT = "Ingredient";
const TAG_INVENTORY = "Inventory";
const TAG_PRODUCT = "Product";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: [TAG_INGREDIENT, TAG_INVENTORY, TAG_PRODUCT],
  endpoints: (builder) => ({
    getIngredients: builder.query<IIngredient[], void>({
      query: () => `/ingredient`,
      providesTags: [TAG_INGREDIENT],
    }),
    addIngredient: builder.mutation<IIngredient, Partial<IIngredient>>({
      query: (body) => ({
        url: `/ingredient`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_INGREDIENT],
    }),
    editIngredient: builder.mutation<IIngredient, Partial<IIngredient>>({
      query: (body) => ({
        url: `ingredient/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TAG_INGREDIENT],
    }),
    deleteIngredient: builder.mutation<IIngredient, Partial<IIngredient>>({
      query: (body) => ({
        url: `/ingredient/${body._id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [TAG_INGREDIENT],
    }),
    getInventory: builder.query<IInventory[], void>({
      query: () => `/inventory`,
      providesTags: [TAG_INVENTORY],
    }),
    addInventory: builder.mutation<IInventory, Partial<IInventory>>({
      query: (body) => ({
        url: `/inventory`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_INVENTORY],
    }),
    editInventory: builder.mutation<IInventory, Partial<IInventory>>({
      query: (body) => ({
        url: `inventory/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TAG_INVENTORY],
    }),
    deleteInventory: builder.mutation<IInventory, Partial<IInventory>>({
      query: (body) => ({
        url: `/inventory/${body._id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [TAG_INVENTORY],
    }),
    getProducts: builder.query<IProduct[], void>({
      query: () => `/product`,
      providesTags: [TAG_PRODUCT],
    }),
    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => ({
        url: `/product`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_PRODUCT],
    }),
    editProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => ({
        url: `product/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TAG_PRODUCT],
    }),
    deleteProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => ({
        url: `/product/${body._id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [TAG_PRODUCT],
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useAddIngredientMutation,
  useEditIngredientMutation,
  useDeleteIngredientMutation,
  useGetInventoryQuery,
  useAddInventoryMutation,
  useEditInventoryMutation,
  useDeleteInventoryMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = api;
