import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUserInfo);
  const dispatch = useDispatch();
  const [selectedAddressInd, setSelectedAddressInd] = useState(-1);
  const [showAddAddressFrom, setShowAddAddressFrom] = useState(false);
  const handleRemove = (id) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(id, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleEditForm = (id, data) => {
    setShowAddAddressFrom(false);
    setSelectedAddressInd(id);
    setValue("city", data.city);
    setValue("country", data.country);
    setValue("email", data.email);
    setValue("fullName", data.fullName);
    setValue("phoneNumber", data.phoneNumber);
    setValue("pinCode", data.pinCode);
    setValue("region", data.region);
    setValue("streetAddress", data.streetAddress);
  };
  const onSubmit = (data) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(selectedAddressInd, 1, data);
    dispatch(updateUserAsync(newUser));
    reset();
    setSelectedAddressInd(-1);
  };

  const addAddress = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    reset();
    setShowAddAddressFrom(false);
    setSelectedAddressInd(-1);
  };

  return (
    <>
      <div className="mx-auto bg-white rounded-sm shadow-sm max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
          <h2 className="font-bold text-5xl mb-4">
            User Name: {user?.name ? user.name : "New User"}
          </h2>
          <h5 className="text-2xl mb-4 text-gray-400">
            User email: {user.email}
          </h5>
          {user.role === "admin" && (
            <h5 className="text-2xl mb-4 text-gray-400">
              Your role: {user.role}
            </h5>
          )}
          {user.role === "admin" && (
            <Link to={"/admin"}>
              <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-5">
                Go to admin panel
              </button>
            </Link>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-0.5 text-sm text-gray-500">Shipping Addresses</p>
          <button
            onClick={() => {
              setShowAddAddressFrom(true);
              setSelectedAddressInd(-1);
            }}
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-5"
          >
            Add new address
          </button>
        </div>

        {showAddAddressFrom === true ? (
          <form
            className="bg-white p-4 mt-8"
            onSubmit={handleSubmit(addAddress)}
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
                        <p className="text-red-600">{errors.country.message}</p>
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
                        <p className="text-red-600">{errors.region.message}</p>
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
                        <p className="text-red-600">{errors.pinCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => {
                    setShowAddAddressFrom(false);
                    setSelectedAddressInd(-1);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>
            </div>
          </form>
        ) : null}

        <ul role="list">
          {user?.addresses?.map((ad, index) => (
            <>
              {selectedAddressInd === index ? (
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
                              <p className="text-red-600">
                                {errors.email.message}
                              </p>
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
                              <p className="text-red-600">
                                {errors.city.message}
                              </p>
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
                        onClick={() => setSelectedAddressInd(-1)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
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
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => handleEditForm(index, ad)}
                    >
                      Edit
                    </button>
                  </div>
                </li>
              </div>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;
