import useUser from "../features/auth/useUser";
import usePlan from "../features/DietRecommendation/usePlan";
import Spinner from "../ui/Spinner";
import PlanForm from "../ui/PlanForm";

function Account() {
  const { user, isPending, isAuthenticated } = useUser();
  const { plan, isPending: isPlanning } = usePlan(user?.email);

  if (isPending || isPlanning) return <Spinner />;

  if (!isAuthenticated) return <p>You must log in first.</p>;

  return (
    <div className="min-h-screen">
      <h1>Account Details</h1>
      <p>First Name: {user?.user_metadata?.firstName || "N/A"}</p>
      <p>Last Name: {user?.user_metadata?.lastName || "N/A"}</p>
      <p>Email: {user?.email || "N/A"}</p>
      <div className="max-w-[300px] mx-auto border border-gray-200 p-6">
        {plan && plan.length > 0 ? (
          plan.map((planItem, index) => (
            <PlanForm key={index} planItem={planItem} email={user?.email} />
          ))
        ) : (
          <p>No plan available.</p>
        )}
      </div>
    </div>
  );
}

export default Account;
