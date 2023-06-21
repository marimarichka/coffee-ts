import React, { useCallback, useInsertionEffect, useState } from "react";
import { Box, Button} from "@mui/material";
import { useGetInventoryQuery } from "../../redux/API/API";
import InventoryItem from "./InventoryItem";
import NewInventory from "./NewInventory";
import LoadingWrapper from "../../shared/LoadingWrapper";

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
      <LoadingWrapper loading={isLoading} noData={!inventory?.length}>
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
      </LoadingWrapper>
    </Box>
  );
};

export default Inventory;
