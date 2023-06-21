import { Box, Button, Checkbox, Dialog, FormControlLabel, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import InventoryDialog from "./InventoryDialog";
import { useAppSelector } from "../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteInventory, updateInventory } from "../../redux/slices/productSlice";
import { useGetInventoryQuery } from "../../redux/API/API";

const SelectedInventory = () => {
  const { data: inventory } = useGetInventoryQuery();
  const selectedInventory = useAppSelector((state) => state.product.inventory);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const onOptionalChange = (_id: string, optional: boolean) => {
    dispatch(updateInventory({ _id, newValues: { optional } }));
  };

  const onCountChange = (_id: string, value: string) => {
    dispatch(updateInventory({ _id, newValues: { value } }));
  };

  const onDelete = (_id: string) => dispatch(deleteInventory(_id));

  return (
    <Box
      sx={{
        height: "230px",
        maxWidth: "100%",
        backgroundColor: "#F8F8F8",
        marginTop: "17px",
        padding: "25px",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0px 6px 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ marginBottom: "20px", fontSize: "18px", fontWeight: "500" }}>Inventory</Box>
      <Box sx={{ display: "flex", overflowX: "auto", overflowY: "hidden", paddingBottom: "10px", flexGrow: 1 }}>
        {selectedInventory.map((inventoryItem) => (
          <Paper
            key={inventoryItem._id}
            sx={{
              height: "140px",
              minWidth: "180px",
              marginRight: "30px",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            elevation={2}
          >
            <Box sx={{ marginBottom: "10px" }}>{inventoryItem.name}</Box>
            <TextField
              type="number"
              label="Count"
              variant="outlined"
              size="small"
              value={inventoryItem.value}
              onChange={(e) => onCountChange(inventoryItem._id, e.target.value)}
            ></TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={inventoryItem.optional}
                  onChange={(e) => onOptionalChange(inventoryItem._id, e.target.checked)}
                />
              }
              label="Optional"
              labelPlacement="end"
            />
            <IconButton
              onClick={() => onDelete(inventoryItem._id)}
              aria-label="delete"
              sx={{ width: "35px", height: "35px", alignSelf: "flex-end" }}
            >
              <DeleteIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          </Paper>
        ))}
        <Box sx={{ paddingRight: "10px", display: "flex", alignSelf: "center", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            disabled={selectedInventory.length === inventory?.length}
            sx={{
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
            }}
          >
            +
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <InventoryDialog setOpen={setOpen} />
      </Dialog>
    </Box>
  );
};

export default SelectedInventory;
