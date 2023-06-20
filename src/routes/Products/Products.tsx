import React from "react";
import { Box, Button } from "@mui/material";
import ProductItem from "./ProductItem";
import { useGetProductsQuery } from "../../redux/API/API";
import { useNavigate } from "react-router-dom";
import LoadingWrapper from "../../shared/LoadingWrapper";

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
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "50px" }}
          onClick={() => navigate("/creatingproduct")}
        >
          CREATE NEW
        </Button>
      </Box>
      <LoadingWrapper loading={isLoading} noData={!products?.length}>
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
      </LoadingWrapper>
    </Box>
  );
};

export default Products;
