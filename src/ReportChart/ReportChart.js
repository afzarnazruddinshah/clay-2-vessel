import React, { Fragment } from "react";
import Chart from "react-google-charts";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import "./reportChart.css";
const ReportChart = () => {
  const pieOptions = {
    pieHole: 0.5,
    slices: [
      {
        color: "#2BB673",
      },
      {
        color: "#d91e48",
      },
      {
        color: "#007fad",
      },
      {
        color: "#e9a227",
      },
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 14,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      // left: 30,
      top: 30,
      width: "50%",
      height: "50%",
    },
    fontName: "Roboto",
  };

  const data = JSON.parse(localStorage.getItem("reports_data"));
  return (
    <Fragment>
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <p>
          <Grid item justify="center" alignContent="center" alignItems="center">
            <Link to="/dashboard">
              <Button color="secondary" variant="contained">
                <HomeIcon />
                &nbsp;{" Go To Dashboard"}
              </Button>

            </Link>
          </Grid>
        </p>
        <div>
          <p>&nbsp;</p>
        </div>
        <Grid item>
          <Chart
            chartType="PieChart"
            data={[
              ["Sales", "Recommenders"],
              ["Relatives", data.relatives],
              ["Friends", data.friends],
              ["Dealers", data.dealers],
              ["Neighbours", data.neighbours],
              ["Customers", data.customers],
              ["JustDial", data.justDial],
              ["Google", data.google],
              ["Others", data.others],
            ]}
            options={pieOptions}
            graph_id="PieChart"
            width={"100%"}
            height={"400px"}
            legend_toggle
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ReportChart;
