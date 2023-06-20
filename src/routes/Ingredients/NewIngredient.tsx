import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { IIngredientInput, UnitType } from "../../types";
import { useAddIngredientMutation } from "../../redux/API/API";

interface INewIngredientProps {
  values: IIngredientInput;
  setValues: React.Dispatch<React.SetStateAction<IIngredientInput>>;
  resetNewIngredient: () => void;
}

const NewIngredient = ({ values, setValues, resetNewIngredient }: INewIngredientProps) => {
  const [addIngredientMutation, { isLoading: isAddLoading }] = useAddIngredientMutation();

  const addIngredient = useCallback(() => {
    addIngredientMutation(values);
  }, [values]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "200px",
        width: "280px",
        backgroundColor: "#FFFFFF",
        borderRadius: "6px",
        boxShadow: "0px 2px 6px -1px rgba(0, 0, 0, 0.25)",
        marginX: "14px",
        marginY: "20px",
        padding: "20px",
        position: "relative",
      }}
    >
      <Box sx={{ marginBottom: "10px", fontSize: "18px" }}>Ingredient</Box>
      <TextField
        autoFocus
        label="Name"
        variant="outlined"
        value={values.name}
        onChange={({ target: { value } }) => setValues({ ...values, name: value })}
        sx={{ marginBottom: "15px" }}
      />
      <TextField
        onChange={({ target: { value } }) => setValues({ ...values, unit: value as UnitType })}
        value={values.unit}
        select
        label="Unit"
        sx={{ marginBottom: "15px", width: "150px" }}
      >
        <MenuItem value={UnitType.Gram}>Gram</MenuItem>
        <MenuItem value={UnitType.Milliliter}>Milliliter</MenuItem>
        <MenuItem value={UnitType.Count}>Count</MenuItem>
      </TextField>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Button variant="contained" color="primary" disabled={isAddLoading} onClick={resetNewIngredient}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "30px" }}
          onClick={addIngredient}
          disabled={isAddLoading}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(NewIngredient);
