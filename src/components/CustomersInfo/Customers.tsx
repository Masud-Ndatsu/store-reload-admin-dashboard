import Loading from "../Loading";
import { CustomerList } from "./CustomerList";
import { ICustomer } from "./types";

interface IProps {
  customers: ICustomer[];
  loading: boolean;
}

export const Customers = (props: IProps) => {
  const customers = props.customers;
  return (
    <div>
      <h2>Customers Information</h2>
      {!props.loading ? <Loading /> : <CustomerList customers={customers} />}
    </div>
  );
};
