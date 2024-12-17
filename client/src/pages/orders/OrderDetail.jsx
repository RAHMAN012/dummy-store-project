import { useParams } from "react-router-dom";
import { getASingleOrder,updateAnOrder } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useStore";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Spinner } from "../../components";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderDetail() {
  const [orderStatus, setOrderStatus] = useState("open");
  const [deliveryStatus, setDeliveryStatus] = useState("preparing");
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err,setErr] =useState(null)
  const { orderId } = useParams();
  const { accessToken, user } = useAuth();
  const { error, data, loading,setData } = useFetch(
    getASingleOrder,
    orderId,
    accessToken
  );
const updateOrder = async(e)=>{
  e.preventDefault()
  const formData = {
    orderStatus,
    deliveryStatus,
    isPaid,
    isDelivered,
  }
  setIsSubmitting(true)
  try {
    const res = await  updateAnOrder (orderId,formData,accessToken)
    console.log(res);
    toast.success(res.data.msg)
    setData(res.data.updateOrder)
  } catch (error) {
    console.log(error);
    setErr(
        error?.response?.data?.message ||
        error?.response.data?.error ||
        error?.message
    ) 
  }finally{
    setIsSubmitting(false)
  }
}
  if (loading) return <Spinner />;
  if (error) return <p className="text-center">{error}</p>;
  return (
    <div className="max-w-[1024px] mt-[3rem] mx-auto py-6 px-4">
      <h1 className="">Order Id : {orderId}</h1>
      {err && <spam className="my-4">{err}</spam>}
      <div className=" mt-8 grid md:grid-cols-12  gap-4">
        <div className="col-span-4">
          <h1 className="">
            <span className="font-bold">Order Status:</span>
            {""}
            <span
              className={`${
                data.orderStatus === "open"
                  ? "text-red-400"
                  : data.orderStatus === "processing"
                  ? "text-warning-500"
                  : "text-green-500"
              } font-bold`}
            >
              {data.orderStatus}
            </span>
          </h1>
          <div className="mt-4">
            <h1 className="font-bold">Shipping Details: </h1>
            <p>
              <span className="">Receiver : </span> {data.fullname}
            </p>
            <p>
              <span className="">Phone : </span> {data.phone}
            </p>
            <p>
              <span className="">Address : </span> {data.address}
            </p>
            <p>
              <span className="">Payment Method : </span> {data.paymentMethod}
            </p>
          </div>
          <div className="mt-4">
            <h1 className="font-bold">Payment Status:</h1>
            <p>
              <span className="">Is Paid:</span>
              {data.isPaid ? "Payed" : "Not payed"}
            </p>
            {data.paidAt && (
              <p>
                <span>Paid At: </span>
                {data.paidAt}
              </p>
            )}
          </div>
          <div className="mt-4">
            <h1 className="font-bold">Delivery Status:</h1>
            <p>
              <span className="">Is Delivered:</span>
              {data.isDelivered ? "Delivered" : "Not Delivered"}
            </p>
            {data.deliveredAt && (
              <p>
                <span>Delivered At: </span>
                {data.deliveredAt}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-8">
          {data.orderItems?.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <div className="flex gap-3 mb-3">
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-[80px] h-[80px]"
                />
                <div className="">
                  <p>{item.title}</p>
                  <p>{formatCurrency(item.price)}</p>
                  <p>qty:{item.qty}</p>
                </div>
                <p className="font-semibold">
                  subTotal:{formatCurrency(item.price)}
                </p>
              </div>
            </div>
          ))}
          <p className="">Total{formatCurrency(data.total)}</p>
        </div>
      </div>
      {user?.data?.role === "admin" && (
        <div className="mt-8">
          <h1 className="font-bold">Update order status</h1>
          <form action="" onSubmit={updateOrder}>
            <div className="form-control mt-4">
              <label htmlFor="orderStatus">Order Status</label>
              <select
                name=""
                id=""
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="select select-bordered w-full max-w-xs "
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value="open">Open</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {/*  */}
            <div className="form-control mt-4">
              <label htmlFor="orderStatus">Payment Status</label>
              <select
                name=""
                id=""
                value={isPaid}
                onChange={(e) => setIsPaid(e.target.value)}
                className="select select-bordered w-full max-w-xs "
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
            {/*  */}
            <div className="form-control mt-4">
              <label htmlFor="deliveryStatus">Delivery Status</label>
              <select
                name=""
                id=""
                value={deliveryStatus}
                onChange={(e) => setDeliveryStatus(e.target.value)}
                className="select select-bordered w-full max-w-xs "
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value="preparing">Preparing</option>
                <option value="on the way">On the way</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            {/*  */}
            <div className="form-control mt-4">
              <label htmlFor="Delivered">is Delivered</label>
              <select
                name=""
                id=""
                value={isDelivered}
                onChange={(e) => setIsDelivered(e.target.value)}
                className="select select-bordered w-full max-w-xs "
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
            <button
              className="btn btn-success mt-4 w-full max-w-xs text-white "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting? "Updating" : "Update"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
