import { IIngredient, IInventory, IProduct } from "../../types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Ingredients", "Inventory", "Products"],
  endpoints: (builder) => ({
    getIngredients: builder.query<IIngredient[], void>({
      query: () => `/ingredient`,
      providesTags: ["Ingredients"],
    }),
    addIngredient: builder.mutation<IIngredient, Partial<IIngredient>>({
      query: (body) => ({
        url: `/ingredient`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Ingredients"],
    }),
    editIngredient: builder.mutation<IIngredient, Partial<IIngredient>>({
      query: (body) => ({
        url: `ingredient/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Ingredients"],
    }),
    deleteIngredient: builder.mutation<IIngredient, Partial<IIngredient>>({
      query: (body) => ({
        url: `/ingredient/${body._id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Ingredients"],
    }),
    getInventory: builder.query<IInventory[], void>({
      query: () => `/inventory`,
      providesTags: ["Inventory"],
    }),
    addInventory: builder.mutation<IInventory, Partial<IInventory>>({
      query: (body) => ({
        url: `/inventory`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),
    editInventory: builder.mutation<IInventory, Partial<IInventory>>({
      query: (body) => ({
        url: `inventory/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteInventory: builder.mutation<IInventory, Partial<IInventory>>({
      query: (body) => ({
        url: `/inventory/${body._id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),
    getProducts: builder.query<IProduct[], void>({
      query: () => `/product`,
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => ({
        url: `/product`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    editProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => ({
        url: `product/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => ({
        url: `/product/${body._id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Products"],
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
