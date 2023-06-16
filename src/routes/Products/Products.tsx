import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import ProductItem from "./ProductItem";
import { useGetProductsQuery } from "../../redux/API/API";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProductsQuery();

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
        <Box sx={{ fontSize: "30px", fontWeight: "700", display: "flex", alignItems: "center" }}>Products</Box>
        <Button variant="contained" color="primary" sx={{ height: "50px" }} onClick={() => navigate('/creatingproduct')}>
          CREATE NEW
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
            flexDirection: "column",
            width: "100%",
          }}
        >
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Products;
