import {
     createContext,
     useCallback,
     useContext,
     useEffect,
     useState,
} from "react";
import { useAuthToken } from "../hooks/useAuthToken";
import { api } from "../api/request";
import { USER_URL } from "../constants";

interface IContext {
     user: any;
     getUser: () => Promise<void>;
}

interface IProfileProvider {
     children: React.ReactNode;
}

const ProfileContext = createContext<IContext>({
     user: "http://res.cloudinary.com/masudnda/image/upload/v1692392737/storereload/gsdryxexmtzgr0ioe9nx.png",
     getUser: async () => {},
});

export const ProfileProvider = ({ children }: IProfileProvider) => {
     const { token } = useAuthToken();
     const [user, setUser] = useState<string>("");

     const getUser = useCallback(async function () {
          if (!token) return;
          try {
               const res = await api().get(`${USER_URL}/me`, {
                    headers: { Authorization: "Bearer " + token },
               });
               console.log("response : ", res.data);
               setUser(res.data.data);
          } catch (error: any) {
               console.log({ error });
          }
     }, []);

     useEffect(() => {
          getUser();
     }, [getUser]);

     const values: IContext = {
          user,
          getUser,
     };

     return (
          <ProfileContext.Provider value={values}>
               {children}
          </ProfileContext.Provider>
     );
};

export const useProfileData = () => {
     return useContext(ProfileContext);
};
