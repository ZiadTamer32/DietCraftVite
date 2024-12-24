import useUser from "../features/auth/useUser";

function Account() {
  const { user } = useUser();

  return (
    <div className="min-h-screen">
      {!user && <p>You must log in first</p>}

      {user && (
        <>
          <p>First Name : {user?.user_metadata?.firstName}</p>
          <p>Last Name : {user?.user_metadata?.lastName}</p>
          <p>Your Email : {user?.user_metadata?.email}</p>
          <p>Your Id : {user?.id}</p>
        </>
      )}
    </div>
  );
}

export default Account;
