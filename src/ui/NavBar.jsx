import { Link, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { useState } from "react";

function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const session = null;
  const menu = [
    { id: 1, label: "Diet Recommendation", href: "/diet-recommendation" },
    { id: 2, label: "Custom Food Recommendation", href: "/custom-diet" },
    { id: 3, label: "Browse Foods", href: "/browse-foods" }
  ];

  function handleClick() {
    setMenuOpen(false);
  }

  return (
    <nav className="bg-[#095c43] ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={() => handleClick()}
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            DietCraft
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {session?.user?.image ? (
            <Link
              to="/account"
              className="max-md:hidden flex items-center text-white gap-2 px-3 py-2"
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                className="rounded-full w-10 h-10"
              />
              Your Profile
            </Link>
          ) : (
            <Link
              to="/account"
              className="max-md:hidden flex items-center justify-center text-white gap-2 px-3"
            >
              <FaUserAlt className="w-5 h-5" />
              Guest Area
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden text-white"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <RiCloseLargeFill />
            ) : (
              <IoMenu className="w-10 h-10" />
            )}
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen
              ? "max-md:max-h-screen max-md:opacity-100"
              : "max-md:max-h-0 max-md:opacity-0"
          } max-md:overflow-hidden max-md:transition-all max-md:duration-500 max-md:ease-in-out`}
        >
          <ul className="flex flex-col md:flex-row gap-4 font-medium max-md:p-4 max-md:mt-5 max-md:border max-md:border-gray-500 max-md:bg-[#052e22] rounded-lg">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                  onClick={() => handleClick()}
                  to={item.href}
                  className={`block text-white py-[0.55rem] px-3 sm:mb-0 mb-2 ${
                    location.pathname === item.href
                      ? "bg-[#031c14] rounded-lg"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {session?.user?.image ? (
              <Link
                to="/account"
                className="max-md:flex hidden items-center gap-2 px-3 py-2"
                onClick={() => handleClick()}
              >
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="rounded-full w-10 h-10"
                />
                Your Profile
              </Link>
            ) : (
              <Link
                to="/account"
                className="max-md:flex hidden items-center gap-2 px-3 py-2 text-white"
                onClick={() => handleClick()}
              >
                <FaUserAlt />
                Guest Area
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
