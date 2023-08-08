import "./style.css";

export const SalesAnalytics = () => {
  return (
    <div className="analytics-wrapper">
      <h2>Analytics</h2>

      <article
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}>
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
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        <div>Four</div>
      </article>
    </div>
  );
};
