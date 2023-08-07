import { ProductItem } from "./ProductItem";
interface IProduct {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string[];
  type: string;
  price: string;
  size: string;
  tags: string;
}
type Props = {
  products: IProduct[];
};

export const ProductList = (props: Props) => {
  const products = props.products;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        marginTop: "1rem",
        textAlign: "center",
      }}>
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
  );
};
