import { Alert, Box, Button, IconButton, MenuItem, Snackbar, TextField } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { useDeleteIngredientMutation, useEditIngredientMutation } from "../../redux/API/API";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ErrorKeysEnum, IChangeItemError, IIngredient, UnitType } from "../../types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

interface IOneIngredient {
  ingredient: IIngredient;
}

const normalizedError = (error?: FetchBaseQueryError | SerializedError): IChangeItemError | undefined => {
  if (error && "data" in error && error.data && typeof error.data === "object" && "errorKey" in error.data) {
    const { errorKey } = error.data as IChangeItemError;
    if (errorKey === ErrorKeysEnum.IngredientIsUsedInProduct) {
      return error.data as IChangeItemError;
    }
  }
};

const IngredientItem: FC<IOneIngredient> = ({ ingredient }) => {
  const [editing, setEditing] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>();
  const [deleteIngredient, { isLoading: isDeleteLoading, error: deleteError, reset: deleteReset }] =
    useDeleteIngredientMutation();
  const [editIngredient, { isLoading: isEditLoading, error: editError, reset: editReset }] =
    useEditIngredientMutation();
  const [values, setValues] = useState({
    name: ingredient?.name,
    unit: ingredient?.unit,
  });

  const deleteErrorData = normalizedError(deleteError);
  const editErrorData = normalizedError(editError);

  useEffect(() => {
    if (deleteErrorData)
      setAlertText(
        `You can't delete ${
          ingredient.name
        } cause it is used in 1 or a few products: ${deleteErrorData?.dependentProducts.map((p) => p.name).join(", ")}`
      );
    if (editErrorData)
      setAlertText(
        `You can't edit ${ingredient.name} cause it is used in 1 or a few products: ${editErrorData?.dependentProducts
          .map((p) => p.name)
          .join(", ")}`
      );
  }, [deleteErrorData, editErrorData]);

  const handleRemove = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await deleteIngredient(ingredient);
    deleteReset();
  };

  const onCancel = () => {
    setEditing(false);
    setValues(ingredient);
  };

  const onEdit = async () => {
    await editIngredient({ ...ingredient, ...values });
    setEditing(false);
    editReset();
  };

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
      {editing ? (
        <>
          <TextField
            autoFocus
            variant="outlined"
            label="Name"
            value={values.name}
            onChange={({ target: { value } }) => setValues({ ...values, name: value })}
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            onChange={({ target: { value } }) => setValues({ ...values, unit: value as UnitType })}
            value={values.unit}
            select
            sx={{ marginBottom: "15px", width: "150px" }}
            label="Unit"
          >
            <MenuItem value={UnitType.Gram}>Gram</MenuItem>
            <MenuItem value={UnitType.Milliliter}>Milliliter</MenuItem>
            <MenuItem value={UnitType.Count}>Count</MenuItem>
          </TextField>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <Button variant="contained" color="primary" disabled={isEditLoading} onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isEditLoading}
              sx={{ marginLeft: "30px" }}
              onClick={onEdit}
            >
              Edit
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ marginBottom: "10px", fontSize: "18px" }}>Name: {ingredient.name}</Box>
          <Box sx={{ fontSize: "18px" }}>Unit: {ingredient.unit}</Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignSelf: "flex-end", position: "absolute", bottom: "20px" }}
          >
            <IconButton
              disabled={isDeleteLoading}
              onClick={() => {
                setEditing(true);
                setValues(ingredient);
              }}
            >
              <EditIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleRemove} disabled={isDeleteLoading}>
              <DeleteIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Box>
        </>
      )}
      <Snackbar open={!!alertText} autoHideDuration={6000} onClose={() => setAlertText(undefined)}>
        <Alert onClose={() => setAlertText(undefined)} severity="error" sx={{ width: "100%" }}>
          {alertText}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(IngredientItem);
