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

