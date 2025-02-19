import useUser from "../features/auth/useUser";
import usePlan from "../features/DietRecommendation/usePlan";
import Spinner from "../ui/Spinner";
import PlanForm from "../ui/PlanForm";

function Account() {
  const { user, isPending, isAuthenticated } = useUser();
  const { plan, isPending: isPlanning } = usePlan(user?.email);

  // Show a full-page spinner while loading user or plan data
  if (isPending || isPlanning) return <Spinner />;

  // Redirect or show a message if the user is not authenticated
  if (!isAuthenticated) return <p>You must log in first.</p>;

  return (
    <div className="">
      <h1>Account Details</h1>
      <p>First Name: {user?.user_metadata?.firstName || "N/A"}</p>
      <p>Last Name: {user?.user_metadata?.lastName || "N/A"}</p>
      <p>Email: {user?.email || "N/A"}</p>
      <div className="max-w-[300px] mx-auto border border-gray-200 p-6">
        {Array.isArray(plan) && plan.length > 0 ? ( // Check if plan is an array and has items
          plan.map((planItem, index) => (
            <PlanForm key={index} planItem={planItem} email={user?.email} />
          ))
        ) : (
          <p>
            9 No saved diet plans found. You can create a new plan by filling
            out the form below.
          </p>
        )}
      </div>
    </div>
  );
}

export default Account;
