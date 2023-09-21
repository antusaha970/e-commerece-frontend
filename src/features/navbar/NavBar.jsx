import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../cart/cartSlice";

import { Menu, X } from "lucide-react";
import { signOutAsync } from "../auth/authSlice";
import { resetUserInfo, selectLoggedInUserInfo } from "../user/userSlice";
import { toast } from "react-toastify";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Profile",
    href: "/user-profile",
  },
  {
    name: "Orders",
    href: "/user-orders",
  },
];

// eslint-disable-next-line react/prop-types
const NavBar = ({ children }) => {
  const cartItems = useSelector(selectCartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectLoggedInUserInfo);
  const [showCartLink, setShowCartLink] = useState(false);
  const [showAdminPanelLink, setShowAdminPanelLink] = useState(false);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      setShowCartLink(true);
      setShowAdminPanelLink(false);
    }
    if (user && user?.role === "user") {
      setShowCartLink(true);
    } else {
      setShowCartLink(false);
    }
    if (user && user?.role === "admin") {
      setShowAdminPanelLink(true);
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSingOut = () => {
    dispatch(signOutAsync());
    dispatch(resetUserInfo());
    toast.success("Successfully logged out", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
      <div className="min-h-full">
        <div className="relative w-full bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2">
              <Link to={"/"}>
                <img
                  className="h-10 w-full"
                  src="/logo.png"
                  alt="Your Company"
                />
              </Link>
            </div>
            <div className="hidden lg:block">
              <ul className="ml-12 inline-flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {showCartLink && (
                  <Link
                    to={"/cart"}
                    className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                  >
                    cart&nbsp;&nbsp;
                    <ShoppingCartIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />{" "}
                    {cartItems.length > 0 && (
                      <span className="font-bold -mt-2 ">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                )}
                {showAdminPanelLink && (
                  <>
                    <Link
                      to={"/admin"}
                      className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                    >
                      Admin panel
                    </Link>
                    <Link
                      to={"/admin/view-orders"}
                      className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                    >
                      View Orders
                    </Link>
                  </>
                )}
              </ul>
            </div>
            <div className="flex grow justify-end"></div>
            <div className="relative">
              <div className="ml-2 mt-2 hidden lg:block">
                <span className="relative inline-block">
                  <img
                    onClick={() => setShowDropDownMenu((prvState) => !prvState)}
                    className="h-10 cursor-pointer w-10 rounded-full"
                    src="https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                    alt="user"
                  />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
                </span>
                {showDropDownMenu && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    {user && (
                      <button
                        onClick={handleSingOut}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        Logout
                      </button>
                    )}
                    {!user && (
                      <Link
                        to={"/login"}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="ml-2 lg:hidden">
              <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
            </div>
            {isMenuOpen && (
              <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pb-6 pt-5">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center space-x-2">
                        <Link to={"/"}>
                          <img
                            className="h-10 w-full"
                            src="/logo.png"
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      <div className="-mr-2">
                        <button
                          type="button"
                          onClick={toggleMenu}
                          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-4">
                        {menuItems.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        {showCartLink && (
                          <Link
                            to={"/cart"}
                            className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                          >
                            cart&nbsp;&nbsp;
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />{" "}
                            {cartItems.length > 0 && (
                              <span className="font-bold -mt-2 ">
                                {cartItems.length}
                              </span>
                            )}
                          </Link>
                        )}
                        {showAdminPanelLink && (
                          <>
                            <Link
                              to={"/admin"}
                              className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                            >
                              Admin panel
                            </Link>
                            <Link
                              to={"/admin/view-orders"}
                              className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                            >
                              View Orders
                            </Link>
                          </>
                        )}
                      </nav>
                    </div>
                    <div className="ml-3 mt-4 flex items-center space-x-2">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                        alt="user"
                      />
                      <span className="flex flex-col">
                        {user && (
                          <button
                            onClick={handleSingOut}
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            id="user-menu-item-2"
                          >
                            Logout
                          </button>
                        )}
                        {!user && (
                          <Link
                            to={"/login"}
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            id="user-menu-item-2"
                          >
                            Login
                          </Link>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default NavBar;
