import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/customer/Home";
import Order from "./pages/customer/Order";
import Delivery from "./pages/customer/Delivery";
import Profile from "./pages/customer/Profile";

const Layout = () => {
   return (
      <div className="app">
         <Navbar />
         <Outlet />
         <Footer />
      </div>
   )
}

const router = createBrowserRouter([
   {
      path: "/login",
      element: <Login />
   }, {
      path: "/register",
      element: <Register />
   }, {
      path: "/",
      element: <Layout />,
      children: [
         {
            path: "/",
            element: <Home />
         }, {
            path: "order",
            element: <Order />
         },{
            path: "delivery",
            element: <Delivery />
         },{
            path: "profile",
            element: <Profile />
         }
      ]
   }
]);

function App() {
   return (
      <div>
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
