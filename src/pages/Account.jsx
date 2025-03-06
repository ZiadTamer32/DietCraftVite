import useUser from "../features/auth/useUser";
import usePlan from "../features/DietRecommendation/usePlan";
import Spinner from "../ui/Spinner";
import PlanForm from "../ui/PlanForm";
import { FaUserCircle, FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function Account() {
  const { user, isPending, isAuthenticated } = useUser();
  const { plan, isPending: isPlanning } = usePlan(user?.email);

  // Show a full-page spinner while loading user or plan data
  if (isPending || isPlanning) return <Spinner />;

  // Redirect or show a message if the user is not authenticated
  if (!isAuthenticated) return <p>You must log in first.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* User Profile Section */}
      <div className="p-8 mx-auto mb-8 bg-white rounded-lg shadow-md max-w-8xl">
        <div className="flex items-center gap-4 mb-6">
          <FaUserCircle className="text-6xl text-gray-400" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.user_metadata?.firstName || "User"}{" "}
              {user?.user_metadata?.lastName}
            </h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Diet Plan Section */}
      <div className="p-8 mx-auto mb-8 bg-white rounded-lg shadow-md max-w-8xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Your Diet Plans
        </h2>
        {Array.isArray(plan) && plan.length > 0 ? (
          <div className="space-y-4">
            {plan.map((planItem, index) => (
              <PlanForm key={index} planItem={planItem} email={user?.email} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-gray-600">
              No saved diet plans found. Create a new plan to get started!
            </p>
            <Link
              to="/create-plan"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              <FaPlus /> Create New Plan
            </Link>
          </div>
        )}
      </div>

      {/* Account Settings Section */}
      <div className="p-8 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Account Settings
        </h2>
        <div className="space-y-4">
          <button className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Change Password
          </button>
          <button className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Update Email Address
          </button>
          <button className="w-full px-4 py-2 text-sm font-medium text-left text-red-600 bg-red-100 rounded-lg hover:bg-red-200">
            Delete Account
          </button>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <p className="text-gray-600">
          Success is the sum of small efforts, repeated day in and day out
        </p>
      </div>
    </div>
  );
}

export default Account;
