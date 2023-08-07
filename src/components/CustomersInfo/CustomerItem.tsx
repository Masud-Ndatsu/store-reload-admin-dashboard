import React from "react";
import { ICustomer } from "./types";

interface IProps {
  customer: ICustomer;
  index: number;
}

export const CustomerItem = React.memo((props: IProps) => {
  const customer = props.customer;
  return (
    <>
      <tr style={{ cursor: "pointer", textAlign: "center" }}>
        <td>{(props.index + 1).toString().padStart(2, "0")}</td>
        <td>{`${customer.firstName ?? "John"} ${
          customer.lastName ?? "Doe"
        }`}</td>
        <td>{customer.shopAddress ?? "Just Nearby"}</td>
        <td>{customer.shopLGA ?? "Just Nearby"}</td>
        <td>{customer.phoneNumber ?? 55555555500}</td>
        <td>{customer.email ?? "johndoe@gmail.com"}</td>
      </tr>
    </>
  );
});
