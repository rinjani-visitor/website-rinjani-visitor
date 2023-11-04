"use client";
import { CaretRight, UserCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect } from "react";

const DropDownUser = ({ name = "Daus" }) => {
  useEffect(() => {
    const init = async () => {
      const { Dropdown, Ripple, initTE } = await import("tw-elements");
      initTE({ Dropdown, Ripple });
    };
    init();
  }, []);

  return (
    <div className="relative" data-te-dropdown-ref>
      <button
        className="px-4 py-2 hover:bg-green-700 bg-green-600 transition text-white rounded-md flex items-center space-x-2"
        type="button"
        id="dropdownMenuButton1"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
        data-te-ripple-init
        data-te-ripple-color="light">
        <UserCircle size={24} color="white" />
        <p className="font-medium">Hi, {name}</p>
        <CaretRight size={14} weight="bold" />
      </button>
      <ul
        className="absolute z-[1000] float-left m-0 hidden w-full mt-2 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
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
            href="/"
            data-te-dropdown-item-ref
          >My Orders</Link>
        </li>
        <li>
          <Link
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="/"
            data-te-dropdown-item-ref
          >Logout</Link>
        </li>

      </ul>
    </div>
  );
};

export default DropDownUser;