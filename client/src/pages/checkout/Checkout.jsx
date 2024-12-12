import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useStore";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Checkout() {
  const [trackStep, setTrackStep] = useState(1);
  const { cartItems, priceTotal } = useAuth();
  const [checkOutDeatails, setCheckoutDetails] = useLocalStorage(
    "checkout",
    {}
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const forward = () => {
    setTrackStep((prev) => prev + 1);
  };
  const backward = () => {
    setTrackStep((prev) => prev + 1);
  };
  const onFormSubmit = (data) => {
    setCheckoutDetails(data);
    forward();
  };
  return (
    <div className="max-w-[1024px] mt-[3rem]  mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      
      <form

        className=" mt-6  max-w-[400px] mx-auto"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <ul className="steps steps-vertical lg:steps-horizontal my-8 w-full">
        <li className={`step mr-6 ${trackStep === 1 && "step-primary"}`}>
          Shipping details
        </li>
        <li className={`step bg-white ${trackStep === 2 && "step-primary"}`}>
          Payment method
        </li>
      </ul>

        {trackStep === 1 && (
          <div className="">
            <div className="my-4 form-control">
              <label htmlFor="fullname">Full name</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="fullname"
                className="bg-white w-full  h-[48px] border-2 pl-3 text-black"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">
                  Fullname of receiver is required
                </p>
              )}
            </div>
            {/*  */}
            <div className="my-4 form-control">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="address"
                name="address"
                id="address"
                className="bg-white w-full  h-[48px] border-2 pl-3 text-black"
                {...register("address", { required: true })}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">Address is required</p>
              )}
            </div>
            {/*  */}
            <div className="my-4 form-control">
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                placeholder="phone number"
                name="phone"
                id="phone"
                className="bg-white w-full  h-[48px] border-2 pl-3 text-black"
                {...register("phone", { required: true })}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">
                  Phone number of receiver is required
                </p>
              )}
            </div>
            <button className="btn w-full" type="submit">
              Next
            </button>
          </div>
        )}
        {trackStep === 2 && (
          <>
            <label className="form-control">
              <div className="label">
                <span>Choose payment method</span>
              </div>
              <select
                className="mt-6 select select-bordered"
                {...register("paymentMethod", { required: true })}
              >
                <option  disabled selected>
                  Pick one
                </option>
                <option value="cash">Cash</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  Please select a mode of payment
                </p>
              )}
            </label>
            <div className="mt-6">
              <button className="btn btn-success w-full text-white">
                Submit
              </button>
              <button
                className="btn btn-primary btn-outline w-full text-white mt-5"
                onClick={backward}
              >
                Go back
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
