export enum UnitType {
  Gram = "GRAM",
  Milliliter = "MILLILITER",
  Count = "COUNT"
}

export type IIngredient = {
  _id: string;
  name: string;
  unit: UnitType;
  __v?: string;
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
}