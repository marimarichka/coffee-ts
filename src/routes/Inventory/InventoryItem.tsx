import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { useDeleteInventoryMutation, useEditInventoryMutation } from "../../redux/API/API";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IInventory } from "../../types";

interface IOneInventory {
  inventory: IInventory;
}

const InventoryItem: FC<IOneInventory> = ({ inventory }) => {
  const [editing, setEditing] = useState(false);
  const [deleteInventory, { isLoading: isDeleteInventoryLoading }] = useDeleteInventoryMutation();
  const [editInventory, { isLoading: isEditInventoryLoading }] = useEditInventoryMutation();
  const [values, setValues] = useState({
    name: inventory?.name,
  });

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteInventory(inventory);
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
            variant="outlined"
            value={values.name}
            onChange={({ target: { value } }) => setValues({ ...values, name: value })}
            sx={{ marginBottom: "15px" }}
          />
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              disabled={isEditInventoryLoading}
              onClick={() => {
                setEditing(false);
                setValues(inventory);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isEditInventoryLoading}
              sx={{ marginLeft: "30px" }}
              onClick={async () => {
                await editInventory({ ...inventory, ...values });
                setEditing(false);
              }}
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
            <IconButton disabled={isDeleteInventoryLoading} onClick={() => setEditing(true)}>
              <EditIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleRemove} disabled={isDeleteInventoryLoading}>
              <DeleteIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default React.memo(InventoryItem);
