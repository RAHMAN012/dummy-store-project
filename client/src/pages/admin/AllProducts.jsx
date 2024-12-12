import { Link, useNavigate } from "react-router-dom";
import { deleteProducts } from "../../api/api";
import { Spinner } from "../../components";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useAuth } from "../../hooks/useStore";
import { useState } from "react";
import { toast } from "sonner";

export default function AllProducts() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [err, setError] = useState(null);
  const { error, data, loading, accessToken, setData } = useAuth();
  const navigate = useNavigate();

  const deleteAProduct = async (productId) => {
    setIsDeleting(true);
    try {
      const res = await deleteProducts(productId, accessToken);
      if (res.status === 200) {
        toast.success(res.data.msg);
        setData((prev) => prev.filter((product) => product._id !== productId));
      }
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.message ||
          error?.response.data?.error ||
          error?.message
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="max-w-[1024px] mt-[3rem] mx-auto py-6 px-4">
        <h1 className="text-3xl mb-4">View products</h1>
        {error || (err && <span>{error || err}</span>)}
        {loading ? (
          <Spinner />
        ) : (
          <>
            {data?.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="table">
                  <thead>
                    <tr className="text-black text-lg">
                      <th></th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {data.map((product, index) => (
                    <tbody key={product?._id}>
                      <tr className="hover:bg-slate-50">
                        <th>{index}</th>
                        <th>
                          <Link to={`/product/${product?.title}`}>
                            <img
                              src={product?.images[0]}
                              className="w-[40px] h-[40px]"
                              alt=""
                            />
                          </Link>
                        </th>
                        <th>
                          <Link to={`/product/${product?.title}`}>
                            {product.title}
                          </Link>
                        </th>
                        <th>{formatCurrency(product?.price)}</th>
                        <th className="flex gap-3">
                          <button
                            className=" btn btn-xs border-none bg-slate-50"
                            onClick={() =>
                              navigate(
                                `/product/edit/${product?._id}/${product?.title}`
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteAProduct(product?._id);
                              setActiveBtn(index);
                            }}
                            className="btn btn-xs border-none bg-red-500 text-white"
                          >
                            {activeBtn === index && isDeleting ? "Deleting...": "Delete"}
                          </button>
                        </th>
                      </tr>
                    </tbody>
                  ))}
                </div>
              </div>
            ) : (
              <p>No product to display for this category.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
