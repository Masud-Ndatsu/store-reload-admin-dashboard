import { useCallback, useEffect, useState } from "react";
import { useAuthToken } from "./useAuthToken";
import { USER_URL } from "../constants";
import { api } from "../api/request";

export const useCustomers = () => {
     const { token } = useAuthToken();
     const [loading, setLoading] = useState<boolean>(true);

     const [customers, setCustomers] = useState<any[]>([]);

     const fetchData = useCallback(async () => {
          try {
               setLoading(false);
               const result = await api().get(USER_URL + "/", {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });
               setLoading(true);

               setCustomers(result.data.data);
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
               setLoading(false);
               console.error("ERROR: ", error?.data);
          }
     }, [token]);

     useEffect(() => {
          fetchData();
     }, [fetchData]);
     return { loading, customers };
};
