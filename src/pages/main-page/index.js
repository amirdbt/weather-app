import React, { useState, useCallback, lazy, Suspense } from "react";
import { Title } from "../../components/title";
import { makeStyles } from "@mui/styles";
import { CircularProgress, Grid } from "@mui/material";
import { useQuery } from "react-query";
import { fetchData } from "../../services/apis";

const Content = lazy(() => import("../../components/content"));
const WeatherChart = lazy(() => import("../../components/chart"));
const FormInput = lazy(() => import("../../components/form"));

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
    flexDirection: "column",
    margin: "2em 5em",
  },
});

//default data
const defaultState = {
  lon: 7.48976,
  lat: 9.05735,
};

export const MainPage = () => {
  const classes = useStyles();
  const [values, setValues] = useState(defaultState);
  const [title, setTile] = useState("Kano, NG");

  //urls
  const URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${values?.lat}&lon=${values?.lon}&appid=${process.env.REACT_APP_APIKEY}`;
  const URL1 = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${values?.lat}&lon=${values?.lon}`;

  const data = useQuery(["data", URL1], () => fetchData(URL1), {
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const data2 = useQuery(["data2", URL2], () => fetchData(URL2), {
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // formatting fetched data
  let newData1 = {
    last_update_time: data?.data?.data?.properties?.meta?.updated_at,
    temperature:
      data?.data?.data?.properties?.timeseries[0]?.data?.instant?.details
        ?.air_temperature,
    wind: data?.data?.data?.properties?.timeseries[0]?.data?.instant?.details
      ?.wind_speed,
    precipitation:
      data?.data?.data?.properties?.timeseries[0]?.data?.instant?.details
        ?.precipitation_amount,
    humidity:
      data?.data?.data?.properties?.timeseries[0]?.data?.instant?.details
        ?.relative_humidity,
  };

  let newData2 = {
    last_update_time: data2?.data?.data?.list[0]?.dt_txt,
    temperature: data2?.data?.data?.list[0]?.main?.temp,
    wind: data2?.data?.data?.list[0]?.wind?.speed,
    precipitation: data2?.data?.data?.list[0]?.pop,
    humidity: data2?.data?.data?.list[0]?.main?.humidity,
  };

  //Chart Data
  let chartData1 = data?.data?.data?.properties?.timeseries
    .slice(0, 7)
    .map((d) => d.data.instant.details.wind_speed);
  let chartData2 = data2?.data?.data?.list.slice(0, 7).map((d) => d.wind.speed);

  const dataBar = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Wind Speed (Met API)",
        backgroundColor: "#EC932F",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: chartData1,
      },
      {
        label: "Wind Speed (Open Weather API)",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: chartData2,
      },
    ],
  };

  //set value that will be passed to apis.
  const handleValueChange = useCallback((val) => {
    setTile(val?.label);
    setValues(val?.value);
  }, []);

  return (
    <>
      <Title />
      <main className={classes.content}>
        <Suspense fallback={<CircularProgress sx={{ marginLeft: "50%" }} />}>
          <FormInput setValues={handleValueChange} />
          <Grid container spacing={2} sx={{ marginTop: "15px" }}>
            <Grid item sx={12} md={6}>
              <Content service="Met API" title={title} data={newData1} />
            </Grid>
            <Grid item sx={12} md={6}>
              <Content
                data={newData2}
                service="Open Weather API"
                title={title}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "50px" }}>
            <Grid item sx={12} md={12}>
              <WeatherChart dataBar={dataBar} />
            </Grid>
          </Grid>
        </Suspense>
      </main>
    </>
  );
};
