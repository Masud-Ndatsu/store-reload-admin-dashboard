import React, { useCallback, useContext, useEffect, useState } from "react";
import { CATEGORY_URL } from "../constants";
import { api } from "../api/request";
import { useAuthToken } from "../hooks/useAuthToken";

interface ICategory {
     product_type: string;
     _id: string;
     name: string;
}

interface IContextType {
     categories: ICategory[];
     getCategories: () => Promise<void>;
     setIsCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
     isCategoryModal: boolean;
}
interface IProps {
     children: React.ReactNode;
}

const CategoryContext = React.createContext<IContextType>({
     categories: [{ _id: "1", name: "Beverages", product_type: "medical" }],
     getCategories: async () => {},
     isCategoryModal: false,
     setIsCategoryModal: () => {},
});

export const CategoryProvider = ({ children }: IProps) => {
     const { token } = useAuthToken();
     const [categories, setCategories] = useState<ICategory[]>([]);
     const [isCategoryModal, setIsCategoryModal] = useState<boolean>(false);

     const getCategories = useCallback(async () => {
          try {
               const res = await api().get(CATEGORY_URL, {
                    headers: {
                         Authorization: "Bearer " + token,
                    },
               });
               setCategories(res.data.data);
          } catch (error: any) {
               console.log("error:", error);
          }
     }, []);

     useEffect(() => {
          getCategories();
     }, [getCategories]);

     const dataObj = {
          categories,
          getCategories,
          isCategoryModal,
          setIsCategoryModal,
     };
     return (
          <CategoryContext.Provider value={dataObj}>
               {children}
          </CategoryContext.Provider>
     );
};

export const useCategoryData = () => {
     return useContext(CategoryContext);
};
