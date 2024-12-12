import { useParams, useNavigate } from "react-router-dom";
import {
  updateProducts,
  getASingleProduct,
} from "../../api/api";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { BiPlus } from "react-icons/bi";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useStore";

export default function EditProduct() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState(null);
  const { title, productId } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const { data, error: err } = useFetch(getASingleProduct, title);
  const { accessToken, setData } = useAuth();
  const product = useMemo(() => data?.product, [data?.product]);

  useEffect(() => {
    if (product) {
      setValue("title", product?.title);
      setValue("description", product?.description);
      setValue("price", product?.price);
      setValue("brand", product?.brand);
      setValue("category", product?.category);
      setValue("inStock", product?.inStock);
    }
  }, [product, setValue]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      toast.error("You can only upload up to five images");
      return;
    }
    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should not be more than 5mb");
        return false;
      }
      return true;
    });
    // clear previous images before adding new ones
    setSelectedImages([]);
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages((prev) => {
          const newFiles = [...prev, { file, preview: reader.result }];
          return newFiles;
        });
      };
      reader.onerror = () => {
        console.error("Error reading file", file.name);
        toast.error("Error reading file");
      };
      reader.readAsDataURL(file);
    });
  };

  const cats = [
    {
      name: "Beauty",
    },
    {
      name: "Tech",
    },
    {
      name: "Home",
    },
    {
      name: "Fashion",
    },
    {
      name: "Vehicles",
    },
  ];

  const onFormSubmit = async (data) => {
    const formData = {
      ...data,
      images: selectedImages.map(({ preview }) => preview),
    };
    try {
      const res = await updateProducts(productId, formData, accessToken);
      if (res.status === 200) {
        toast.success(res.data.msg);
        setData((prev) =>
          prev.map((p) =>
            p._id === productId ? { ...p, ...res.data.updatedProduct} : p
          )
        );
        navigate("/allproducts");
      }
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.message ||
          error?.response.data?.error ||
          error?.message
      );
    }
  };

  return (
    <div className="max-w-[1024px] mt-[3rem] mx-auto py-6 px-4">
      {error ||
        (err && <p className="text-sm text-center my-4">{error || err}</p>)}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h1 className="text-3xl my-4">Edit {product?.title}</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="">
            <div className="form-control w-full">
              <label htmlFor="title">Title</label>
              <input
                className="input bg-white text-black input-bordered rounded-none"
                type="text"
                name="title"
                placeholder="enter product title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>
            {/*  */}
            <div className="form-control w-full my-4 ">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="input bg-white text-black input-bordered rounded-none textarea-lg"
                {...register("description", { required: true })}
                placeholder="Enter description"
              ></textarea>
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>
            {/*  */}
            <div className="form-control w-full">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                placeholder="000"
                className="input bg-white text-black input-bordered rounded-none"
                name="price"
                id="price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">Price is required</p>
              )}
            </div>
            {/*  */}
            <div className="form-control w-full my-4">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                placeholder="Brand"
                className="input bg-white text-black input-bordered rounded-none"
                name="brand"
                id="brand"
                {...register("brand")}
              />
            </div>
            <div className="form-control w-full my-4">
              <label htmlFor="inStock">InStock</label>
              <input
                type="checkbox"
                // value={inStock}
                name="inStock"
                id="inStock"
                // onChange={(e) => setInstock(e.target.checked)}
                className="toggle"
                defaultValue={product?.inStock}
                {...register("inStock")}
              />
            </div>
            {/*  */}
          </div>
          {/*  */}
          <div className="">
            <div className="form-control w-full ">
              <label htmlFor="images">Select Category</label>
              <select
                className="select bg-white text-black select-bordered w-full"
                {...register("category", { required: true })}
                // defaultValue={product?.category}
              >
                {cats.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-500">Please select a category</p>
              )}
            </div>
            {/*  */}
            <div className="form-control w-full my-4 relative">
              <label
                htmlFor="images"
                className="h-[300px] border-2 border-dashed flex items-center justify-center overflow-auto p-2 cursor-pointer"
              >
                {selectedImages.length === 0 ? (
                  <div className="text-center">
                    <BiPlus className="mx-auto mb-2" />
                    <p>Upload photos</p>
                    <p className="text-xs text-gray-500">
                      Upload up to 5 photos
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 w-full relative z-20">
                    {selectedImages.map(({ preview }, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`preview-${index}`}
                          className="w-full h-[150px] rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedImages((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </label>
              <input
                className="h-full w-full absolute top-0 inset-y-0 opacity-0 cursor-pointer bg-white text-black"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImage}
              />
            </div>
          </div>
          <div className="">
            <button
              className="btn btn-success text-white w-full mt-6 "
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Updating product..." : "Update product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
