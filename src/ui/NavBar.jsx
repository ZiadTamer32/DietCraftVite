import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { useState, useCallback, useMemo } from "react";
import { TbLogout2 } from "react-icons/tb";
import SpinnerMini from "../ui/SpinnerMini";
import useUser from "../features/auth/useUser";
import useLogout from "../features/auth/useLogout";

function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { logout, isPending } = useLogout();

  const menu = useMemo(
    () => [
      { id: 1, label: "Diet Recommendation", href: "/diet-recommendation" },
      { id: 2, label: "Custom Food Recommendation", href: "/custom-diet" },
      { id: 3, label: "Browse Foods", href: "/browse-foods" }
    ],
    []
  );

  const handleClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <nav>
      <div className="w-full bg-[#095c43] flex items-center justify-between p-3">
        <div className="flex items-center justify-center gap-20">
          <Link to="/">
            <span className="self-center pl-3 text-2xl font-semibold text-white whitespace-nowrap sm:pl-7">
              DietCraft
            </span>
          </Link>
          <ul className="items-center justify-center hidden gap-5 font-semibold text-white lg:flex">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.href}
                  className={`block text-white py-[0.55rem] px-3 ${
                    location.pathname === item.href
                      ? "bg-[#031c14] rounded-xl"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden gap-4 lg:flex">
          {!user ? (
            <>
              <button className="btn">
                <Link
                  to="/login"
                  className="flex items-center justify-center text-white gap-x-2"
                >
                  <LuLogIn />
                  <span className="block mb-1">Login</span>
                </Link>
              </button>
              <button className="btn">
                <Link
                  to="/signup"
                  className="flex items-center justify-center text-white gap-x-2"
                >
                  <RiAccountCircleFill className="w-5 h-5" />
                  <span className="block mb-1">SignUp</span>
                </Link>
              </button>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">
                <button className="btn">
                  <Link
                    to="/account"
                    className="flex items-center justify-center gap-3"
                  >
                    <FaUserAlt className="w-5 h-5" />
                    Your Profile
                    {/* {user.user_metadata.firstName} {user.user_metadata.lastName} */}
                  </Link>
                </button>
              </p>
              <p className="font-semibold text-white">
                <button
                  className="btn"
                  onClick={() => {
                    logout({}, { onSuccess: () => navigate("/") });
                  }}
                >
                  <Link className="flex items-center justify-center text-white">
                    {isPending ? (
                      <SpinnerMini />
                    ) : (
                      <span className="flex items-center justify-center gap-x-2">
                        <TbLogout2 className="w-5 h-5" />{" "}
                        <span className="block mb-1">Logout</span>
                      </span>
                    )}
                  </Link>
                </button>
              </p>
            </>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          type="button"
          className="items-center justify-center hidden w-10 h-10 p-2 text-sm text-white max-lg:inline-flex"
          aria-expanded={isMenuOpen ? "true" : "false"}
          style={{ zIndex: isMenuOpen ? "101" : "100" }}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <RiCloseLargeFill className="w-10 h-10" />
          ) : (
            <IoMenu className="w-10 h-10" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="top-0 left-0 z-40 items-center justify-center hidden w-full h-full bg-black max-lg:fixed bg-opacity-90 max-lg:flex">
          <ul className="flex flex-col items-center space-y-6 text-xl text-white">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                  onClick={handleClick}
                  to={item.href}
                  className={`hover:underline ${
                    location.pathname === item.href ? "font-bold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link
                    onClick={handleClick}
                    to="/account"
                    className={`flex items-center justify-center gap-3 hover:underline ${location.pathname === "/account" ? "font-bold" : ""}`}
                  >
                    <FaUserAlt className="w-5 h-5" />
                    {/* {user.user_metadata.firstName} {user.user_metadata.lastName} */}
                    Your Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout(
                        {},
                        {
                          onSuccess: () => {
                            handleClick(), navigate("/");
                          }
                        }
                      );
                    }}
                  >
                    <Link className="text-white hover:underline">
                      {isPending ? (
                        <SpinnerMini />
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <TbLogout2 className="p-0 w-7 h-7" />{" "}
                          <span className="block mb-1">Logout</span>
                        </span>
                      )}
                    </Link>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center justify-center text-white gap-x-2 hover:underline"
                    onClick={handleClick}
                  >
                    <LuLogIn />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center text-white gap-x-2 hover:underline"
                    onClick={handleClick}
                  >
                    <RiAccountCircleFill className="w-7 h-7" />
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
