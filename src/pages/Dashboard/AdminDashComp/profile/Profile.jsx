import {useUser} from "../../../UserContext.jsx";

function Profile() {
  const {userData} = useUser();
  if (!userData) {
    return <p className="text-center mt-5 text-red-500">There is no info</p>;
  }

  return (
    <div className="justify-center  bg-gray-100 p-5 h-screen">
      <div className="bg-gray-200 rounded-full w-30 h-29 text-5xl flex justify-center place-items-center ">
        {" "}
        <p className="place-items-center p-5">{userData.name[0]}</p>
      </div>
      <h1 className="font-bold text-xl">{userData.name}</h1>
      <p className="">{userData.email}</p>
    </div>
  );
}export default Profile;
