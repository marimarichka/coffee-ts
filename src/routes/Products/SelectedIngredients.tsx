import { Box, Checkbox, FormControlLabel, Paper } from "@mui/material";
import React from "react";
import { COLOR_PINK } from "../../config/constants";

const SelectedIngredients = () => {
  return (
    <Box sx={{ height: "200px", width: "100%", backgroundColor: "#F8F8F8", marginTop: "17px", padding: "25px" }}>
      <Box>Inventory</Box>
      <Box sx={{ display: "flex" }}>
        <Paper sx={{ height: "110px", width: "180px" }} elevation={2}>
          <Box>Inventory name</Box>
          <FormControlLabel
            // value="end"
            control={<Checkbox />}
            label="Optional"
            labelPlacement="end"
          />
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40px",
            width: "40px",
            fontSize: "20px",
            backgroundColor: COLOR_PINK,
            borderRadius: '6px'
          }}
        >
          +
        </Box>
      </Box>
    </Box>
  );
};

export default SelectedIngredients;
