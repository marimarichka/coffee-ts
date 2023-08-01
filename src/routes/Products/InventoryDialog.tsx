import React, { useMemo, useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useGetInventoryQuery } from "../../redux/API/API";
import { useDispatch } from "react-redux";
import { addInventory } from "../../redux/slices/productSlice";
import { useAppSelector } from "../../redux/store";
import LoadingWrapper from "../../shared/LoadingWrapper";

const InventoryDialog = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [value, setValue] = useState("");
  const { data: inventory, isLoading } = useGetInventoryQuery();
  const dispatch = useDispatch();
  const selectedInventory = useAppSelector((state) => state.product.inventories);

  const renderInventory = useMemo(
    () =>
      inventory?.filter((inventoryItem) => {
        const item = selectedInventory.find(({ _id }) => _id === inventoryItem._id);

        return item ? false : inventoryItem.name.toLowerCase().includes(value.toLowerCase());
      }),
    [inventory, selectedInventory, value]
  );

  const onInventoryClick = (_id: string, name: string) => {
    dispatch(addInventory({ _id, name, optional: false, value: "0" }));
    setOpen(false);
  };

  return (
    <Paper
      sx={{
        height: "430px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        padding: "25px",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ fontSize: "20px", fontWeight: "700" }}>Inventory</Box>
        <Button variant="contained" color="primary">
          Create new
        </Button>
      </Box>
      <TextField
        variant="outlined"
        label="Filter"
        size="small"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        fullWidth
      />
      <LoadingWrapper loading={isLoading} noData={!inventory?.length}>
        <Box sx={{ backgroundColor: "#F8F8F8", flexGrow: 1, overflow: "auto", maxHeight: "280px" }}>
          {renderInventory?.map((inventoryItem) => (
            <Paper
              onClick={() => onInventoryClick(inventoryItem._id, inventoryItem.name)}
              key={inventoryItem._id}
              elevation={1}
              sx={{
                backgroundColor: "#FFFFFF",
                height: "35px",
                margin: "10px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                cursor: "pointer",
              }}
            >
              {inventoryItem.name}
            </Paper>
          ))}
        </Box>
      </LoadingWrapper>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "75px", alignSelf: "center" }}
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
    </Paper>
  );
};

export default InventoryDialog;
