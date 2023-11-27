import { Customers } from "./Customers";
import { useCustomers } from "../../hooks/useCustomers";

export const CustomersInfo = () => {
     const { loading, customers } = useCustomers();

     return (
          <div>
               <Customers customers={customers} loading={loading} />
          </div>
     );
};
