import { ProductProvider } from "../../context/ProductProvider";
import { Product } from "./Product";

export const Products = () => {
    return (
        <ProductProvider>
            <Product />
        </ProductProvider>
    );
};
