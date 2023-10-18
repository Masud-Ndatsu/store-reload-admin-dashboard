import { useProductData } from "../../context/ProductProvider";
import { ProductItem } from "./ProductItem";

export const ProductList = () => {
     const { products } = useProductData();
     return (
          <section style={{ position: "relative" }}>
               <div
                    style={{
                         height: "100%",
                         width: "100%",
                         marginTop: "1rem",
                         textAlign: "center",
                    }}
               >
                    <table>
                         <thead>
                              <tr>
                                   <th>S/N</th>
                                   <th>Product Image</th>
                                   <th>Product Name</th>
                                   <th>Size of sale</th>
                                   <th>Status</th>
                                   <th>Price</th>
                                   <th>Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {products.map((product, index) => (
                                   <ProductItem
                                        key={product._id}
                                        product={product}
                                        index={index}
                                   />
                              ))}
                         </tbody>
                    </table>
               </div>
          </section>
     );
};
