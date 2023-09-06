import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserOrdersAsync,
  selectLoggedInUserInfo,
  selectLoggedInUserOrders,
} from "../userSlice";
import { discountedPrice } from "../../../app/utils";

const UserOrders = () => {
  const user = useSelector(selectLoggedInUserInfo);
  const dispatch = useDispatch();
  const orders = useSelector(selectLoggedInUserOrders);
  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user.id));
  }, [dispatch, user]);
  return (
    <>
      <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
        <h2 className="text-3xl font-bold">Order Details</h2>
        <div className="mt-3 text-sm">
          Check the status of recent and old orders & discover more products
        </div>
        {orders.map((order) => (
          <div
            key={order.id}
            className="mt-8 flex bg-white flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row"
          >
            <div className="w-full bg-[#1F2937] border-r border-gray-300 md:max-w-xs">
              <div className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                  <div className="mb-4">
                    <div className="text-sm text-white font-semibold">
                      Order ID
                    </div>
                    <div className="text-sm font-medium text-gray-300">
                      #{order.id}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-white font-semibold">
                      Total Amount
                    </div>
                    <div className="text-sm font-medium text-gray-300">
                      ${order.subTotal}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm  text-white font-semibold">
                      Order Status
                    </div>
                    <div className="text-sm font-medium text-gray-300">
                      {order.status}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-white font-semibold">
                      Total Items
                    </div>
                    <div className="text-sm font-medium text-gray-300">
                      {order.totalItems}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="p-8">
                <ul className="-my-7 divide-y divide-gray-200">
                  {order?.cartItems?.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                            src={item.product.thumbnail}
                            alt={item.product.title}
                          />
                        </div>

                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                              {item.product.title}
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>

                          <p className="mt-4 text-sm font-medium text-gray-500">
                            x {item.product.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="ml-auto flex flex-col items-end justify-between">
                        <p className="text-right text-sm font-bold text-gray-900">
                          $
                          {discountedPrice(
                            item.product.price,
                            item.product.discountPercentage
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr className="my-8 border-t border-t-gray-200" />
                <div className="space-x-4">
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    View Order
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    View Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserOrders;
