import AdminProductList from "../features/admin/components/AdminProductList";
import NavBar from "../features/navbar/NavBar";

const AdminHomePage = () => {
  return (
    <>
      <NavBar>
        <AdminProductList />
      </NavBar>
    </>
  );
};

export default AdminHomePage;
