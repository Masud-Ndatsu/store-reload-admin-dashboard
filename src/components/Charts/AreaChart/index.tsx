import React from "react";
import ReactApexChart from "react-apexcharts";

export const AreaChart: React.FC = () => {
     const state = {
          series: [
               {
                    name: "STOCK ABC",
                    data: [30, 40, 35, 125, 49, 60, 125],
               },
          ],
          options: {
               chart: {
                    type: "area",
                    height: 350,
                    zoom: {
                         enabled: false,
                    },
               },
               dataLabels: {
                    enabled: false,
               },
               stroke: {
                    curve: "straight",
               },
               title: {
                    text: "Fundamental Analysis of Stocks",
                    align: "left",
               },
               subtitle: {
                    text: "Price Movements",
                    align: "left",
               },
               labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
               xaxis: {
                    type: "day",
               },
               yaxis: {
                    opposite: true,
               },
               legend: {
                    horizontalAlign: "left",
               },
          },
     };

     return (
          <div id="chart">
               <ReactApexChart
                    options={state.options as any}
                    series={state.series}
                    type="area"
                    height={350}
                    width={"100%"}
               />
          </div>
     );
};

export default AreaChart;
