import NavBar from "../features/navbar/NavBar";
import UserOrders from "../features/user/components/UserOrders";

const UserOrderPage = () => {
  return (
    <>
      <NavBar>
        <UserOrders />
      </NavBar>
    </>
  );
};

export default UserOrderPage;
