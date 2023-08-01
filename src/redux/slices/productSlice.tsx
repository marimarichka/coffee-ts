import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProductState {
  _id?: string;
  name: string;
  inventories: { _id: string; name: string; optional: boolean; value: string }[];
  ingredients: { _id: string; name: string; optional: boolean; value: string }[];
}

const initialState: IProductState = {
  _id: undefined,
  name: "",
  inventories: [],
  ingredients: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    addInventory: (state, action: PayloadAction<IProductState["inventories"][number]>) => {
      state.inventories.push(action.payload);
    },
    deleteInventory: (state, action: PayloadAction<string>) => {
      state.inventories = state.inventories.filter((inventory) => action.payload !== inventory._id);
    },
    updateInventory: (
      state,
      action: PayloadAction<{ _id: string; newValues: { optional?: boolean; value?: string } }>
    ) => {
      state.inventories = state.inventories.map((item) => {
        if (action.payload._id === item._id) {
          return {
            ...item,
            ...action.payload.newValues,
          };
        }
        return item;
      });
    },
    addIngredient: (state, action: PayloadAction<IProductState["ingredients"][number]>) => {
      state.ingredients.push(action.payload);
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((ingredient) => action.payload !== ingredient._id);
    },
    updateIngredient: (
      state,
      action: PayloadAction<{ _id: string; newValues: { optional?: boolean; value?: string } }>
    ) => {
      state.ingredients = state.ingredients.map((item) => {
        if (action.payload._id === item._id) {
          return {
            ...item,
            ...action.payload.newValues,
          };
        }
        return item;
      });
    },
    resetProduct: (state) => {
      state._id = initialState._id;
      state.name = initialState.name;
      state.inventories = initialState.inventories;
      state.ingredients = initialState.ingredients;
    },
    setProduct: (state, action: PayloadAction<IProductState>) => {
      const { _id, name, inventories, ingredients } = action.payload;
      state._id = _id;
      state.name = name;
      state.inventories = inventories;
      state.ingredients = ingredients;
    },
  },
});

export const {
  setName,
  addInventory,
  updateInventory,
  deleteInventory,
  addIngredient,
  deleteIngredient,
  updateIngredient,
  resetProduct,
  setProduct,
} = productSlice.actions;

export default productSlice.reducer;
