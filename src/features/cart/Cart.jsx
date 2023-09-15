/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  selectCartStatus,
  updateCartAsync,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { discountedPrice } from "../../app/utils";
import Loader from "../common/Loader/Loader";
import { Trash } from "lucide-react";

const Cart = ({ handleOrder }) => {
  const cartItems = useSelector(selectCartItems);
  const status = useSelector(selectCartStatus);
  const location = useLocation();
  const subTotal = cartItems.reduce(
    (acc, item) =>
      acc +
      discountedPrice(item.product.price, item.product.discountPercentage) *
        item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();
  const handleUpdateQty = (e, product) => {
    dispatch(updateCartAsync({ id: product.id, quantity: +e.target.value }));
  };
  const handleDeleteItem = (product) => {
    dispatch(deleteItemFromCartAsync(product.id));
  };
  return (
    <div className="mx-auto bg-white rounded-sm shadow-sm max-w-7xl px-4 sm:px-6 lg:px-8">
      {status === "idle" ? (
        <>
          <ProductCart
            cartItems={cartItems}
            subTotal={subTotal}
            totalItems={totalItems}
            handleDeleteItem={handleDeleteItem}
            location={location}
            handleOrder={handleOrder}
          />
        </>
      ) : (
        <div className="h-screen bg-white w-full flex justify-center items-center">
          <Loader text="Updating..." />
        </div>
      )}
    </div>
  );
};

export default Cart;

function ProductCart({
  cartItems,
  subTotal,
  totalItems,
  handleDeleteItem,
  location,
  handleOrder,
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold">Your cart</h2>
      <p className="mt-3 text-sm font-medium text-gray-700">
        Your products, if you want to shop more please go back to shop
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {cartItems.map((product) => (
          <li
            key={product.product.id}
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={product.product.thumbnail}
                alt={product.name}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                      <Link to={`/product-details/${product.product.id}`}>
                        {product.product.title}
                      </Link>
                    </h3>
                    <p className="text-sm">{product.product.brand}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      $
                      {discountedPrice(
                        product.product.price,
                        product.product.discountPercentage
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1 pl-0"
                    onClick={() => handleDeleteItem(product)}
                  >
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p>
          Total Items:
          <span className="font-semibold"> {totalItems}</span>
        </p>
        <p>
          Total amount:
          <span className="font-semibold"> ${subTotal}</span>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <Link
          to={"/"}
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </Link>
        {location?.pathname === "/cart" && (
          <>
            <Link
              to={"/checkout"}
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Checkout
            </Link>
          </>
        )}
        {location?.pathname === "/checkout" && (
          <button
            onClick={handleOrder && handleOrder}
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Order now
          </button>
        )}
      </div>
    </div>
  );
}
