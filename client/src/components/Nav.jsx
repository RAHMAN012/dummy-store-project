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
    <div className="lg:py-12 px-4 z-50 lg:pl-[4rem] py-4   sticky top-0  bg-slate-50">
      <div className="max-w-[1204px] flex justify-between items-center">
        <NavLink to="/" className="font-bold text-xl flex items-center gap-1 ">
          <RiStore2Line className="text-[green] " />
          DUMMY STORE
        </NavLink>
        <div className="flex items-center gap-2 hidden lg:block">
          <>
            {cats.map((item, index) => (
              <NavLink
                to={`/products/${item.name}`}
                key={index}
                className="font-semibold mx-4  capitalize"
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
            ))}
          </>
        </div>
        <div className="flex gap-[1rem] items-center">
          <CiSearch
            className="cursor-pointer"
            onClick={() => handleShowSearch(true)}
            size="1.25rem"
          />
          <div className="relative">
            <BsHandbag size="24px" />
            {cartQuantity > 0 && (
              <div className="badge absolute top-[-10px] text-white border-none right-[-5px]  bg-success badge-sm">
                {cartQuantity}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <>
              <details className="dropdown dropdown-end">
                <summary className="btn m-1">Hi, {authUser.username}</summary>
                <ul className="text-[lightgray] font-bold menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  {authUser.role.includes("admin") && (
                    <>
                      <li>
                        <Link to="/create">Create</Link>
                      </li>
                      <li>
                        <Link to="/allproducts">Products</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <span onClick={logout}>Logout</span>
                  </li>
                </ul>
              </details>
            </>
          ) : (
            <NavLink to="/login">
              <RxPerson size="20px" className="cursor-pointer" />
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
