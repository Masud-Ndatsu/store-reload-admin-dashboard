import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "../Modal";
import { IoIosAdd } from "react-icons/io";
import { Input } from "../Input";
import { api } from "../../api/request";
import { useAuthToken } from "../../hooks/useAuthToken";
import Loading from "../Loading";

interface IProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductForm = (props: IProps) => {
  const { user } = useAuthToken();
  const [loading, setLoading] = useState<boolean>(true);
  const [imageFiles, setImageFiles] = useState<FileList | null>({} as FileList);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [productCategory, setProductCategory] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productSize, setProductSize] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [productTags, setProductTags] = useState<string>("");

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageFiles(e.target.files);
      const selectedFiles = e.target.files || [];
      const previewArray: string[] = [];

      for (let i = 0; i < selectedFiles.length; i++)
        previewArray.push(URL.createObjectURL(selectedFiles[i]));

      setImagePreviews(previewArray);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      try {
        if (!user?.token) return;
        const { token } = user;
        if (
          !productName ||
          !productCategory ||
          !productDescription ||
          !productSize ||
          !productTags ||
          !productType
        ) {
          // throw custom error
          toast("Complete all form fields");
          return;
        }

        setLoading(false);
        const formData = new FormData();
        for (const image of imageFiles || []) {
          formData.append("image", image);
        }
        formData.append("name", productName);
        formData.append("category", productCategory);
        formData.append("description", productDescription);
        formData.append("type", productType);
        // formData.append("tags", productTags);

        const result = await api().post(
          "https://store-reload.onrender.com/api/v1/admin/product/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (result.status === 201) {
          setProductCategory("");
          setProductName("");
          setProductDescription("");
          setProductSize("");
          setProductType("");
          setProductTags("");
          setLoading(false);
          window.location.reload();
        }
        toast(result.data.message);
        console.log(result.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(error.response?.data?.message);
        console.error("ERROR", error.response?.data);
      }
    },
    [
      productName,
      productCategory,
      productDescription,
      productSize,
      productTags,
      productType,
      user,
      imageFiles,
    ]
  );

  return (
    <>
      <Modal
        isOpen={props.showModal}
        onClose={() => props.setShowModal(!props.showModal)}>
        <div
          className="modal-content"
          style={{
            textAlign: "center",
            padding: "1rem",
          }}>
          <h1>Add Product</h1>
          <div className="product">
            {!loading ? (
              <Loading />
            ) : (
              <>
                <div className="image-box">
                  <input
                    type="file"
                    id="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file">
                    <IoIosAdd />
                    Add pictures
                  </label>
                  {imagePreviews?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {imagePreviews?.map((previewUrl, index) => (
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
                  <Input
                    label="Product Category"
                    type="text"
                    name="category"
                    value={productCategory}
                    handleChange={(e) => setProductCategory(e.target.value)}
                    placeholder="e.g Beverages"
                  />
                  <Input
                    label="Product name"
                    type="text"
                    name="name"
                    value={productName}
                    handleChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g Sugar 50kg"
                  />
                  <Input
                    label="Product description"
                    type="text"
                    name="description"
                    value={productDescription}
                    handleChange={(e) => setProductDescription(e.target.value)}
                    placeholder="e.g This is a granulated sugar"
                  />
                  <Input
                    label="Product size"
                    type="text"
                    name="size"
                    value={productSize}
                    handleChange={(e) => setProductSize(e.target.value)}
                    placeholder="e.g 10kg"
                  />
                  <Input
                    label="Product type"
                    type="text"
                    name="type"
                    value={productType}
                    handleChange={(e) => setProductType(e.target.value)}
                    placeholder="e.g Medicals"
                  />
                  <Input
                    label="Product tag"
                    type="text"
                    name="tags"
                    value={productTags}
                    handleChange={(e) => setProductTags(e.target.value)}
                    placeholder="e.g Beverages"
                  />
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
        <ToastContainer />
      </Modal>
    </>
  );
};
