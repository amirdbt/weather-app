import React, { useState, memo } from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchCitites } from "../../services/apis";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export const FormInput = memo(({ setValues }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const [city, setCity] = useState("");
  const loading = open && dataOptions.length === 0;

  useDebounce(
    () =>
      fetchCitites(city).then((res) => {
        const opts = res.data.map((e) => {
          return {
            label: `${e.name}, ${e.country}`,
            value: { lat: e.lat, lon: e.lon },
          };
        });
        setDataOptions(opts);
      }),
    1000,
    [city]
  );
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={classes.root}
    >
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Enter location (town/city) for the weather forecast
      </Typography>

      <Autocomplete
        onChange={(event, newValue) => {
          setValues(newValue);
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        onInputChange={(event, newInputValue) => {
          setCity(newInputValue);
        }}
        id="controllable-states-demo"
        options={dataOptions}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City,Town"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
});
