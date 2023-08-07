import Request from "../Request";
import "./style.css";

const RequestList = () => {
  return (
    <div>
      <table
        style={{
          height: "100%",
          width: "100%",
          marginTop: "1rem",
          textAlign: "center",
        }}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Shop name</th>
            <th>Message</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <Request />
          <Request />
          <Request />
          <Request />
          <Request />
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
