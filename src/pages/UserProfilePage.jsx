import Footer from "../features/common/Footer/Footer";
import NavBar from "../features/navbar/NavBar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <>
      <NavBar>
        <UserProfile />
      </NavBar>
      <Footer />
    </>
  );
};

export default UserProfilePage;
