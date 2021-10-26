import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export const Title = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Weather App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
