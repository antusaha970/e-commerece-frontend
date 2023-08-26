import { Link } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();
  const handleUpdateQty = (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
  };
  const handleDeleteItem = (product) => {
    dispatch(deleteItemFromCartAsync(product.id));
  };
  return (
    <div className="mx-auto bg-white rounded-sm shadow-sm max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
        <h2 className="font-bold text-5xl mb-4">Cart</h2>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/product-details/${product.id}`}>
                          {product.title}
                        </Link>
                      </h3>
                      <p className="ml-4">${product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.brand}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <p className="text-gray-500">Qty </p>
                      <select
                        onChange={(e) => handleUpdateQty(e, product)}
                        value={product.quantity}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => handleDeleteItem(product)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between my-4 border-b-2 border-gray-200 pb-3  text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${subTotal}</p>
        </div>
        <div className="flex justify-between my-4 text-base font-medium text-gray-900">
          <p>Total Items</p>
          <p>{totalItems}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to={"/checkout"}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
