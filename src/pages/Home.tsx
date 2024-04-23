import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { removeUsers, usersFetchStart } from "../store/user/user.slice";
import Card from "../components/Card";
import Header from "../components/Header";
import SkeletonLoader from "../components/SkeletonLoader";
import Toast from "../components/Toast";

export default function Home() {
  const { data: users, total, isLoading, error, page, limit } = useUsers();

  const [noMoreUsers, setNoMoreUsers] = useState(false); // if there is no more user data left to fetch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeUsers());
    fetchUsers();
  }, []);

  useEffect(() => {
    if (page > 0 && limit * page >= total)
      setNoMoreUsers(true); // if we have retrieved all users
    else setNoMoreUsers(false);
  }, [page, limit, total]);

  useEffect(() => {
    // add event listener for scorll event to fetch additional users on the bottom of the page
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [noMoreUsers, isLoading]);

  const fetchUsers = () => {
    if (page === 0 || page * limit < total)
      dispatch(usersFetchStart({ page: page + 1, limit }));
  };

  // Fetch more users when the user reaches the bottom of the page
  const prevScrollPos = useRef(window.scrollY);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const isScrollingDown = currentScrollPos > prevScrollPos.current; // check if the current scroll is a scroll down or up
    prevScrollPos.current = currentScrollPos;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 15 &&
      isScrollingDown &&
      !isLoading &&
      !noMoreUsers
    ) {
      fetchUsers();
    }
  };

  return (
    <>
      <Header />

      <div className="py-20 px-5 min-h-[100vh]">
        {/* indicate how many users we have loaded */}
        {total && (
          <div className="px-3 text-lg font-semibold font-mono text-cyan-900">
            {users.length} / {total}
          </div>
        )}

        <div className="gap-x-6 gap-y-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user, index) => (
            <Card user={user} key={index} />
          ))}

          {/* show skeleton loader when loading */}
          {isLoading &&
            new Array(4).fill(1).map((_, i) => <SkeletonLoader key={i} />)}
        </div>

        {/* show no more users message */}
        {noMoreUsers && (
          <div className="flex flex-col relative justify-center items-center my-16">
            <hr className="border-cyan-600 opacity-40 border-dashed relative w-full" />
            <div className="text-cyan-600 font-bold text-3xl text-center py-3 text-opacity-40 absolute bg-white px-5 font-mono">
              ~ No More Users ~
            </div>
          </div>
        )}

        {/* Error display as a Toast */}
        <Toast message={error} />
      </div>
    </>
  );
}
