import Footer from "../features/common/Footer/Footer";
import NavBar from "../features/navbar/NavBar";
import OfferEmail from "../features/offer-email/components/OfferEmail";
import ProductList from "../features/product/components/ProductList";

const Home = () => {
  return (
    <>
      <NavBar>
        <ProductList />
        <OfferEmail />
      </NavBar>
      <Footer />
    </>
  );
};

export default Home;
