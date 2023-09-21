import React, { useState, useCallback, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "../Modal";
import { IoIosAdd } from "react-icons/io";
import { Input } from "../Input";
import { api } from "../../api/request";
import { useAuthToken } from "../../hooks/useAuthToken";
import { ProductTag } from "../ProductTag";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { PRODUCT_URL } from "../../constants";
import { useProductData } from "../../context/ProductProvider";
import { useCategoryData } from "../../context/CategoryProvider";

interface IProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductForm = React.memo(function ProductForm(props: IProps) {
    const navigate = useNavigate();
    const { token } = useAuthToken();
    const { setRefresh, type } = useProductData();
    const { categories } = useCategoryData();
    // const [cat, setCat] = useState(() => categories);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageFiles, setImageFiles] = useState<FileList | null>({} as FileList);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [productCategory, setProductCategory] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productSize, setProductSize] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productType, setProductType] = useState<string>("");
    const [productTags, setProductTags] = useState<string[]>([]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageFiles(e.target.files);
        const selectedFiles = e.target.files || [];
        const previewArray: string[] = [];

        for (let i = 0; i < selectedFiles.length; i++) previewArray.push(URL.createObjectURL(selectedFiles[i]));

        setImagePreviews(previewArray);
    };

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault();
            try {
                if (
                    !productName ||
                    !productCategory ||
                    !productDescription ||
                    !productSize ||
                    productTags.length == 0 ||
                    !productType ||
                    !productPrice ||
                    imagePreviews.length == 0
                ) {
                    // throw custom error
                    toast("Complete all form fields");
                    return;
                }
                setLoading(true);
                const formData = new FormData();
                for (const image of imageFiles || []) {
                    formData.append("image", image);
                }
                formData.append("name", productName);
                formData.append("category", productCategory);
                formData.append("description", productDescription);
                formData.append("type", productType);
                formData.append("price", productPrice);
                formData.append("tags", JSON.stringify(productTags));

                const result = await api().post(PRODUCT_URL + "/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoading(false);
                if (result.status == 201) {
                    toast(result.data.message);
                    setProductCategory("");
                    setProductName("");
                    setProductDescription("");
                    setProductSize("");
                    setProductType("");
                    setProductTags([]);
                    navigate("/dashboard");
                }
                if (result.status == 201) {
                    props.setShowModal(false);
                    setRefresh(true);
                }

                if (!result.data.status) {
                    setLoading(false);
                }
            } catch (error: any) {
                // console.log({ error });
                toast(error.data.message);
                console.error("ERROR", error);
            }
        },
        [
            productName,
            productCategory,
            productDescription,
            productSize,
            productTags,
            productType,
            productPrice,
            token,
            imageFiles,
        ]
    );

    const filteredtCategories = useMemo(
        () => [...categories]?.filter((c) => c.productType.toLowerCase() === type.toLowerCase()),
        [categories, type]
    );

    const newProductModal = useMemo(() => {
        return (
            <div className="product">
                <div className="image-box">
                    <input type="file" id="file" multiple onChange={handleFileUpload} style={{ display: "none" }} />
                    <label htmlFor="file">
                        <IoIosAdd />
                        Add pictures
                    </label>
                    {imagePreviews.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {imagePreviews.map((previewUrl, index) => (
                                <img
                                    key={index}
                                    src={previewUrl}
                                    alt={`Image Preview ${index + 1}`}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        margin: "5px",
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="category"
                            style={{
                                display: "block",
                                margin: "0.35rem 0",
                                fontSize: "18px",
                            }}
                        >
                            Product category
                        </label>
                        <select
                            name="category"
                            id=""
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            {filteredtCategories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                            <option value=""></option>
                        </select>
                    </div>
                    <Input
                        label="Product name"
                        type="text"
                        name="name"
                        value={productName}
                        handleChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g Sugar 50kg"
                    />
                    <div>
                        <label htmlFor="description">Product description</label>
                        <textarea
                            name="description"
                            id="description"
                            style={{ width: "100%", resize: "none" }}
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            cols={30}
                            rows={10}
                        ></textarea>
                    </div>
                    <Input
                        label="Product size"
                        type="text"
                        name="size"
                        value={productSize}
                        handleChange={(e) => setProductSize(e.target.value)}
                        placeholder="e.g 10kg"
                    />
                    <Input
                        label="Product price"
                        type="text"
                        name="price"
                        value={productPrice}
                        handleChange={(e) => setProductPrice(e.target.value)}
                        placeholder="e.g #1000"
                    />
                    <ProductTag tags={productTags} setTags={setProductTags} />
                    <div style={{ margin: "1rem 0" }}>
                        <label htmlFor="type">Product Type</label>
                        <select
                            name="type"
                            id="type"
                            style={{ width: "100%", padding: "0.75rem" }}
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                        >
                            <option value="" style={{ width: "100%", padding: "0.75rem" }}>
                                Select Type
                            </option>
                            <option value="general" style={{ width: "100%", padding: "0.75rem" }}>
                                General / Consumable goods
                            </option>
                            <option value="medical" style={{ width: "100%", padding: "1rem 0.75rem" }}>
                                Medical
                            </option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }, [
        handleFileUpload,
        imagePreviews,
        handleSubmit,
        productCategory,
        categories,
        productName,
        productDescription,
        productSize,
        productPrice,
        productTags,
        productType,
    ]);

    console.log("------------------------------------------------");
    console.log("categories", categories);
    console.log("------------------------------------------------");

    return (
        <>
            <Modal isOpen={props.showModal} onClose={() => props.setShowModal(!props.showModal)}>
                <div
                    className="modal-content"
                    style={{
                        textAlign: "center",
                        padding: "1rem",
                    }}
                >
                    <h1>Add Product</h1>
                    {loading ? <Loading /> : newProductModal}
                </div>
                <ToastContainer />
            </Modal>
        </>
    );
});
