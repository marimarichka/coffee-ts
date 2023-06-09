import { IIngredient, IInventory } from "../../types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.8:5000/" }),
  tagTypes: ["Ingredients", "Inventory"],
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
} = api;
