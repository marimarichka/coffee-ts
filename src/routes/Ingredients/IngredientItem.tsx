import { Box, Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { useDeleteIngredientMutation, useEditIngredientMutation } from "../../redux/API/API";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IIngredient, UnitType } from "../../types";

interface IOneIngredient {
  ingredient: IIngredient;
}

const IngredientItem: FC<IOneIngredient> = ({ ingredient }) => {
  const [editing, setEditing] = useState(false);
  const [deleteIngredient, { isLoading: isDeleteIngrLoading }] = useDeleteIngredientMutation();
  const [editIngredient, { isLoading: isUpdateIngrLoading }] = useEditIngredientMutation();
  const [values, setValues] = useState({
    name: ingredient?.name,
    unit: ingredient?.unit,
  });

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteIngredient(ingredient);
  };

  return (
    <Box
      key={ingredient._id}
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
      {!editing ? (
        <>
          <Box sx={{ marginBottom: "10px", fontSize: "18px" }}>Name: {ingredient.name}</Box>
          <Box sx={{ fontSize: "18px" }}>Unit: {ingredient.unit}</Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignSelf: "flex-end", position: "absolute", bottom: "20px" }}
          >
            <Box>
              <IconButton
                disabled={isDeleteIngrLoading}
                onClick={() => {
                  setEditing(true);
                }}
              >
                <EditIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Box>
            <Box>
              <IconButton aria-label="delete" onClick={handleRemove} disabled={isDeleteIngrLoading}>
                <DeleteIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <TextField
            autoFocus
            variant="outlined"
            value={values.name}
            onChange={({ target: { value } }) => setValues({ ...values, name: value })}
            sx={{ marginBottom: "15px" }}
          />
          <Select
            onChange={({ target: { value } }) => setValues({ ...values, unit: value as UnitType })}
            value={values.unit}
            sx={{ marginBottom: "15px", width: "150px" }}
          >
            <MenuItem value={UnitType.Gram}>Gram</MenuItem>
            <MenuItem value={UnitType.Milliliter}>Milliliter</MenuItem>
            <MenuItem value={UnitType.Count}>Count</MenuItem>
          </Select>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditing(false);
                setValues(ingredient);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: "30px" }}
              onClick={() => {
                setEditing(false);
                editIngredient({ ...ingredient, ...values });
              }}
            >
              Edit
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default IngredientItem;
