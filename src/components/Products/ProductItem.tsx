import { useCallback } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuthToken } from "../../hooks/useAuthToken";
import { api } from "../../api/request";
import { IProduct } from "./types";
import { useProductData } from "../../context/ProductProvider";
import { PRODUCT_URL } from "../../constants";
import "./style.css";

type Props = {
     product: IProduct;
     index: number;
};

export const ProductItem = ({ product, index }: Props) => {
     const { token } = useAuthToken();
     const { setRefresh } = useProductData();
     const { _id: id } = product;
     const handleDelete = useCallback(async (): Promise<void> => {
          try {
               const result = await api().delete(
                    PRODUCT_URL + "/" + id,

                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               );
               if (result.status == 200) {
                    setRefresh(true);
               }
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
               console.log("ERROR", error.data);
          }
     }, [id]);

     return (
          <>
               <tr className="product-item" style={{ cursor: "pointer" }}>
                    <td>{(index + 1).toString().padStart(2, "0")}</td>
                    <td>
                         <img
                              style={{
                                   width: "100%",
                                   maxWidth: "50px",
                                   maxHeight: "50px",
                                   height: "100%",
                                   margin: "auto",
                                   objectFit: "cover",
                              }}
                              loading="lazy"
                              src={product.images[0]}
                              alt=""
                         />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.size ?? "Carton"}</td>
                    <td>{product.description}</td>
                    <td>{product.price ?? 500}</td>
                    <td>
                         <span onClick={handleDelete}>
                              <RiDeleteBin6Line />
                         </span>
                         <span>
                              <GrEdit style={{ marginLeft: "20px" }} />
                         </span>
                    </td>
               </tr>
          </>
     );
};
