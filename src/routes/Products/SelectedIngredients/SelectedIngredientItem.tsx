import React, { FC, useMemo } from "react";
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteIngredient, updateIngredient } from "../../../redux/slices/productSlice";
import { useGetIngredientsQuery } from "../../../redux/API/API";
import { UnitType } from "../../../types";

interface IOneIngredient {
  ingredientItem: { _id: string; name: string; optional: boolean; value: string };
}

const shortUnit = {
  [UnitType.Gram]: "gr",
  [UnitType.Count]: "c",
  [UnitType.Milliliter]: "ml",
};

const SelectedIngredientItem: FC<IOneIngredient> = ({ ingredientItem }) => {
  const { data: ingredients } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  const unit = useMemo(() => {
    const item = ingredients?.find(({ _id }) => _id === ingredientItem._id);

    if (!item?.unit) return "";

    return shortUnit[item.unit];
  }, [ingredientItem, ingredients]);

  const onOptionalChange = (_id: string, optional: boolean) => {
    dispatch(updateIngredient({ _id, newValues: { optional } }));
  };

  const onValueChange = (_id: string, value: string) => {
    dispatch(updateIngredient({ _id, newValues: { value } }));
  };

  const onDelete = (_id: string) => dispatch(deleteIngredient(_id));

  return (
    <Paper
      key={ingredientItem._id}
      sx={{
        height: "140px",
        minWidth: "180px",
        maxWidth: "225px",
        marginRight: "30px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      elevation={2}
    >
      <Box sx={{ marginBottom: "10px" }}>{ingredientItem.name}</Box>
      <TextField
        type="number"
        label="Value"
        variant="outlined"
        size="small"
        value={ingredientItem.value}
        onChange={(e) => onValueChange(ingredientItem._id, e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        }}
      ></TextField>
      <FormControlLabel
        control={
          <Checkbox
            checked={ingredientItem.optional}
            onChange={(e) => onOptionalChange(ingredientItem._id, e.target.checked)}
          />
        }
        label="Optional"
        labelPlacement="end"
      />
      <IconButton
        aria-label="delete"
        onClick={() => onDelete(ingredientItem._id)}
        sx={{ width: "35px", height: "35px", alignSelf: "flex-end" }}
      >
        <DeleteIcon sx={{ fontSize: "18px" }} />
      </IconButton>
    </Paper>
  );
};

export default SelectedIngredientItem;
