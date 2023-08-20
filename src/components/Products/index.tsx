import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/request";
import { useAuthToken } from "../../hooks/useAuthToken";
import { Product } from "./Product";
import { IProduct } from "./types";
import { PRODUCT_URL } from "../../constants";

export const Products = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [productLength, setProductLength] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [type, setType] = useState<"general" | "medical">("general");

  const fetchProductData = useCallback(async () => {
    try {
      if (!token) return;
      setLoading(false);
      const result = await api().get(PRODUCT_URL + "/getMany?type=" + type, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(result?.data.status);
      setProductLength(result?.data.data.totalPages);
      setProducts(result?.data.data.products);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      if (error.status == 401) {
        navigate("/auth/signin");
      }
      console.error("ERROR: ", error?.response?.data);
    }
  }, [token, type]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <div>
      <Product
        type={type}
        products={products}
        productLength={productLength}
        loading={loading}
        setType={setType}
      />
    </div>
  );
};
