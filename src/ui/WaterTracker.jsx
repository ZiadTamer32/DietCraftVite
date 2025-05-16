/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTint, FaPlus, FaMinus } from "react-icons/fa";

// Placeholder for Button component
const Button = ({ variant, size, onClick, disabled, icon, children, className }) => {
  const baseStyles = "flex items-center justify-center font-medium rounded-lg transition-colors";
  const variantStyles = variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-blue-600 border border-blue-600 hover:bg-gray-100";
  const sizeStyles = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${className || ""}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Placeholder for Card component
const Card = ({ className, children }) => {
  return <div className={`bg-white shadow-md rounded-lg p-4 ${className || ""}`}>{children}</div>;
};

// Placeholder for ProgressBar component
const ProgressBar = ({ progress, height, color, background, showLabel, className }) => {
  return (
    <div className={`w-full ${background} ${className}`}>
      <div
        className={`${height} ${color} transition-all duration-300 rounded-xl`}
        style={{ width: `${progress}%` }}
      />
      {showLabel && <span className="text-sm">{`${Math.round(progress)}%`}</span>}
    </div>
  );
};

const WaterTracker = ({ className }) => {
  const [glasses, setGlasses] = useState(0);
  const targetGlasses = 8; // Default target: 8 glasses of water

  const addWater = (amount = 1) => {
    setGlasses((prev) => Math.min(prev + amount, targetGlasses * 1.5)); // Allow up to 150% of target
  };

  const removeWater = (amount = 1) => {
    setGlasses((prev) => Math.max(prev - amount, 0));
  };

  const progress = Math.min((glasses / targetGlasses) * 100, 100);

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <FaTint size={20} className="mr-2 text-blue-400" /> Water Tracker
        </h2>
        <span className="text-sm text-gray-500">
          {glasses}/{targetGlasses} glasses
        </span>
      </div>

      <div className="mb-6">
        <ProgressBar
          progress={progress}
          height="h-3" // Thin height to match the photo
          color="bg-blue-400"
          background="bg-gray-200"
          showLabel={false}
          className="rounded-full w-full" // Rounded ends and full width
        />
      </div>

      <div className="flex items-center justify-center mb-4 space-x-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div
            key={index}
            className={`w-8 h-12 border-2 border-gray-800 rounded-b-lg flex items-end justify-center transition-all cursor-pointer hover:opacity-80 ${
              index <= glasses ? "bg-blue-400" : "bg-gray-200"
            }`}
            onClick={() => setGlasses(index)}
            title={`Set to ${index} glasses`}
          >
            <div className="w-full bg-white rounded-b-lg h-1/4 bg-opacity-20" />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => removeWater()}
          disabled={glasses === 0}
          className="mr-2"
          icon={<FaMinus size={16} />}
        >
          Remove
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addWater()}
          disabled={glasses === 8}
          icon={<FaPlus size={16} />}
        >
          Add Water
        </Button>
      </div>

      <div className="mt-4 text-xs text-center text-gray-500">
        {glasses >= targetGlasses ? (
          <p className="text-green-600">
            Great job! You&apos;ve reached your daily water goal.
          </p>
        ) : (
          <p>{`${targetGlasses - glasses} more glasses to reach your daily goal.`}</p>
        )}
      </div>
    </Card>
  );
};

export default WaterTracker;