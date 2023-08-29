import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";

const UserProfile = () => {
  const user = useSelector(selectLoggedInUser);
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
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-0.5 text-sm text-gray-500">Shipping Addresses</p>
        </div>

        <ul role="list">
          {user?.addresses?.map((ad) => (
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
  );
};

export default UserProfile;
