import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/customer/Home";
import Order from "./pages/customer/Order";
import Login from "./pages/Login";

const Layout = () => {
   return (
      <div className="app">
         <Navbar />
         <Outlet />
         <Footer />
      </div>
   )
}

const router = createBrowserRouter([{
   path: "/",
   element: <Layout />,
   children: [
      {
         path: "/customer/home",
         element: <Home />
      },
      {
         path: "/customer/order",
         element: <Order />
      },
      {
         path: "/Login",
         element: <Login />
      },
   ]
}]);

function App() {
   return (
      <div>
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
