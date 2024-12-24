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
        <div className="flex items-center justify-center gap-32">
          <Link to="/">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white sm:pl-7 pl-3">
              DietCraft
            </span>
          </Link>
          <ul className="lg:flex hidden items-center justify-center text-white font-semibold gap-5">
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
        <div className="lg:flex hidden gap-4">
          {!user ? (
            <>
              <button className="btn">
                <Link
                  to="/login"
                  className="text-white flex items-center justify-center gap-x-2"
                >
                  <LuLogIn />
                  <span className="block mb-1">Login</span>
                </Link>
              </button>
              <button className="btn">
                <Link
                  to="/signup"
                  className="text-white flex items-center justify-center gap-x-2"
                >
                  <RiAccountCircleFill className="w-5 h-5" />
                  <span className="block mb-1">SignUp</span>
                </Link>
              </button>
            </>
          ) : (
            <>
              <p className="text-white font-semibold">
                <button className="btn">
                  <Link
                    to="/account"
                    className="flex items-center justify-center gap-3"
                  >
                    <FaUserAlt className="w-5 h-5" />
                    {user.user_metadata.firstName} {user.user_metadata.lastName}
                  </Link>
                </button>
              </p>
              <p className="text-white font-semibold">
                <button
                  className="btn"
                  onClick={() => {
                    logout({}, { onSuccess: () => navigate("/") });
                  }}
                >
                  <Link className="text-white flex items-center justify-center">
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
          className="max-lg:inline-flex hidden items-center p-2 w-10 h-10 justify-center text-sm text-white"
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
        <div className="max-lg:fixed hidden top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40 max-lg:flex items-center justify-center">
          <ul className="flex flex-col items-center space-y-6 text-white text-2xl">
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
                    className="flex items-center justify-center gap-3 hover:underline"
                  >
                    <FaUserAlt className="w-5 h-5" />
                    {user.user_metadata.firstName} {user.user_metadata.lastName}
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
                          <TbLogout2 className="w-7 h-7 p-0" />{" "}
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
                    className="text-white flex items-center justify-center gap-x-2 hover:underline"
                    onClick={handleClick}
                  >
                    <LuLogIn />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-white flex items-center justify-center gap-x-2 hover:underline"
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
