import React, { ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";

interface ILoadingWrapperProps {
  loading: boolean;
  children: ReactNode;
  noData: boolean;
}

const LoadingWrapper = ({ loading, children, noData }: ILoadingWrapperProps) => {
  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (noData) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "500",
          fontSize: "20px",
        }}
      >
        No data
      </Box>
    );
  }
  return <>{children}</>;
};

export default LoadingWrapper;
