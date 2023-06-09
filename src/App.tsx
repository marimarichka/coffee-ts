import Box from "@mui/material/Box";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Ingredients from "./routes/Ingredients/Ingredients";
import Inventory from "./routes/Inventory/Inventory";
import Products from "./routes/Products/Products";
import ProductDetail from "./routes/Products/ProductDetail";

function App() {
  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "calc(100vh - 80px)",
            overflow: "auto",
            flexGrow: 1,
          }}
        >
          <Routes>
            <Route path="/" element={<Ingredients />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="products" element={<Products />} />
            <Route path="creatingproduct" element={<ProductDetail />} />
            <Route path="editingproduct" element={<ProductDetail />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
