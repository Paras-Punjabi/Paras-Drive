import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ loggedInStatus }) => {
  const router = useRouter();
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <span className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <Link href={"/"}>
            <span className="text-2xl cursor-pointer font-mono">
              Paras-Drive
            </span>
          </Link>
        </span>

        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href={"/"}>
            <span className="mr-5 hover:text-white hover:scale-110 hover:bg-slate-500 px-2 py-1 rounded cursor-pointer text-lg font-mono">
              Home
            </span>
          </Link>
          {loggedInStatus && (
            <Link href={"/notes"}>
              <span className="mr-5 hover:text-white hover:scale-110 hover:bg-slate-500 px-2 py-1 rounded cursor-pointer text-xl font-mono">
                Notes
              </span>
            </Link>
          )}
          {loggedInStatus && (
            <Link href={"/uploads"}>
              <span className="mr-5 hover:text-white hover:scale-110 hover:bg-slate-500 px-2 py-1 rounded cursor-pointer text-xl font-mono">
                Uploads
              </span>
            </Link>
          )}

          {!loggedInStatus && (
            <Link href={"/about"}>
              <span className="mr-5 hover:text-white hover:scale-110 hover:bg-slate-500 px-2 py-1 rounded cursor-pointer text-lg font-mono">
                About
              </span>
            </Link>
          )}
          {!loggedInStatus && (
            <Link href={"/contact"}>
              <span className="mr-5 hover:text-white hover:scale-110 hover:bg-slate-500 px-2 py-1 rounded cursor-pointer text-lg font-mono">
                Contact Us
              </span>
            </Link>
          )}
        </nav>

        {!loggedInStatus && router.pathname !== "/login" && (
          <Link href={"/login"}>
            <button className="text-lg font-mono bg-slate-600 hover:bg-slate-700 text-white border-0 py-1 px-4 focus:outline-none rounded text-center">
              Login
            </button>
          </Link>
        )}

        {!loggedInStatus && router.pathname === "/login" && (
          <Link href={"/"}>
            <button className="text-lg font-mono bg-slate-600 hover:bg-slate-700 text-white border-0 py-1 px-4 focus:outline-none rounded text-center">
              Create Account
            </button>
          </Link>
        )}

        {loggedInStatus && (
          <Link href={"/account"}>
            <MdAccountCircle
              title="Your Account"
              className="text-4xl cursor-pointer"
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
