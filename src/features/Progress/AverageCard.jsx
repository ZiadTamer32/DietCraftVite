/* eslint-disable react/prop-types */
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoBarbellOutline } from "react-icons/io5";
import { LiaCookieSolid } from "react-icons/lia";
import { GiCheeseWedge } from "react-icons/gi";

function AverageCard({
  AverageName,
  AverageNumber,
  isPending,
  icon,
  timeFilter,
}) {
  // Map icons based on the metric
  const getIcon = () => {
    if (AverageName.includes("Calories"))
      return <MdOutlineLocalFireDepartment size={20} />;
    if (AverageName.includes("Protein")) return <IoBarbellOutline size={20} />;
    if (AverageName.includes("Carbs")) return <LiaCookieSolid size={20} />;
    if (AverageName.includes("Fat")) return <GiCheeseWedge size={20} />;

    return icon;
  };

  return (
    <div className="flex flex-col p-4 transition-all duration-300 bg-white border rounded-lg shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{AverageName}</h3>
        <span className="text-gray-400">{getIcon()}</span>
      </div>
      {isPending ? (
        <div className="h-8 my-2 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <p className="my-2 text-2xl font-semibold">{AverageNumber}</p>
      )}
      <p className="text-xs text-gray-400 capitalize">{timeFilter} average</p>
    </div>
  );
}

export default AverageCard;
