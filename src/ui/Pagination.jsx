import PropTypes from "prop-types";

function Pagination({ postsPerPage, totalPosts, setCurrentPage, currentPage }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startEntry = (currentPage - 1) * postsPerPage + 1;
  const endEntry = Math.min(currentPage * postsPerPage, totalPosts);

  const handlePaginate = (pageNumber, e) => {
    e.preventDefault();
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col items-center sm:items-end">
      {/* Help text */}
      <span className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-semibold text-gray-900">{startEntry}</span> to{" "}
        <span className="font-semibold text-gray-900">{endEntry}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalPosts}</span>{" "}
        Entries
      </span>

      {/* Buttons */}
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={(e) => handlePaginate(currentPage - 1, e)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white border rounded-s ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>

        <button
          onClick={(e) => handlePaginate(currentPage + 1, e)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white border-0 border-s rounded-e ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
