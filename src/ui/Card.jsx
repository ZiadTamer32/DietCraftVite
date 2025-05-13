/* eslint-disable react/prop-types */
function Card({ children }) {
  return (
    <div className="p-5 transition-all bg-white border border-gray-100 rounded-lg shadow-sm">
      {children}
    </div>
  );
}
export default Card;
