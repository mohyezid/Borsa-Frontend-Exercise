import { UserState } from "../store/user/user.types";
import "../styles/card.css";

export default function Card({ user }: { user: UserState }) {
  // concatenate firstName and lastName together
  const getName = () => {
    let name = "";

    if (user.firstName) name += user.firstName;
    if (user.lastName) name += " " + user.lastName;

    return name;
  };

  const handleImageError = (event: any) => {
    // set default image in case the profilePic that comes from API doesn't work
    event.target.src =
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
  };

  return (
    <>
      <div className="sm:max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <img
          className="w-full h-56 object-cover object-center transform transition-transform duration-600 hover:scale-110"
          src={user.profilePic}
          onError={handleImageError}
          alt="avatar"
        />
        <div className="flex items-center px-6 py-3 bg-gray-900"></div>
        <div className="py-4 px-6">
          <h1 className="text-2xl font-semibold text-gray-800 flex justify-between items-center">
            <span>{getName()}</span>
            <span>
              {user.isBuyer && (
                <div className="text-xs px-4 pt-2">
                  <span className="border border-green-400 text-green-400 rounded-md px-2">
                    Buyer
                  </span>
                </div>
              )}
            </span>
          </h1>
          <hr className="hr-text" data-content="" />

          <div className="flex items-center mt-1 text-gray-700">
            <h1 className="px-2 text-sm font-bold">@{user.userName}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <svg className="h-6 w-6 fill-gray-800" viewBox="0 0 512 512">
              <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
            </svg>
            <h1 className="px-2 text-sm">{user.email}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <svg className="h-6 w-6 fill-gray-800" viewBox="0 0 512 512">
              <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
            </svg>
            <h1 className="px-2 text-sm">{user.address}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
