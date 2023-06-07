import { IIngredient } from "../../types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.8:5000/" }),
  tagTypes: ["Ingredients"],
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
  }),
});

export const {
  useGetIngredientsQuery,
  useAddIngredientMutation,
  useEditIngredientMutation,
  useDeleteIngredientMutation,
} = api;
