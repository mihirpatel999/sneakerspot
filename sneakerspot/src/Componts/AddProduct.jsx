import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { selectProducts } from "../../productSlice";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const Products = useSelector(selectProducts);
  const ProductEdit = Products.find((item) => item.id == id);

  let initialData = {
    name: "",
    brand: "",
    category: "",
    price: "",
    size: [],
    stock: "",
    images: [],
    desc: "",
  };

  const [IsLoading, setIsLoading] = useState(false);
  const [Product, setProduct] = useState({ ...initialData });
  const [pics, setPics] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (id && ProductEdit) {
      setProduct({ ...ProductEdit });
      setPics([...ProductEdit.images]);
      Object.keys(ProductEdit).forEach((key) => setValue(key, ProductEdit[key]));
    }
  }, [id, ProductEdit, setValue]);

  const handleSizeChange = (e) => {
    const selectedSizes = watch("size") || [];
    const value = e.target.value;
    if (e.target.checked) {
      setValue("size", [...selectedSizes, value]);
    } else {
      setValue("size", selectedSizes.filter((size) => size !== value));
    }
  };

  const handleImage = async (e) => {
    let images = e.target.files;

    if (images.length > 5) {
      toast.error("Max 5 images only");
      return;
    }

    Array.from(images).forEach(async (img) => {
      let ext = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp", "image/jfif", "image/avif"];

      if (img.size > 1048576) toast.error("File size exceeded");
      else if (!ext.includes(img.type)) toast.error("Invalid extension");
      else {
        setIsLoading(true);
        const data = new FormData();
        data.append("file", img);
        data.append("cloud_name", "hitarth11");
        data.append("upload_preset", "sneaker");
        data.append("folder", "sneakerproduct");

        try {
          const res = await axios.post("https://api.cloudinary.com/v1_1/hitarth11/image/upload", data);
          setIsLoading(false);
          setPics((prevpics) => [...prevpics, res.data.url]);
        } catch (err) {
          toast.error(err.message);
          setIsLoading(false);
        }
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/products`, { ...data, images: [...pics], createdAt: new Date() });
      toast.success("Product added");
      navigate("/admin/view");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container p-3 shadow">
      <h1>{id ? "Edit Product" : "Add Product"}</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" {...register("category", { required: "Category is required" })}>
            <option value="">Choose one</option>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
          {errors.category && <span className="text-danger">{errors.category.message}</span>}
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" {...register("name", { required: "Product name is required" })} />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </div>

          <div className="col mb-3">
            <label className="form-label">Brand</label>
            <input type="text" className="form-control" {...register("brand", { required: "Brand name is required" })} />
            {errors.brand && <span className="text-danger">{errors.brand.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })} />
            {errors.price && <span className="text-danger">{errors.price.message}</span>}
          </div>

          <div className="col mb-3">
            <label className="form-label">Size</label>
            <div>
              {["5", "6", "7", "8", "9"].map((size) => (
                <div key={size} className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" value={size} onChange={handleSizeChange} />
                  <label className="form-check-label">{size}</label>
                </div>
              ))}
            </div>
            {errors.size && <span className="text-danger">{errors.size.message}</span>}
          </div>

          <div className="col mb-3">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" {...register("stock", { required: "Stock is required", min: { value: 1, message: "Stock must be at least 1" } })} />
            {errors.stock && <span className="text-danger">{errors.stock.message}</span>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Choose file</label>
          <input type="file" className="form-control" multiple onChange={handleImage} />
          {pics.length > 0 && pics.map((img, index) => <img key={index} src={img} height={100} width={100} alt="Product" className="m-2" />)}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" {...register("desc", { required: "Description is required" })}></textarea>
          {errors.desc && <span className="text-danger">{errors.desc.message}</span>}
        </div>

        <div className="d-grid gap-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
