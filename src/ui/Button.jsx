/* eslint-disable react/prop-types */
function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  className = "",
  variant = "primary" // primary, secondary, danger
}) {
  const baseStyles =
    "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors";
  const variantStyles = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {isLoading ? (
        <span className="animate-spin">🌀</span> // Replace with your spinner
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
