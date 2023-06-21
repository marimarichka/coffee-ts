import React, { useCallback, useInsertionEffect, useState } from "react";
import { Box, Button} from "@mui/material";
import { useGetIngredientsQuery } from "../../redux/API/API";
import { UnitType } from "../../types";
import IngredientItem from "./IngredientItem";
import NewIngredient from "./NewIngredient";
import LoadingWrapper from "../../shared/LoadingWrapper";

const Ingredients = () => {
  const { data: ingredients, isLoading } = useGetIngredientsQuery();
  const [renderNewIngredient, setRenderNewIngredient] = useState(false);
  const [values, setValues] = useState({
    name: "",
    unit: UnitType.Gram,
  });

  const resetNewIngredient = useCallback(() => {
    setRenderNewIngredient(false);
    setValues({ name: "", unit: UnitType.Gram });
  }, []);

  useInsertionEffect(() => {
    resetNewIngredient();
  }, [ingredients]);

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
        <Box sx={{ fontSize: "30px", fontWeight: "700", display: "flex", alignItems: "center" }}>Ingredients</Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "50px" }}
          onClick={() => setRenderNewIngredient(true)}
        >
          ADD INGREDIENT
        </Button>
      </Box>
      <LoadingWrapper loading={isLoading} noData={!ingredients?.length}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {ingredients?.map((ingredient) => (
            <IngredientItem ingredient={ingredient} key={ingredient._id} />
          ))}
          {renderNewIngredient && (
            <NewIngredient values={values} setValues={setValues} resetNewIngredient={resetNewIngredient} />
          )}
        </Box>
      </LoadingWrapper>
    </Box>
  );
};

export default Ingredients;
