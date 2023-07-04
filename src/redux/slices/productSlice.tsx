import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProductState {
  _id?: string;
  name: string;
  inventory: { _id: string; name: string; optional: boolean; value: string }[];
  ingredient: { _id: string; name: string; optional: boolean; value: string }[];
}

const initialState: IProductState = {
  _id: undefined,
  name: "",
  inventory: [],
  ingredient: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    addInventory: (state, action: PayloadAction<IProductState["inventory"][number]>) => {
      state.inventory.push(action.payload);
    },
    deleteInventory: (state, action: PayloadAction<string>) => {
      state.inventory = state.inventory.filter((inventory) => action.payload !== inventory._id);
    },
    updateInventory: (
      state,
      action: PayloadAction<{ _id: string; newValues: { optional?: boolean; value?: string } }>
    ) => {
      state.inventory = state.inventory.map((item) => {
        if (action.payload._id === item._id) {
          return {
            ...item,
            ...action.payload.newValues,
          };
        }
        return item;
      });
    },
    addIngredient: (state, action: PayloadAction<IProductState["ingredient"][number]>) => {
      state.ingredient.push(action.payload);
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredient = state.ingredient.filter((ingredient) => action.payload !== ingredient._id);
    },
    updateIngredient: (
      state,
      action: PayloadAction<{ _id: string; newValues: { optional?: boolean; value?: string } }>
    ) => {
      state.ingredient = state.ingredient.map((item) => {
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
      state.inventory = initialState.inventory;
      state.ingredient = initialState.ingredient;
    },
    setProduct: (state, action: PayloadAction<IProductState>) => {
      const { _id, name, inventory, ingredient } = action.payload;
      state._id = _id;
      state.name = name;
      state.inventory = inventory;
      state.ingredient = ingredient;
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
