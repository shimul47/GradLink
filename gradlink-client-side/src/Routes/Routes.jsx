import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Verify from "../pages/Verify";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error></Error>,

    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/signup',
        Component: SignUp,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/contact',
        Component: Contact,
      },
      {
        path: '/verify',
        Component: Verify,
      },


    ]
  },
]);