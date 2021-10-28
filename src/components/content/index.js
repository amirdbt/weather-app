import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import moment from "moment";

export const Content = ({ data, service, title }) => {
  return (
    <>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {service}
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2, fontSize: "1.5rem" }}>
        {title}
      </Typography>
      <Card sx={{ display: "flex" }}>
        <Box component="span" sx={{ p: 4, border: "1ps solid grey" }}>
          <Typography>{data?.temperature}&deg;C</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Humidity: {`${data?.humidity + " %"}` ?? "Not Available"}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Wind: {data?.wind ?? "Not Available"}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Precipitation: {data?.precipitation ?? "Not Available"}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        {moment(data?.last_update_time).format("YYYY-MM-DD") ?? "Not Available"}
      </Typography>
    </>
  );
};
