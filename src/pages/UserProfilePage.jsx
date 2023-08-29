import NavBar from "../features/navbar/NavBar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <>
      <NavBar>
        <UserProfile />
      </NavBar>
    </>
  );
};

export default UserProfilePage;
