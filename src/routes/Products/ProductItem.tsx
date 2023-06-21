import { Box, IconButton } from "@mui/material";
import React, { FC } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IProduct } from "../../types";
import { useDeleteProductMutation } from "../../redux/API/API";

interface IOneProduct {
  product: IProduct;
}

const ProductItem: FC<IOneProduct> = ({ product }) => {
  const [deleteProductMutation] = useDeleteProductMutation();

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteProductMutation(product);
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
        <IconButton>
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
