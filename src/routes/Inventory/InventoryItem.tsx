import { Alert, Box, Button, IconButton, Snackbar, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useDeleteInventoryMutation, useEditInventoryMutation } from "../../redux/API/API";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ErrorKeysEnum, IChangeItemError, IInventory } from "../../types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

interface IOneInventory {
  inventory: IInventory;
}

const normalizedError = (error?: FetchBaseQueryError | SerializedError): IChangeItemError | undefined => {
  if (error && "data" in error && error.data && typeof error.data === "object" && "errorKey" in error.data) {
    const { errorKey } = error.data as IChangeItemError;
    if (errorKey === ErrorKeysEnum.InventoryIsUsedInProduct) {
      return error.data as IChangeItemError;
    }
  }
};

const InventoryItem: FC<IOneInventory> = ({ inventory }) => {
  const [editing, setEditing] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>();
  const [deleteInventory, { isLoading: isDeleteLoading, error: deleteError, reset: deleteReset }] =
    useDeleteInventoryMutation();
  const [editInventory, { isLoading: isEditLoading, error: editError, reset: editReset }] = useEditInventoryMutation();
  const [values, setValues] = useState({
    name: inventory?.name,
  });

  const deleteErrorData = normalizedError(deleteError);
  const editErrorData = normalizedError(editError);

  useEffect(() => {
    if (deleteErrorData)
      setAlertText(
        `You can't delete ${
          inventory.name
        } cause it is used in 1 or a few products: ${deleteErrorData?.dependentProducts.map((p) => p.name).join(", ")}`
      );
    if (editErrorData)
      setAlertText(
        `You can't edit ${inventory.name} cause it is used in 1 or a few products: ${editErrorData?.dependentProducts
          .map((p) => p.name)
          .join(", ")}`
      );
  }, [deleteErrorData, editErrorData]);

  const handleRemove = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await deleteInventory(inventory);
    deleteReset();
  };

  const onCancel = () => {
    setEditing(false);
    setValues(inventory);
  };

  const onEdit = async () => {
    await editInventory({ ...inventory, ...values });
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
      <Box sx={{ marginBottom: "10px", fontSize: "18px" }}>Inventory</Box>
      {editing ? (
        <>
          <TextField
            autoFocus
            label="Name"
            variant="outlined"
            value={values.name}
            onChange={({ target: { value } }) => setValues({ ...values, name: value })}
            sx={{ marginBottom: "15px" }}
          />
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
          <Box sx={{ marginBottom: "10px", fontSize: "18px" }}>Name: {inventory.name}</Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignSelf: "flex-end", position: "absolute", bottom: "20px" }}
          >
            <IconButton disabled={isDeleteLoading} onClick={() => {
              setEditing(true)
              setValues(inventory)
              }}>
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

export default React.memo(InventoryItem);
