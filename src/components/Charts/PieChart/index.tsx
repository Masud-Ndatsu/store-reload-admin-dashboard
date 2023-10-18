import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

interface PieChartProps {
     series: number[];
     options: {
          chart: {
               width: number;
               type: string;
          };
          labels: string[];
          responsive: {
               breakpoint: number;
               options: {
                    chart: {
                         width: number;
                    };
                    legend: {
                         position: string;
                    };
               };
          }[];
     };
}

export const PieChart: React.FC<PieChartProps> = () => {
     const [state, _setState] = useState<PieChartProps>({
          series: [44, 55, 13, 43, 22],
          options: {
               chart: {
                    width: 380,
                    type: "pie",
               },
               labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
               responsive: [
                    {
                         breakpoint: 480,
                         options: {
                              chart: {
                                   width: 200,
                              },
                              legend: {
                                   position: "bottom",
                              },
                         },
                    },
               ],
          },
     });

     return (
          <div id="chart">
               <ReactApexChart
                    options={state.options as any}
                    series={state.series}
                    type="pie"
                    width={380}
               />
          </div>
     );
};
