import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";

function Box({ number }) {
  const weeks = [
    { title: "Week One" },
    { title: "Week Two" },
    { title: "Week Three" },
    { title: "Week Four" }
  ];

  return (
    <>
      {Array.from({ length: number }).map((_, i) => (
        <div
          key={i}
          className="w-full px-4 py-3 bg-white border border-gray-200 shadow-sm sm:px-6 sm:pt-4"
        >
          <h5 className="mb-2 text-xl font-bold text-gray-900">
            {weeks[i]?.title || "Week"}{" "}
          </h5>

          <div>
            <ul className="divide-y divide-gray-200">
              {Array.from({ length: 7 }).map((_, index) => (
                <li key={index} className="py-3 sm:py-4">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 font-medium text-gray-900 text-md">
                      <FaCalendarAlt />
                      Day {index + 1}
                    </p>
                    <Link
                      to={`/week/${i + 1}/day/${index + 1}`}
                      className="font-semibold text-gray-900"
                    >
                      <GoArrowRight size={20} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

export default Box;
