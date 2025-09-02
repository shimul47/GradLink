import React from "react";
import { use } from "react";
import { NavLink } from "react-router";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import useUserStatus from "../Hooks/useUserStatus";

const Header = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => { })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const { userStatus } = useUserStatus();

  return (
    <div className="shadow-sm bg-[#0b111f] text-white backdrop-blur-md fixed z-50 top-0 w-full">
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <Link className=" text-2xl font-bold">GradLink</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-5">
            <li>
              <NavLink>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>Contact</NavLink>
            </li>
            {userStatus != "verified" && user && (
              <li>
                <NavLink to={"/verify"}>Verify</NavLink>
              </li>
            )}
            {userStatus == "verified" && user && (
              <li>
                <NavLink to={"/allprojects"}>All Projects</NavLink>
              </li>
            )}
            {userStatus == "verified" && user && (
              <li>
                <NavLink to={"/dashboard"}>Dashboard</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <p className="hidden text-lg md:block">{user?.displayName}</p>
              <button
                onClick={handleSignOut}
                className="text-white shadow-none bg-gradient-to-r from-blue-500 to-emerald-400 hover:to-emerald-600 btn border-none rounded-lg font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                <button className="btn shadow-sm border-none shadow-emerald-500 btn-primary bg-black text-white mr-2">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="text-white shadow-none bg-gradient-to-r from-blue-500 to-emerald-400 hover:to-emerald-600 btn border-none rounded-lg font-medium transition-colors duration-200">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
