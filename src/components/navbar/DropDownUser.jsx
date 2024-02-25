"use client";
import { User } from "@phosphor-icons/react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const DropDownUser = ({ logoutCallBack, profile }) => {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setDropdownOpen(false);
  }, [path]);

  const handleLogout = () => {
    try {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      router.push("/");
      logoutCallBack();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="transition border-2 border-green-800 overflow-hidden text-white rounded-full flex items-center aspect-square"
        type="button"
      >
        {/* <User size={24} color="white" /> */}
        <Image
          width={100}
          height={100}
          alt="profile picture"
          src={profile}
          className="object-cover h-12 w-12"
        />
      </button>
      <ul
        className={`absolute top-14 right-0 w-36 rounded-lg border-none bg-white text-base shadow-lg ${
          !isDropdownOpen ? "invisible" : "visible"
        }`}
      >
        <li>
          <Link
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
            href="/profile/edit_profile"
            data-te-dropdown-item-ref
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
            href="/notification"
            data-te-dropdown-item-ref
          >
            Booking History
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropDownUser;
