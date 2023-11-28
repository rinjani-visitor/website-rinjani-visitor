"use client";
import { User } from "@phosphor-icons/react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DropDownUser = ({ logoutCallBack }) => {
  const router = useRouter()
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    try {
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      router.push('/')
      logoutCallBack()
    } catch (error) {
      console.error('Error during logout:', error)
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-2 py-2 hover:bg-green-700 bg-green-600 transition text-white rounded-full flex items-center space-x-2"
        type="button"
        id="dropdownMenuButton1"
      >
        <User size={24} color="white" />
      </button>
      <ul
        className={`absolute z-[1000] float-right mr-5 ${isDropdownOpen ? 'block' : 'hidden'
          } w-36 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700`}
        aria-labelledby="dropdownMenuButton1">
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