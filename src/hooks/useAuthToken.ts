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

  const token = useMemo(() => {
    if (!user?.token) return "";
    return user.token;
  }, [user]);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user") ?? "{}"));
  }, []);

  return { user, token };
};
