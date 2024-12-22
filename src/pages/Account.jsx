import useLogout from "../features/auth/useLogout";
import useUser from "../features/auth/useUser";
import SpinnerMini from "../ui/SpinnerMini";

function Account() {
  const { user } = useUser();
  const { logout, isPending } = useLogout();

  return (
    <div>
      {!user && <p>You must log in first</p>}

      {user && (
        <>
          <p>First Name : {user?.user_metadata?.firstName}</p>
          <p>Last Name : {user?.user_metadata?.lastName}</p>
          <p>Your Email : {user?.user_metadata?.email}</p>
          <p>Your Id : {user?.id}</p>
          <button
            className="btn-grad px-3 py-2"
            onClick={() => logout()}
            disabled={isPending}
          >
            {isPending ? <SpinnerMini></SpinnerMini> : "Sign Out"}
          </button>
        </>
      )}
    </div>
  );
}

export default Account;
