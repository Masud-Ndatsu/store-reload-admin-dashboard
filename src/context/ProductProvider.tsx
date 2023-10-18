import React, {
     createContext,
     useCallback,
     useContext,
     useEffect,
     useState,
} from "react";
import { api } from "../api/request";
import { useAuthToken } from "../hooks/useAuthToken";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../components/Products/types";
import { PRODUCT_URL } from "../constants";

interface IContext {
     products: IProduct[];
     loading: boolean;
     productLength: number;
     type: "general" | "medical";
     setType: React.Dispatch<React.SetStateAction<"general" | "medical">>;
     setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext<IContext>({
     products: [],
     loading: false,
     productLength: 0,
     type: "general",
     setType: () => {},
     setRefresh: () => {},
});

interface IProductProvider {
     children: React.ReactNode;
}

export const ProductProvider: React.FC<IProductProvider> = ({ children }) => {
     const { token } = useAuthToken();
     const navigate = useNavigate();
     const [loading, setLoading] = useState<boolean>(false);
     const [refresh, setRefresh] = useState<boolean>(false);
     const [productLength, setProductLength] = useState<number>(0);
     const [products, setProducts] = useState<IProduct[]>([]);
     const [type, setType] = useState<"general" | "medical">("general");

     const fetchProductData = useCallback(async () => {
          try {
               setLoading(true); // Set loading to true when starting the request
               const result = await api().get(`${PRODUCT_URL}/?type=${type}`, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               setLoading(false); // Set loading to false when the request is complete
               setProductLength(result?.data.data.length);
               setProducts(result?.data.data);
          } catch (error: any) {
               setLoading(false); // Set loading to false in case of an error
               console.error("ERROR: ", error);
          }
     }, [type, navigate]);

     useEffect(() => {
          if (refresh) setRefresh(false);

          fetchProductData();
     }, [refresh, fetchProductData]);

     const values: IContext = {
          products,
          loading,
          productLength,
          type,
          setType,
          setRefresh,
     };

     return (
          <ProductContext.Provider value={values}>
               {children}
          </ProductContext.Provider>
     );
};

export const useProductData = () => {
     return useContext(ProductContext);
};
