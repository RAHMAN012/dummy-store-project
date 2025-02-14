import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { RiStore2Line } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { useAuth } from "../hooks/useStore";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

export default function Nav() {
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout, cartQuantity } = useAuth();
  const { data: authUser, isAuthenticated } = user;

  const handleShowSearch = () => {
    setShowSearch((prev) => !prev);
  };
  // console.log(data);
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
  ];
  return (
    <div className="lg:py-5 px-4 z-50 lg:pl-[4rem] py-4   sticky top-0  bg-black opacity-95">
      <div className="max-w-[1204px] flex justify-between items-center">
        <NavLink
          to="/"
          className="font-bold text-[0.85rem] md:text-xl text-white flex items-center gap-1 "
        >
          <RiStore2Line className="text-[white]  " />
          DUMMY STORE
        </NavLink>
        <div className="  flex items-center gap-2 text-white  hidden lg:block">
          <>
            {cats.map((item, index) => (
              <NavLink
                to={`/products/${item.name}`}
                key={index}
                className="font-semibold  mx-4  capitalize"
              >
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? "text-blue-400" : " hover:text-gray-400"
                    }
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </>
        </div>
        <div className="flex gap-[1rem] items-center">
          <CiSearch
            className="cursor-pointer text-white font-bold"
            onClick={() => handleShowSearch(true)}
            size="1.5rem"
          />
          <div className="relative">
            <Link to="/cart">
              <BsHandbag size="24px" className="text-white" />
            </Link>
            {cartQuantity > 0 && (
              <div className="badge absolute top-[-10px] text-black border-none right-[-5px]  bg-white badge-sm">
                {cartQuantity}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <>
              <details className="dropdown dropdown-end ">
                <summary className="btn m-1">Hi, {authUser.username}</summary>
                <ul className="text-[lightgray] font-bold menu dropdown-content bg-black   text-white rounded-box z-[1] w-52 p-2 shadow">
                  <li className="hover:bg-white hover:text-black">
                    <Link to="/profile">Profile</Link>
                  </li>
                  {authUser.role.includes("admin") && (
                    <>
                      <li className="hover:bg-white hover:text-black">
                        <Link to="/create">Create</Link>
                      </li>
                      <li className="hover:bg-white hover:text-black">
                        <Link to="/allproducts">Products</Link>
                      </li>
                      <li className="hover:bg-white hover:text-black">
                        <Link to="/orders">Orders</Link>
                      </li>
                    </>
                  )}
                  <li className="hover:bg-white hover:text-black">
                    <Link to="/your-orders">Your Orders</Link>
                  </li>
                  <li className="hover:bg-white hover:text-black">
                    <span onClick={logout}>Logout</span>
                  </li>
                </ul>
              </details>
            </>
          ) : (
            <NavLink to="/login" className="flex gap-1">
              <RxPerson size="20px" className="cursor-pointer text-white" />
              <p className="text-white">Sign In</p>
            </NavLink>
          )}
          <div className="lg:hidden">
            {/* DRAWER */}
            <div className="drawer  ">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="cursor-pointer  ">
                  <FiMenu size="24px" />
                </label>
              </div>
              <div className="drawer-side ">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-slate-300 text-base-content min-h-full w-80 py-4 ">
                  {/* Sidebar content here */}
                  <div className="flex justify-end items-center cursor-pointer">
                    <AiOutlineClose
                      className="mb-3 mr-4"
                      onClick={() =>
                        (document.getElementById("my-drawer").checked = false)
                      }
                      size="24px"
                    />
                  </div>
                  {cats.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        onClick={() =>
                          (document.getElementById("my-drawer").checked = false)
                        }
                        to={`/products/${item.name}`}
                        className="font-semibold my-1 capitalize"
                      >
                        {({ isActive }) => (
                          <span
                            className={
                              isActive ? "text-blue-400" : "hover:text-gray-400"
                            }
                          >
                            {item.name}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSearch && <SearchBox handleShowSearch={handleShowSearch} />}
    </div>
  );
}
