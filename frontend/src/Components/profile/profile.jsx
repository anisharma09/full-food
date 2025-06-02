// import { useContext } from "react";
// import { Context } from "../../main"; 
import "./profile.css";
import Navigation from "../Sidenav/sidenav";
const Profile = () => {
  // const { user } = useContext(Context);
  const user = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
    <Navigation/>
    <div className="p-container">

    <div className="profile-container">
      <h1>Profile</h1>
      <h2>Username: <span>{user.name}</span></h2>
      <h2>Email: <span>{user.email}</span></h2>
      <h2>Phone: <span>{user.phone}</span></h2>
      <h2>Role: <span>{user.role}</span></h2>
    </div>

    </div>
    </>
  );
}

export default Profile;
