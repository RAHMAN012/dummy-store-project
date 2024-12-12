import { useAuth } from "../../hooks/useStore";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utilities/formatCurrency";
import { CiCircleMinus, CiCirclePlus, CiShoppingCart } from "react-icons/ci";
export default function Cart() {
  const { cartItems, decreaseCartQty, priceTotal, removeFromCart, addToCart } =
    useAuth();
  return (
    <div className="max-w-[1024px] mt-[4rem] lg:mt-[1rem] mx-auto py-6 px-4 ">
      {cartItems?.length > 0 ? (
        <>
          <div className="mt-4 text-center ">
            <h1 className="text-2xl">
              Your cart total is {formatCurrency(priceTotal)}
            </h1>
            <Link to="/checkout">
              <button className="btn btn-success mt-4 w-[160px] text-white border-none">
                Checkout
              </button>
            </Link>
            <div className="mt-10">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="md:flex md:justify-start gap-4 justify-between mb-4"
                >
                  <div className="md:flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
                    <Link to={`/product/${item.title}`}>
                      <img
                        src={item?.images[0]}
                        alt={item.title}
                        className="w-[130px] h-[130px] "
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="">
                    <Link to={`/product/${item.title}`} className="text-xl">
                      <p>{item.title}</p>
                    </Link>
                    <div className="gap-4 items-center flex justify-between md:justify-start">
                      <p>{formatCurrency(item.price)}</p>
                      <div className="flex gap-2 items-center p-2">
                        <CiCircleMinus
                          className="cursor-pointer "
                          size="32px"
                          onClick={() => decreaseCartQty(item)}
                        />
                        <span className="text-[24px]">{item.qty}</span>
                        <CiCirclePlus
                        size="32px"
                          className="cursor-pointer "
                          onClick={() => addToCart(item)}
                        />
                      </div>
                    </div>
                  </div>
                  <p
                    className="flex-grow text-right cursor-pointer  "
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </p>
                </div>
              ))}
            </div>
            <Link to="/checkout">
              <button className="btn btn-success mt-4 w-[160px] text-white border-none">
                Checkout
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-5 flex flex-col justify-center items-center">
          <CiShoppingCart size="50px"/>
          <p className="text-xl font-semibold">Your cart is currently empty</p>
          <Link to="/">
            <button className="btn btn-primary mt-4 text-white">Start  shopping</button>
          </Link>
        </div>
      )}
    </div>
  );
}
