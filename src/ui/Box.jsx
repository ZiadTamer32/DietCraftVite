import { Link } from "react-router-dom";

function Box({ number }) {
  const customers = [
    {
      name: "Neil Sims",
      email: "email@windster.com",
      img: "/docs/images/people/profile-picture-1.jpg"
    },
    {
      name: "Bonnie Green",
      email: "email@windster.com",
      img: "/docs/images/people/profile-picture-3.jpg"
    },
    {
      name: "Michael Gough",
      email: "email@windster.com",
      img: "/docs/images/people/profile-picture-2.jpg"
    },
    {
      name: "Lana Byrd",
      email: "email@windster.com",
      img: "/docs/images/people/profile-picture-4.jpg"
    },
    {
      name: "Thomas Lean",
      email: "email@windster.com",
      img: "/docs/images/people/profile-picture-5.jpg"
    }
  ];
  return (
    <>
      {Array.from({ length: number }).map((_, i) => (
        <div
          key={i}
          className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900">
              Latest Customers
            </h5>
            <Link
              to="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {customers.map((customer, index) => (
                <li key={index} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={customer.img}
                        alt={`${customer.name} image`}
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {customer.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {customer.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      Read More --&gt;
                    </div>
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
