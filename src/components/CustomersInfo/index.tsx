import { useState, useEffect, useCallback } from "react";
import { api } from "../../api/request";
import { ICustomer } from "./types";
import { useAuthToken } from "../../hooks/useAuthToken";
import { Customers } from "./Customers";

export const CustomersInfo = () => {
  const user = useAuthToken();
  const [loading, setLoading] = useState<boolean>(true);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const fetcData = useCallback(async () => {
    if (!user?.token) return;
    const { token } = user;
    try {
      setLoading(false);
      const result = await api().get(
        "https://store-reload.onrender.com/api/v1/admin/user/getMany",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(result?.data.status);
      setCustomers(result?.data.data.users);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("ERROR: ", error?.response?.data);
    }
  }, [user]);

  useEffect(() => {
    fetcData();
  }, [fetcData]);

  return (
    <div>
      <Customers customers={customers} loading={loading} />
    </div>
  );
};
