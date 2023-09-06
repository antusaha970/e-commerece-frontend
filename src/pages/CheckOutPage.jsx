import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  selectCartStatus,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectLoggedInUserInfo,
  updateUserAsync,
} from "../features/user/userSlice";
import { discountedPrice } from "../app/utils";
import Loader from "../features/common/Loader/Loader";
const CheckOutPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUserInfo);
  const cartItems = useSelector(selectCartItems);
  const currentOrder = useSelector(selectCurrentOrder);
  const status = useSelector(selectCartStatus);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cartItems.length) {
      navigate("/", { replace: true });
    }
  }, [cartItems, navigate, user]);
  const onSubmit = (data) => {
    dispatch(
      updateUserAsync({
        ...user,
        addresses: [...user.addresses, data],
      })
    );
    reset();
  };

  const handleAddress = (address) => {
    setSelectedAddress(user.addresses[address]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  // cart dependencies
  const subTotal = cartItems.reduce(
    (acc, item) =>
      acc +
      discountedPrice(item.product.price, item.product.discountPercentage) *
        item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const handleUpdateQty = (e, product) => {
    dispatch(updateCartAsync({ id: product.id, quantity: +e.target.value }));
  };
  const handleDeleteItem = (product) => {
    dispatch(deleteItemFromCartAsync(product.id));
  };
  const handleOrder = () => {
    if (paymentMethod && selectedAddress) {
      const order = {
        cartItems,
        totalItems,
        subTotal,
        user: user.id,
        paymentMethod,
        selectedAddress,
        status: "pending",
      };
      dispatch(createOrderAsync(order));
    } else {
      toast.warn("Please select address and payment method!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    if (currentOrder) {
      navigate(`/order-success/${currentOrder.id}`, { replace: true });
    }
  }, [currentOrder, navigate]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-white p-4 mt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="full-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("fullName", {
                            required: "Full name is required",
                          })}
                          id="full-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.fullName && (
                          <p className="text-red-600">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                              message: "Email is not valid",
                            },
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phoneNumber", {
                            required: "Phone number is required",
                            minLength: 11,
                          })}
                          type="tel"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-600">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "country is required",
                          })}
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                        {errors.country && (
                          <p className="text-red-600">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("streetAddress", {
                            required: "street-address is required",
                          })}
                          id="street-address"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.streetAddress && (
                          <p className="text-red-600">
                            {errors.streetAddress.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-600">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("region", {
                            required: "region is required",
                          })}
                          id="region"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.region && (
                          <p className="text-red-600">
                            {errors.region.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "postal-code is required",
                          })}
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-600">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from your saved address
                  </p>

                  <ul role="list">
                    {user?.addresses?.map((ad, ind) => (
                      <div
                        className=" border border-gray-600 mb-3"
                        key={ad.email}
                      >
                        <li className="flex justify-between gap-x-6 p-5 ">
                          <div className="flex min-w-0 gap-x-4 items-center">
                            <input
                              id="ad"
                              name="address"
                              type="radio"
                              onClick={() => handleAddress(ind)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {ad.state}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Phone : {ad.phoneNumber}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                E-mail : {ad.email}
                              </p>
                            </div>
                          </div>
                          <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {ad.country}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {ad.state}, {ad.city}, {ad.pinCode}
                            </p>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Method
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose any payment method
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payment-method"
                            type="radio"
                            checked={paymentMethod === "card"}
                            onClick={handlePayment}
                            value="card"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payment-method"
                            type="radio"
                            checked={paymentMethod === "cash"}
                            onClick={handlePayment}
                            value="cash"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Cart html */}
          <div className="lg:col-span-2">
            <div className="mx-auto bg-white rounded-sm shadow-sm max-w-7xl px-2 sm:px-62lg:px-2">
              {status === "idle" ? (
                <>
                  <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h2 className="font-bold text-5xl mb-4">Cart</h2>
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cartItems.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.product.thumbnail}
                                alt={product.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link
                                      to={`/product-details/${product.product.id}`}
                                    >
                                      {product.product.title}
                                    </Link>
                                  </h3>
                                  <p className="ml-4">
                                    $
                                    {discountedPrice(
                                      product.product.price,
                                      product.product.discountPercentage
                                    )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center gap-3">
                                  <p className="text-gray-500">Qty </p>
                                  <select
                                    onChange={(e) =>
                                      handleUpdateQty(e, product)
                                    }
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
                      <p
                        onClick={handleOrder}
                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Order Now
                      </p>
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
                </>
              ) : (
                <div className="mt-8 h-[20vh] w-full pt-2">
                  <Loader text="updating..." />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
