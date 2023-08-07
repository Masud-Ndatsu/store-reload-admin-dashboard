import { CustomerItem } from "./CustomerItem";
import { ICustomer } from "./types";

interface IProps {
  customers: ICustomer[];
}
export const CustomerList = (props: IProps) => {
  const customers = props.customers;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        marginTop: "1rem",
        textAlign: "center",
      }}>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Customer Name</th>
            <th>Shop Address</th>
            <th>Shop L.G.A</th>
            <th>Mobile Number</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <CustomerItem
              key={customer._id}
              customer={customer}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
