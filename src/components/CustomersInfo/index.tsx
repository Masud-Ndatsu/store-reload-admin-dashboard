import { useState, useEffect, useCallback } from "react";
import { api } from "../../api/request";
import { ICustomer } from "./types";
import { useAuthToken } from "../../hooks/useAuthToken";
import { Customers } from "./Customers";
import { USER_URL } from "../../constants";

export const CustomersInfo = () => {
  const { token } = useAuthToken();
  const [loading, setLoading] = useState<boolean>(true);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const fetcData = useCallback(async () => {
    try {
      setLoading(false);
      const result = await api().get(USER_URL + "/getMany", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(result?.data.status);
      setCustomers(result?.data.data.users);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      console.error("ERROR: ", error?.data);
    }
  }, [token]);

  useEffect(() => {
    fetcData();
  }, [fetcData]);

  return (
    <div>
      <Customers customers={customers} loading={loading} />
    </div>
  );
};
