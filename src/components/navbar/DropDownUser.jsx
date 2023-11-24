"use client";
import { User } from "@phosphor-icons/react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DropDownUser = () => {
  useEffect(() => {
    const init = async () => {
      const { Dropdown, Ripple, initTE } = await import("tw-elements");
      initTE({ Dropdown, Ripple });
    };
    init();
  }, []);

  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('accessToken')
    router.push('/')
    window.location.reload()
  };

  return (
    <div className="relative" data-te-dropdown-ref>
      <button
        className="px-2 py-2 hover:bg-green-700 bg-green-600 transition text-white rounded-full flex items-center space-x-2"
        type="button"
        id="dropdownMenuButton1"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
        data-te-ripple-init
        data-te-ripple-color="light">
        <User size={24} color="white" />
      </button>
      <ul
        className="absolute z-[1000] float-right m-0 hidden w-40 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
        aria-labelledby="dropdownMenuButton1"
        data-te-dropdown-menu-ref>
        <li>
          <Link
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="/profile/edit_profile"
            data-te-dropdown-item-ref
          >Profile</Link>
        </li>
        <li>
          <Link
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="/notification"
            data-te-dropdown-item-ref
          >Notification</Link>
        </li>
        {/* <li>
          <Link
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="/"
            data-te-dropdown-item-ref
          >Logout</Link>
        </li> */}
        <li>
          <button
            onClick={handleLogout}
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 text-left">
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
};

export default DropDownUser;