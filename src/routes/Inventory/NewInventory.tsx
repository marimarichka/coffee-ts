import { Box, Button, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { IInventoryInput } from "../../types";
import { useAddInventoryMutation } from "../../redux/API/API";

interface INewInventoryProps {
  values: IInventoryInput;
  setValues: React.Dispatch<React.SetStateAction<IInventoryInput>>;
  resetNewInventory: () => void;
}

const NewInventory = ({ values, setValues, resetNewInventory }: INewInventoryProps) => {
  const [addInventoryMutation, { isLoading: isAddLoading }] = useAddInventoryMutation();

  const addInventory = useCallback(() => {
    addInventoryMutation(values);
  }, [values]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "200px",
        width: "280px",
        backgroundColor: "#FFFFFF",
        borderRadius: "6px",
        boxShadow: "0px 2px 6px -1px rgba(0, 0, 0, 0.25)",
        marginX: "14px",
        marginY: "20px",
        padding: "20px",
        position: "relative",
      }}
    >
      <Box sx={{ marginBottom: "10px", fontSize: "18px" }}>Ingredient</Box>
      <TextField
        autoFocus
        label="Name"
        variant="outlined"
        value={values.name}
        onChange={({ target: { value } }) => setValues({ ...values, name: value })}
        sx={{ marginBottom: "15px" }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Button variant="contained" color="primary" disabled={isAddLoading} onClick={resetNewInventory}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "30px" }}
          onClick={addInventory}
          disabled={isAddLoading}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(NewInventory);
