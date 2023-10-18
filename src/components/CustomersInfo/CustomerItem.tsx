import React from "react";

interface IProps {
     customer: any;
     index: number;
}

export const CustomerItem = React.memo((props: IProps) => {
     const customer = props.customer;
     return (
          <>
               <tr style={{ cursor: "pointer", textAlign: "center" }}>
                    <td>{(props.index + 1).toString().padStart(2, "0")}</td>
                    <td>{`${customer.first_name ?? "John"} ${
                         customer.last_ame ?? "Doe"
                    }`}</td>
                    <td>{customer?.shop.address ?? "Just Nearby"}</td>
                    <td>{customer?.shop.LGA ?? "Just Nearby"}</td>
                    <td>{customer.phone_number ?? 55555555500}</td>
                    <td>{customer.email ?? "johndoe@gmail.com"}</td>
               </tr>
          </>
     );
});
