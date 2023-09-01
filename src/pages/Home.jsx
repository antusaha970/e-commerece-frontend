import Footer from "../features/common/Footer/Footer";
import NavBar from "../features/navbar/NavBar";
import ProductList from "../features/product/components/ProductList";

const Home = () => {
  return (
    <>
      <NavBar>
        <ProductList />
      </NavBar>
      <Footer />
    </>
  );
};

export default Home;
