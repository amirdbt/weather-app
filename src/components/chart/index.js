import { Typography } from "@mui/material";
import React from "react";
import { Bar } from "react-chartjs-2";

export const WeatherChart = ({ dataBar }) => {
  return (
    <div>
      <Typography variant="body2" sx={{ marginBottom: "15px" }}>
        7 day forecast data
      </Typography>
      <Bar data={dataBar} width={100} height={50} />
    </div>
  );
};
