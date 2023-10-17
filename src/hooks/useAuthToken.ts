export const useAuthToken = () => {
     const token = window.localStorage.getItem("token") as string;
     if (window.localStorage.getItem("token")) {
          return { token };
     }
     return { token: null };
};
