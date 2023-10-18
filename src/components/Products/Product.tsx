import { ProductForm } from "./ProductForm";
import { useState } from "react";
import { ProductList } from "./ProductList";
import { IoIosAdd } from "react-icons/io";
import Loading from "../Loading";
import { useCategoryData } from "../../context/CategoryProvider";
import { useProductData } from "../../context/ProductProvider";
import { Pagination } from "../Pagination";
import { CategoryForm } from "../CategoryForm";

export const Product = () => {
     const { type, setType, productLength, loading } = useProductData();
     const { setIsCategoryModal } = useCategoryData();
     const [showModal, setShowModal] = useState<boolean>(false);

     return (
          <div>
               <div className="dash-bar" style={{ marginBottom: "1rem" }}>
                    <h2>Dashboard</h2>
                    {productLength > 0 && (
                         <button
                              className="dash-button"
                              onClick={() => setShowModal(true)}
                         >
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
                                        backgroundColor: `${
                                             type === "general" ? "white" : ""
                                        }`,
                                   }}
                                   onClick={() => {
                                        setType("general");
                                   }}
                              >
                                   Consumable goods
                              </button>
                              <button
                                   id="medical"
                                   style={{
                                        backgroundColor: `${
                                             type === "medical" ? "white" : ""
                                        }`,
                                   }}
                                   onClick={() => {
                                        setType("medical");
                                   }}
                              >
                                   Medicals
                              </button>
                         </div>
                         <Pagination loading={loading} />
                    </div>
                    <div
                         style={{
                              margin: "1rem 0",
                              display: "flex",
                              alignItems: "center",
                              gap: "2rem",
                         }}
                    >
                         <span
                              style={{
                                   display: "block",
                                   backgroundColor: "var(--main-blue)",
                                   color: "white",
                                   padding: ".65rem 1rem",
                                   borderRadius: "5px",
                                   fontSize: ".75rem",
                                   cursor: "pointer",
                                   letterSpacing: "1px",
                              }}
                              className="add-category"
                              onClick={() => setIsCategoryModal(true)}
                         >
                              Add product category
                         </span>
                         {/* <div style={{ display: "flex", gap: "1rem" }}>
                        {categories.map((categoryObj) => (
                            <button
                                key={categoryObj._id}
                                style={{
                                    padding: "1rem .5rem",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    fontSize: "1.2rem",
                                    borderBottom: `${
                                        categoryObj.name === categoryTab ? "2px solid var(--main-blue)" : "white"
                                    }`,
                                }}
                                onClick={() => setCategoryTab(categoryObj.name)}
                            >
                                {categoryObj.name}
                            </button>
                        ))}
                    </div> */}
                    </div>
                    {loading ? (
                         <Loading />
                    ) : !productLength ? (
                         <>
                              <div className="main-area">
                                   <div style={{ textAlign: "center" }}>
                                        <p
                                             style={{
                                                  letterSpacing: "1.2px",
                                                  marginBottom: "1.2rem",
                                             }}
                                        >
                                             You have not added any product.
                                             Start adding.
                                        </p>
                                        <button
                                             onClick={() => setShowModal(true)}
                                        >
                                             <IoIosAdd />
                                             Add product
                                        </button>
                                   </div>
                              </div>
                         </>
                    ) : (
                         <ProductList />
                    )}
                    <ProductForm
                         showModal={showModal}
                         setShowModal={setShowModal}
                    />
                    <CategoryForm />
               </div>
          </div>
     );
};
