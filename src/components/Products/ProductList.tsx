import { ProductItem } from "./ProductItem";
import { IProduct } from "./types";

type Props = {
  products: IProduct[];
  setIsCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductList = (props: Props) => {
  const products = props.products;

  return (
    <section style={{ position: "relative" }}>
      <div style={{ margin: "1rem 0" }}>
        <button
          style={{
            display: "block",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "var(--main-blue)",
            color: "white",
            fontSize: "1.2rem",
          }}
          className="add-category"
          onClick={() => props.setIsCategoryModal(true)}
        >
          +
        </button>
      </div>
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
              <ProductItem key={product._id} product={product} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
