import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  inventory: [] as { _id: string; name: string; optional: boolean; value: string  }[],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    addInventory: (state, action: PayloadAction<{ _id: string; name: string; optional: boolean; value: string }>) => {
      state.inventory.push(action.payload);
    },
    deleteInventory: (state, action: PayloadAction<string>) => {
      state.inventory = state.inventory.filter((inventory) => action.payload !== inventory._id);
    },
    updateInventory: (state, action: PayloadAction<{ _id: string; newValues: { optional?: boolean; value?: string } }>) => {
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
    resetProduct: (state) => {
      state.name = initialState.name,
      state.inventory = initialState.inventory
    }
  },
});

export const { setName, addInventory, updateInventory, deleteInventory, resetProduct } = productSlice.actions;

export default productSlice.reducer;
