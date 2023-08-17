import { useCallback } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuthToken } from "../../hooks/useAuthToken";
import { api } from "../../api/request";
import { IProduct } from "./types";

type Props = {
  product: IProduct;
  index: number;
};

export const ProductItem = ({ product, index }: Props) => {
  const user = useAuthToken();
  const handleDelete = useCallback(async (): Promise<void> => {
    if (!user?.token) return;
    const { token } = user;
    try {
      const result = await api().delete(
        "https://store-reload.onrender.com/api/v1/admin/product/delete?productId=" +
          product._id,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.status) {
        window.location.reload();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("ERROR", error.response.data.message);
    }
  }, [user, product]);

  return (
    <>
      <tr style={{ cursor: "pointer", backgroundColor: "gray" }}>
        <td>{(index + 1).toString().padStart(2, "0")}</td>
        <td>
          <img
            style={{
              width: "100%",
              maxWidth: "50px",
              maxHeight: "50px",
              height: "100%",
              margin: "auto",
            }}
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
