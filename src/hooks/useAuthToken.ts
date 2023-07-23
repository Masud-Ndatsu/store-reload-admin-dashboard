import { useState, useEffect } from "react";

interface IUser {
  token: string;
  user: {
    _id: string;
    email: string;
  };
}

export const useAuthToken = (): IUser => {
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user") ?? "{}"));
  }, []);

  return user;
};
