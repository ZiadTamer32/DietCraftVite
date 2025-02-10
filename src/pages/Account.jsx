import useUser from "../features/auth/useUser";
import Spinner from "../ui/Spinner";

function Account() {
  const { user, isPending, isAuthenticated } = useUser();

  if (isPending) return <Spinner />;

  if (!isAuthenticated) return <p>You must log in first.</p>;

  return (
    <div className="min-h-screen">
      <h1>Account Details</h1>
      <p>First Name: {user?.user_metadata?.firstName || "N/A"}</p>
      <p>Last Name: {user?.user_metadata?.lastName || "N/A"}</p>
      <p>Email: {user?.email || "N/A"}</p>
      <p>User ID: {user?.id || "N/A"}</p>
    </div>
  );
}

export default Account;
