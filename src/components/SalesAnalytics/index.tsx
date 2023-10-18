import { AreaChart } from "../Charts/AreaChart";
import { BarChart } from "../Charts/BarChart";
import { PieChart } from "../Charts/PieChart";
import "./style.css";

export const SalesAnalytics = () => {
     return (
          <div className="analytics-wrapper">
               <h2>Analytics</h2>

               <article
                    className="header"
                    style={{ display: "flex", justifyContent: "space-between" }}
               >
                    <div className="card">
                         <div>
                              <p>Customers</p>
                              <button>See list</button>
                         </div>
                         <h1>100</h1>
                    </div>
                    <div className="card">
                         <div>
                              <p>Products sold</p>
                              <small>In January</small>
                         </div>
                         <h1>1M</h1>
                    </div>
                    <div className="card">
                         <div>
                              <p>App Download</p>
                              <small>Total</small>
                         </div>
                         <h1>10K</h1>
                    </div>
               </article>
               <article className="content-grid">
                    <div className="chart">
                         <h3>Daily sales</h3>
                         <AreaChart />
                    </div>
                    <div className="chart">
                         <h3>Previous monthly sales</h3>
                         <PieChart
                              series={[]}
                              options={{
                                   chart: {
                                        width: 0,
                                        type: "pie",
                                   },
                                   labels: [],
                                   responsive: [],
                              }}
                         />
                    </div>
                    <div className="chart">
                         <h3>App usage trafic</h3>
                         <AreaChart />
                    </div>
                    <div className="chart">
                         <h3>App download trafic</h3>
                         <BarChart />
                    </div>
               </article>
          </div>
     );
};
