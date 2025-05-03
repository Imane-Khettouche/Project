import { useUser } from "../../../UserContext.jsx";

function Profile() {
  const { userData } = useUser();

  if (!userData) {
    return <p className="text-center mt-5 text-red-500">There is no info</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center text-4xl font-bold text-white">
          {userData.name[0]}
        </div>
      </div>

      {/* User Info */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">{userData.name}</h1>
        <p className="text-gray-600">{userData.email}</p>
      </div>

      {/* Additional Info (Optional) */}
      <div className="mt-6 text-center">
        {/* You can add more information like Bio, Phone, etc. */}
      </div>
    </div>
  );
}

export default Profile;
