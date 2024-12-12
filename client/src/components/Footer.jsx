import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#f7f3ea] w-[100%] flex gap-[4rem] px-[10em] py-[2rem] link">
      <div className="flex flex-col gap-[.25rem]">
        <Link className="font-bold text-xl mb-[.5rem]">Information</Link>
        <Link>About Us</Link>
        <Link>Shipping Policy</Link>
        <Link>Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-[.25rem]">
      <Link className="font-bold text-xl mb-[.5rem]">Customer Service</Link>
        <Link>Contact Us</Link>
        <Link>Return policyPolicy</Link>
      </div>
      <div className="flex flex-col gap-[.25rem]">
      <Link className="font-bold text-xl mb-[.5rem]">My Account</Link>
        <Link>Sign In</Link>
        <Link>Orders</Link>
      </div>
    </div>
  )
}
