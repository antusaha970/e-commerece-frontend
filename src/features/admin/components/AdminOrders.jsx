import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { discountedPrice } from "../../../app/utils";
import Pagination from "../../common/pagination/Pagination";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editAble, setEditAble] = useState(-1);
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  const handleEdit = (order) => {
    setEditAble(order.id);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order };
    updatedOrder.status = e.target.value;
    dispatch(updateOrderAsync(updatedOrder));
    setEditAble(-1);
  };

  const handleCancelOder = (order) => {
    const updatedOrder = { ...order };
    updatedOrder.status = "cancelled";
    dispatch(updateOrderAsync(updatedOrder));
  };
  // This function handle pagination of products
  const handlePagination = (currentPage) => {
    setPage(currentPage);
  };

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen  flex items-start justify-center bg-gray-100 font-sans overflow-auto">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order Number</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Subtotal</th>
                    <th className="py-3 px-6 text-left">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">#{order.id}</span>
                        </div>
                      </td>
                      {order.cartItems.map((item) => (
                        <div key={item.product.id}>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.product.thumbnail}
                                />
                              </div>
                              <span>{item.product.title}</span>
                              <br />
                            </div>
                            <span>Qty: {item.product.quantity}</span>
                            <p>
                              <b>Price: &nbsp;</b>$
                              {discountedPrice(
                                item.product.price,
                                item.product.discountPercentage
                              )}
                            </p>
                          </td>
                        </div>
                      ))}
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <p className="text-xl">${order.subTotal}</p>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <p className="text-base">
                            {order.selectedAddress.city},&nbsp;
                            {order.selectedAddress.pinCode},&nbsp;
                            {order.selectedAddress.country}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editAble === order.id ? (
                          <select
                            onChange={(e) => handleUpdate(e, order)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="pending">pending</option>
                            <option value="dispatched">dispatched</option>
                            <option value="delivered">delivered</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${testColorHelper(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className=" cursor-pointer w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                          <div
                            onClick={() => handleEdit(order)}
                            className=" cursor-pointer w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div
                            onClick={() => handleCancelOder(order)}
                            title="cancel order"
                            className=" cursor-pointer w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={page}
              totalItems={totalOrders}
              handlePagination={handlePagination}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;

function testColorHelper(status) {
  switch (status) {
    case "pending":
      return "bg-purple-200 text-purple-600";
    case "dispatched":
      return "bg-green-200 text-green-600";
    case "delivered":
      return "bg-yellow-200 text-yellow-600";
    case "cancelled":
      return "bg-red-200 text-red-600";
    default:
      return "bg-purple-200 text-purple-600";
  }
}
