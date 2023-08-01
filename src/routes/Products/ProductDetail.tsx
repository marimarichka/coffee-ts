import React, { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { resetProduct, setName } from "../../redux/slices/productSlice";
import SelectedInventory from "./SelectedInventory";
import { useAddProductMutation, useEditProductMutation } from "../../redux/API/API";
import { useNavigate } from "react-router-dom";
import SelectedIngredients from "./SelectedIngredients/SelectedIngredients";

const ProductDetail = () => {
  const [addProductMutation, { isLoading: isAddProductLoading }] = useAddProductMutation();
  const [editProductMutation, { isLoading: isEditProductLoading }] = useEditProductMutation();
  const navigate = useNavigate();
  const product = useAppSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetProduct());
    };
  }, []);

  const isEditing = !!product._id;

  const addProduct = async () => {
    const newProduct = {
      name: product.name,
      inventories: product.inventories.map((i) => ({ ...i, value: parseInt(i.value) })),
      ingredients: product.ingredients.map((i) => ({...i, value: parseInt(i.value)})),
    };
    await addProductMutation(newProduct);
    navigate("/products");
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setName(e.target.value));
  };

  const onEdit = async () => {
    await editProductMutation({
      ...product,
      ingredients: product.ingredients.map((i) => ({ ...i, value: parseInt(i.value) })),
      inventories: product.inventories.map((i) => ({ ...i, value: parseInt(i.value) })),
    });
    navigate("/products");
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
        <Box sx={{ fontSize: "30px", fontWeight: "700", display: "flex", alignItems: "center" }}>
          {isEditing ? `Editing Product` : `Creating product`}
        </Box>
        <Box>
          {isEditing && (
            <Button
              variant="contained"
              color="primary"
              disabled={isEditProductLoading}
              onClick={() => navigate("/products")}
              sx={{ height: "50px", marginRight: "15px" }}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={isEditing ? onEdit : addProduct}
            sx={{ height: "50px" }}
            disabled={!product.name || isAddProductLoading || isEditProductLoading}
          >
            Save
          </Button>
        </Box>
      </Box>
      <TextField variant="outlined" label="Name" onChange={onNameChange} value={product.name} sx={{ width: "250px" }} />
      <SelectedInventory />
      <SelectedIngredients />
    </Box>
  );
};

export default React.memo(ProductDetail);
