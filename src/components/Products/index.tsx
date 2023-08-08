import { useState, useEffect, useCallback } from "react";
import { api } from "../../api/request";
import { useAuthToken } from "../../hooks/useAuthToken";
import { Product } from "./Product";
import { IProduct } from "./types";

export const Products = () => {
  const user = useAuthToken();
  const [loading, setLoading] = useState<boolean>(true);
  const [productLength, setProductLength] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProductData = useCallback(async () => {
    if (!user?.token) return;

    try {
      setLoading(false);
      const result = await api().get(
        "https://store-reload.onrender.com/api/v1/admin/product/getMany?type=general",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setLoading(result?.data.status);
      setProductLength(result?.data.data.totalPages);
      setProducts(result?.data.data.products);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("ERROR: ", error?.response?.data);
    }
  }, [user]);
  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <div>
      <Product
        products={products}
        productLength={productLength}
        loading={loading}
      />
    </div>
  );
};
