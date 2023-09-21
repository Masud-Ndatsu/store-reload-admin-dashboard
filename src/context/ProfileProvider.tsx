import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuthToken } from "../hooks/useAuthToken";
import { api } from "../api/request";
import { USER_URL } from "../constants";

interface IContext {
    avatar: string;
    getAvatar: () => Promise<void>;
}

interface IProfileProvider {
    children: React.ReactNode;
}

const ProfileContext = createContext<IContext>({
    avatar: "http://res.cloudinary.com/masudnda/image/upload/v1692392737/storereload/gsdryxexmtzgr0ioe9nx.png",
    getAvatar: async () => {},
});

export const ProfileProvider = ({ children }: IProfileProvider) => {
    const { token } = useAuthToken();
    const [avatar, setAvatar] = useState<string>("");

    const getAvatar = useCallback(async function () {
        if (!token) return;
        try {
            const res = await api().get(`${USER_URL}/avatar`, {
                headers: { Authorization: "Bearer " + token },
            });
            setAvatar(res.data.data);
        } catch (error: any) {
            console.log({ error });
        }
    }, []);

    useEffect(() => {
        getAvatar();
    }, [getAvatar]);

    const values: IContext = {
        avatar,
        getAvatar,
    };

    return <ProfileContext.Provider value={values}>{children}</ProfileContext.Provider>;
};

export const useProfileData = () => {
    return useContext(ProfileContext);
};
