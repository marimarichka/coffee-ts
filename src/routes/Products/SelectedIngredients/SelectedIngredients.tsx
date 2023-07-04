import { Box, Button, Dialog } from "@mui/material";
import React, { useState } from "react";
import IngredientsDialog from "../IngredientsDialog";
import { useAppSelector } from "../../../redux/store";
import SelectedIngredientItem from "./SelectedIngredientItem";
import { useGetIngredientsQuery } from "../../../redux/API/API";

const SelectedIngredients = () => {
  const { data: ingredients } = useGetIngredientsQuery();
  const [open, setOpen] = useState(false);
  const selectedIngredient = useAppSelector((state) => state.product.ingredient);

  return (
    <Box
      sx={{
        height: "230px",
        maxWidth: "100%",
        backgroundColor: "#F8F8F8",
        marginTop: "17px",
        padding: "25px",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0px 6px 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ marginBottom: "20px", fontSize: "18px", fontWeight: "500" }}>Ingredients</Box>
      <Box sx={{ display: "flex", overflowX: "auto", overflowY: "hidden", paddingBottom: "10px", flexGrow: 1 }}>
        {selectedIngredient.map((ingredientItem) => (
          <SelectedIngredientItem key={ingredientItem._id} ingredientItem={ingredientItem} />
        ))}
        <Box sx={{ paddingRight: "10px", display: "flex", alignSelf: "center", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
            }}
            disabled={selectedIngredient.length === ingredients?.length}
          >
            +
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <IngredientsDialog setOpen={setOpen} />
      </Dialog>
    </Box>
  );
};

export default SelectedIngredients;
