import { ProductForm } from "./ProductForm";
import { useState } from "react";
import { ProductList } from "./ProductList";
import { IoIosAdd } from "react-icons/io";
import Loading from "../Loading";
import { IProduct } from "./types";
import { Input } from "../Input";
import { Modal } from "../Modal";

interface IProps {
  products: IProduct[];
  loading: boolean;
  productLength: number;
  setType: React.Dispatch<React.SetStateAction<"general" | "medical">>;
  type: string;
}
export const Product = (props: IProps) => {
  const products = props.products;
  const type = props.type;
  const [isCategoryModal, setIsCategoryModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const setType = props.setType;
  return (
    <div>
      <div className="dash-bar" style={{ marginBottom: "1rem" }}>
        <h2>Dashboard</h2>
        {props.productLength > 0 && (
          <button className="dash-button" onClick={() => setShowModal(true)}>
            <IoIosAdd />
            Add product
          </button>
        )}
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="tabs"
            style={{
              display: "flex",
              gap: "2rem",
              backgroundColor: "#f2f2f2",
              maxWidth: "max-content",
              padding: "0.5rem 0.75rem",
              borderRadius: "20px",
            }}
          >
            <button
              id="general"
              style={{
                backgroundColor: `${type === "general" ? "white" : ""}`,
              }}
              onClick={() => setType("general")}
            >
              Consumable goods
            </button>
            <button
              id="medical"
              style={{
                backgroundColor: `${type === "medical" ? "white" : ""}`,
              }}
              onClick={() => setType("medical")}
            >
              Medicals
            </button>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              style={
                !props.loading
                  ? { padding: ".5rem .75rem" }
                  : { border: "none", backgroundColor: "white" }
              }
            >
              Previous page
            </button>
            {1 + " to " + 3}
            <button style={{ padding: ".5rem .75rem" }}>Next page</button>
          </div>
        </div>
        {!props.loading ? (
          <Loading />
        ) : !props.productLength ? (
          <>
            <div className="main-area">
              <div style={{ textAlign: "center" }}>
                <p style={{ letterSpacing: "1.2px", marginBottom: "1.2rem" }}>
                  You have not added any product. Start adding.
                </p>
                <button onClick={() => setShowModal(true)}>
                  <IoIosAdd />
                  Add product
                </button>
              </div>
            </div>
          </>
        ) : (
          <ProductList
            products={products}
            setIsCategoryModal={setIsCategoryModal}
          />
        )}
        <ProductForm showModal={showModal} setShowModal={setShowModal} />
        {
          <Modal
            isOpen={isCategoryModal}
            onClose={() => setIsCategoryModal(false)}
            style={{ height: "500px" }}
          >
            <div style={{ textAlign: "center" }}>
              <h1>Create new Category</h1>
              <form style={{ padding: "2rem" }}>
                <Input
                  label="Product category"
                  name="category"
                  type="text"
                  value={category}
                  handleChange={(e) => setCategory(e.target.value)}
                  placeholder=" e.g Beverages"
                  labelStyle={{
                    fontSize: "1.2rem",
                    margin: "1rem auto",
                    textAlign: "left",
                    width: "70%",
                  }}
                  inputStyle={{
                    padding: ".75rem",
                    fontSize: "1.2rem",
                    width: "70%",
                  }}
                />
                <div>
                  <button
                    style={{
                      padding: "1rem 2rem",
                      display: "block",
                      width: "70%",
                      margin: "2rem auto",
                      fontSize: "16px",
                    }}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        }
      </div>
    </div>
  );
};
