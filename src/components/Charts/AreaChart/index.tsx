// import React from "react";
// import ReactApexChart from "react-apexcharts";
// import { series } from "./your-series-data"; // Import your series data

// export const AreaChart: React.FC = () => {
//      const state = {
//           series: [
//                {
//                     name: "STOCK ABC",
//                     data: series.monthDataSeries1.prices,
//                },
//           ],
//           options: {
//                chart: {
//                     type: "area",
//                     height: 350,
//                     zoom: {
//                          enabled: false,
//                     },
//                },
//                dataLabels: {
//                     enabled: false,
//                },
//                stroke: {
//                     curve: "straight",
//                },
//                title: {
//                     text: "Fundamental Analysis of Stocks",
//                     align: "left",
//                },
//                subtitle: {
//                     text: "Price Movements",
//                     align: "left",
//                },
//                labels: series.monthDataSeries1.dates,
//                xaxis: {
//                     type: "datetime",
//                },
//                yaxis: {
//                     opposite: true,
//                },
//                legend: {
//                     horizontalAlign: "left",
//                },
//           },
//      };

//      return (
//           <div id="chart">
//                <ReactApexChart
//                     options={state.options as any}
//                     series={state.series}
//                     type="area"
//                     height={350}
//                />
//           </div>
//      );
// };

// export default ApexChart;
