export enum UnitType {
  Gram = "GRAM",
  Milliliter = "MILLILITER",
  Count = "COUNT",
}

export type IIngredient = {
  _id: string;
  name: string;
  unit: UnitType;
};

export type IIngredientInput = {
  name: string;
  unit: UnitType;
};

export type IInventory = {
  _id: string;
  name: string;
};

export type IInventoryInput = {
  name: string;
};

export type IProduct = {
  _id: string;
  name: string;
  ingredient: { _id: string; value: number; optional: boolean }[];
  inventory: { _id: string; value: number; optional: boolean }[];
};

export type IChangeItemError = {
  message: string;
  errorKey: ErrorKeysEnum;
  dependentProducts: IProduct[]
}

export enum ErrorKeysEnum {
  IngredientIsUsedInProduct = "INGREDIENT_IS_USED_IN_PRODUCT",
  InventoryIsUsedInProduct = "INVENTORY_IS_USED_IN_PRODUCT"
}
