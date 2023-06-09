import { Box, Button, CircularProgress } from "@mui/material";
import React, { useCallback, useInsertionEffect, useState } from "react";
import { useGetInventoryQuery } from "../../redux/API/API";
import InventoryItem from "./InventoryItem";
import NewInventory from "./NewInventory";

const Inventory = () => {
  const { data: inventory, isLoading } = useGetInventoryQuery();
  const [renderNewInventory, setRenderNewInventory] = useState(false);
  const [values, setValues] = useState({
    name: "",
  });

  const resetNewInventory = useCallback(() => {
    setRenderNewInventory(false);
    setValues({ name: "" });
  }, []);

  useInsertionEffect(() => {
    resetNewInventory();
  }, [inventory]);

  return (
    <Box sx={{ padding: "30px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ fontSize: "30px", fontWeight: "700", display: "flex", alignItems: "center" }}>Inventory</Box>
        <Button variant="contained" color="primary" sx={{ height: "50px" }} onClick={() => setRenderNewInventory(true)}>
          ADD INVENTORY
        </Button>
      </Box>
      {isLoading ? (
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {inventory?.map((inventoryItem) => (
            <InventoryItem inventory={inventoryItem} key={inventoryItem._id} />
          ))}
          {renderNewInventory && (
            <NewInventory values={values} setValues={setValues} resetNewInventory={resetNewInventory} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Inventory;
