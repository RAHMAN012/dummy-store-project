import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <>
      <div className="max-w-screen mx-auto  md:flex  items-center">
        <div className="md:w-[55%] lg:w-[65%] hidden md:flex items-center justify-center bg-black  h-screen ">
          <div className="">
            <h1 className="text-6xl font-bold text-white">DUMMY STORE</h1>
            <h1 className="text-2xl font-semibold text-white">
            {/* bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-50 */}
              Login to continue your purchase
            </h1>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
