import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Product, ProductDetails } from "../pages";
import { Spinner } from "../components";
import Search from "../pages/search/Search";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import { PrivateRoutes, PublicRoutes } from "./ProtectedRoutes";
import Signup from "../pages/signup/Signup";
import AllProducts from "../pages/admin/AllProducts";
import Create from "../pages/admin/create/Create";
import EditProduct from "../pages/admin/EditProduct";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Orders from "../pages/orders/Orders";
import OrderDetail from "../pages/orders/OrderDetail";
import YourOrders from "../pages/orders/YourOrders";

const Root = lazy(() => import("../layouts/Roots"));
const Auth = lazy(() => import("../layouts/Auth"));

export default function Approutes() {
  const routes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<Spinner />}>
          <Root />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products/:categoryName",
          element: <Product />,
        },
        {
          path: "product/:productTitle",
          element: <ProductDetails />,
        },
        {
          path: "search",
          element: <Search />,
        },

        {
          path: "profile",
          element: (
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          ),
        },
        {
          path: "create",
          element: (
            <PrivateRoutes>
              <Create />
            </PrivateRoutes>
          ),
        },
        {
          path: "allproducts",
          element: (
            <PrivateRoutes>
              <AllProducts />
            </PrivateRoutes>
          ),
        },
        {
          path: "product/edit/:productId/:title",
          element: (
            <PrivateRoutes>
              <EditProduct />
            </PrivateRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          ),
        },
        {
          path:"checkout",
          element:(
            <PrivateRoutes>
              <Checkout/>
            </PrivateRoutes>
          )
        },
        {
          path:"orders",
          element:<PrivateRoutes>
            <Orders/>
          </PrivateRoutes>
        },
        {
          path:"orders/:orderId",
          element:<PrivateRoutes>
          <OrderDetail/>
        </PrivateRoutes>
        },
        {
          path:"your-orders",
          element:(
            <PrivateRoutes>
              <YourOrders/>
            </PrivateRoutes>
          )
        }
      ],
    },
    {
      element: (
        <Suspense fallback={<Spinner />}>
          <PublicRoutes>
            <Auth />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
