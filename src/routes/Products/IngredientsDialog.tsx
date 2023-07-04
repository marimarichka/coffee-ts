import React, { useMemo, useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useGetIngredientsQuery } from "../../redux/API/API";
import LoadingWrapper from "../../shared/LoadingWrapper";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { addIngredient } from "../../redux/slices/productSlice";

const IngredientsDialog = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [value, setValue] = useState("");
  const { data: ingredients, isLoading } = useGetIngredientsQuery();
  const dispatch = useDispatch();
  const selectedIngredient = useAppSelector((state) => state.product.ingredient);

  const renderIngredient = useMemo(
    () =>
      ingredients?.filter((ingredientItem) => {
        const item = selectedIngredient.find(({ _id }) => _id === ingredientItem._id);

        return item ? false : ingredientItem.name.toLowerCase().includes(value.toLowerCase());
      }),
    [ingredients, selectedIngredient, value]
  );

  const onIngredientClick = (_id: string, name: string) => {
    dispatch(addIngredient({ _id, name, optional: false, value: "0" }));
    setOpen(false);
  };

  return (
    <Paper
      sx={{
        height: "430px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        padding: "25px",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ fontSize: "20px", fontWeight: "700" }}>Ingredients</Box>
        <Button variant="contained" color="primary">
          Create new
        </Button>
      </Box>
      <TextField
        variant="outlined"
        label="Filter"
        size="small"
        fullWidth
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <LoadingWrapper loading={isLoading} noData={!ingredients?.length}>
        <Box sx={{ backgroundColor: "#F8F8F8", flexGrow: 1, overflow: "auto", maxHeight: "280px" }}>
          {renderIngredient?.map((ingredient) => (
            <Paper
              key={ingredient._id}
              elevation={1}
              onClick={() => onIngredientClick(ingredient._id, ingredient.name)}
              sx={{
                backgroundColor: "#FFFFFF",
                height: "35px",
                margin: "10px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                cursor: "pointer",
              }}
            >
              {ingredient.name}
            </Paper>
          ))}
        </Box>
      </LoadingWrapper>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "75px", alignSelf: "center" }}
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
    </Paper>
  );
};

export default IngredientsDialog;
