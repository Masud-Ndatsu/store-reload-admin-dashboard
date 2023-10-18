import { useCallback, useEffect, useState } from "react";
import { USER_URL } from "../constants";
import { api } from "../api/request";
import { useAuthToken } from "./useAuthToken";

export const useAvatar = () => {
     const { token } = useAuthToken();
     const [avatar, setAvatar] = useState<string>("");

     const getAvatar = useCallback(
          async function () {
               if (!token) return;
               try {
                    const res = await api().get(`${USER_URL}/avatar`, {
                         headers: { Authorization: "Bearer " + token },
                    });
                    setAvatar(res.data.data);
               } catch (error: any) {
                    console.log({ error });
               }
          },
          [token]
     );

     useEffect(() => {
          getAvatar();
     }, [getAvatar]);
     return { avatar };
};
