/* eslint-disable react/prop-types */
function ProgressBar({
  progress,
  height = "h-2",
  color = "bg-dietcraft-500",
  className = "",
  showLabel = false,
  animation = true
}) {
  // Ensure progress is between 0-100
  const validProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      <div
        className="w-full overflow-hidden bg-gray-100 rounded-full"
        style={{ height: height }}
      >
        <div
          className={`${color} rounded-full ${animation ? "transition-all ease-in-out duration-1000" : "transition-all duration-700"}`}
          style={{ width: `${validProgress}%`, height: "100%" }}
          role="progressbar"
          aria-valuenow={validProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-right text-gray-500">
          {Math.round(validProgress)}%
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
