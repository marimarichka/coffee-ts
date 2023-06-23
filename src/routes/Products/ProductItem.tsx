import { Box, IconButton } from "@mui/material";
import React, { FC } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IProduct } from "../../types";
import { useDeleteProductMutation, useGetInventoryQuery } from "../../redux/API/API";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProduct } from "../../redux/slices/productSlice";

interface IOneProduct {
  product: IProduct;
}

const ProductItem: FC<IOneProduct> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteProductMutation] = useDeleteProductMutation();
  const { data: inventory } = useGetInventoryQuery();

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteProductMutation(product);
  };

  const onEditButtonClick = () => {
    const newProduct = {
      _id: product._id,
      name: product.name,
      ingredient: product.ingredient.map((i) => ({ ...i, value: `${i.value}`, name: "name" })),
      inventory: product.inventory.map((i) => ({
        ...i,
        value: `${i.value}`,
        name: inventory?.find((inv) => inv._id === i._id)?.name || "",
      })),
    };
    dispatch(setProduct(newProduct));
    navigate("/editingproduct");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "50px",
        backgroundColor: "#FFFFFF",
        borderRadius: "6px",
        boxShadow: "0px 2px 6px -1px rgba(0, 0, 0, 0.25)",
        marginTop: "20px",
        paddingX: "20px",
      }}
    >
      <Box sx={{ flex: 1 }}>{product.name}</Box>
      <Box sx={{ width: "50px" }}>
        <IconButton onClick={onEditButtonClick}>
          <EditIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>
      <Box sx={{ width: "50px", display: "flex", justifyContent: "center" }}>
        <IconButton aria-label="delete" onClick={handleRemove}>
          <DeleteIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
export default ProductItem;
