import Footer from "../features/common/Footer/Footer";
import NavBar from "../features/navbar/NavBar";
import ProductDetails from "../features/product/components/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <>
      <NavBar>
        <ProductDetails />
      </NavBar>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
