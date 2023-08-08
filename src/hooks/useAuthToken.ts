import { useState, useEffect, useMemo } from "react";

interface IUser {
  token: string;
  user: {
    _id: string;
    email: string;
  };
}

export const useAuthToken = () => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user") as string));
  }, []);

  return user;
};
