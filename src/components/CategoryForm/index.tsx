import React, { useCallback, useState } from "react";
import { Modal } from "../Modal";
import { CATEGORY_URL } from "../../constants";
import { api } from "../../api/request";
import { useAuthToken } from "../../hooks/useAuthToken";
import { useCategoryData } from "../../context/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CategoryForm = React.memo(function CategoryForm() {
     const { token } = useAuthToken();
     const navigate = useNavigate();
     const { isCategoryModal, setIsCategoryModal, getCategories } =
          useCategoryData();
     const [category, setCategory] = useState<string>("");
     const [productType, setProductType] = useState<string>("");

     const handleCategoryReq = useCallback(
          async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
               e.preventDefault();
               if (!category) {
                    toast("Complete all form fields");
                    return;
               }
               try {
                    const res = await api().post(
                         CATEGORY_URL + "/create",
                         {
                              name: category,
                              product_type: productType,
                         },
                         {
                              headers: {
                                   Authorization: `Bearer ${token}`,
                              },
                         }
                    );
                    if (res.status === 200) {
                         navigate("/dashboard");
                         setCategory("");
                         setIsCategoryModal(false);
                         getCategories();
                    }
               } catch (error: any) {
                    console.log({ error });
               }
          },
          [token, category, productType]
     );
     return (
          <Modal
               isOpen={isCategoryModal}
               onClose={() => setIsCategoryModal(false)}
               style={{ height: "500px" }}
          >
               <div style={{ textAlign: "center" }}>
                    <h1>Create new Category</h1>
                    <form
                         style={{ padding: "2rem" }}
                         onSubmit={handleCategoryReq}
                    >
                         <div>
                              <label
                                   htmlFor="category"
                                   style={{
                                        display: "block",
                                        fontSize: "1.2rem",
                                        margin: "1rem auto",
                                        textAlign: "left",
                                        width: "70%",
                                   }}
                              >
                                   Product Type
                              </label>
                              <select
                                   name="type"
                                   id="type"
                                   style={{ width: "70%", padding: "0.75rem" }}
                                   value={productType}
                                   onChange={(e) =>
                                        setProductType(e.target.value)
                                   }
                              >
                                   <option
                                        value=""
                                        style={{
                                             width: "100%",
                                             padding: "0.75rem",
                                        }}
                                   >
                                        Select Type
                                   </option>
                                   <option
                                        value="general"
                                        style={{
                                             width: "100%",
                                             padding: "0.75rem",
                                        }}
                                   >
                                        General / Consumable goods
                                   </option>
                                   <option
                                        value="medical"
                                        style={{
                                             width: "100%",
                                             padding: "1rem 0.75rem",
                                        }}
                                   >
                                        Medical
                                   </option>
                              </select>
                         </div>
                         <div>
                              <label
                                   htmlFor="category"
                                   style={{
                                        display: "block",
                                        fontSize: "1.2rem",
                                        margin: "1rem auto",
                                        textAlign: "left",
                                        width: "70%",
                                   }}
                              >
                                   Product category
                              </label>
                              <input
                                   type="text"
                                   id="category"
                                   value={category}
                                   onChange={(e) => setCategory(e.target.value)}
                                   style={{
                                        padding: ".75rem",
                                        fontSize: "1.2rem",
                                        width: "70%",
                                   }}
                              />
                         </div>
                         <div>
                              <button
                                   style={{
                                        padding: "1rem 2rem",
                                        display: "block",
                                        width: "70%",
                                        margin: "2rem auto",
                                        fontSize: "16px",
                                   }}
                                   type="submit"
                              >
                                   Add
                              </button>
                         </div>
                    </form>
               </div>
          </Modal>
     );
});
