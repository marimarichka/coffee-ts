import React, { useCallback } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { resetProduct, setName } from "../../redux/slices/productSlice";
import SelectedInventory from "./SelectedInventory";
import { useAddProductMutation } from "../../redux/API/API";
import { useNavigate } from "react-router-dom";

const CreatingProduct = () => {
  const [addProductMutation, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();
  const product = useAppSelector((state) => state.product);
  const dispatch = useDispatch();

  const addProduct = useCallback(async () => {
    const newProduct = {
      name: product.name,
      inventory: product.inventory.map((i) => ({ ...i, value: parseInt(i.value) })),
      ingredient: [],
    };
    await addProductMutation(newProduct);
    navigate("/products");
    dispatch(resetProduct());
  }, [product]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setName(e.target.value));
  };

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
        <Box sx={{ fontSize: "30px", fontWeight: "700", display: "flex", alignItems: "center" }}>Creating Product</Box>
        <Button
          variant="contained"
          color="primary"
          onClick={addProduct}
          sx={{ height: "50px" }}
          disabled={!product.name || isLoading}
        >
          Save
        </Button>
      </Box>
      <TextField variant="outlined" onChange={onNameChange} value={product.name} sx={{ width: "250px" }} />
      <SelectedInventory />
    </Box>
  );
};

export default CreatingProduct;
