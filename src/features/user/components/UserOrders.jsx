import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchUserOrdersAsync, selectLoggedInUserOrders } from "../userSlice";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const orders = useSelector(selectLoggedInUserOrders);
  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user.id));
  }, [dispatch, user]);
  console.log(orders);
  return (
    <>
      {orders.map((order) => (
        <>
          <div className="mx-auto bg-white rounded-sm shadow-sm max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
            <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="font-bold text-5xl mb-4">
                Order Number #{order.id}
              </h2>
              <h5 className="text-2xl mb-4 text-gray-400">
                Order status: {order.status}
              </h5>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.cartItems.map((product) => (
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
                            <p className="text-gray-500">
                              Qty : {product.quantity}{" "}
                            </p>
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
                <p>${order.subTotal}</p>
              </div>
              <div className="flex justify-between my-4 text-base font-medium text-gray-900">
                <p>Total Items</p>
                <p>{order.totalItems}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping Address</p>
            </div>

            <ul role="list">
              {order?.user?.addresses?.map((ad) => (
                <div className=" border border-gray-600 mb-3" key={ad.email}>
                  <li className="flex justify-between gap-x-6 p-5 ">
                    <div className="flex min-w-0 gap-x-4 items-center">
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
          </div>
        </>
      ))}
    </>
  );
};

export default UserOrders;
