"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginRegisterButton from "./LoginRegisterButton";
import IsLogin from "./IsLogin";

import { List, X } from "@phosphor-icons/react";
import SearchInput from "./SearchInput";
import { getCookie, hasCookie } from "cookies-next";

const Navbar = () => {
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrolling, setScrolling] = useState(0);
  const [token, setToken] = useState(getCookie("accessToken"));

  const getToken = () => setToken(getCookie("accessToken"));

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Membersihkan event listener saat komponen dilepas
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        scrolling > 0 ? "bg-nav" : "bg-transparent"
      } mb-4 h-20 text-sm shadow sticky top-0 transition-all duration-500 z-[99]`}
    >
      <div className="container md:space-x-8 flex items-center h-full justify-between">
        <Link href="/">
          <Image
            priority={true}
            src={`https://utfs.io/f/874d963c-d788-4fd2-98c4-8c8305fbde37-1qwd.png`}
            width={300}
            height={200}
            style={{ width: "104px", height: "auto" }}
            alt="Logo Rinjani Culutre"
            className="h-auto aspect-auto"
          />
        </Link>
        <div className="flex space-x-4 items-center justify-between">
          {isLogin ? (
            <div className="md:hidden flex">
              <IsLogin logoutCallBack={getToken} />
            </div>
          ) : null}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-700 transition md:hidden flex"
          >
            {isOpen ? <X size={32} /> : <List size={32} />}
          </button>
        </div>
        <div
          className={`md:static fixed md:flex md:flex-1 w-full justify-between items-center transition-all ease-in-out duration-300 bg-rinjani-visitor md:bg-none px-4 py-4 md:py-0 md:px-0 h-screen md:h-auto ${
            !isOpen
              ? "left-full top-[76px] w-full"
              : "absolute left-0 top-[76px] w-full"
          }`}
        >
          <ul
            className={`flex md:flex-row flex-col font-medium space-y-2 md:space-y-0 md:space-x-5`}
          >
            <li
              className={`text-green-700 hover:text-green-700 link ${
                path === "/" ? "active_link text-green-700 font-bold" : ""
              } group `}
            >
              <Link href={`/`}>Home</Link>
              <div className="rounded-full underline group-hover:w-full group-hover:bg-[green] md:block hidden"></div>
            </li>
            {[
              ["Package", "/packages", "package"],
              ["Home Stay", "/homestay", "homestay"],
              ["Event", "/event", "event"],
              ["Wish List", "/wishlist", "wishlist"],
            ].map(([title, url, id]) => (
              <li
                key={id}
                className={`text-green-700 hover:text-green-700 link ${
                  path.includes(id)
                    ? "active_link text-green-700 font-bold"
                    : ""
                } group `}
              >
                <Link href={url}>{title}</Link>
                <div className="rounded-full underline group-hover:w-full group-hover:bg-[green] md:block hidden"></div>
              </li>
            ))}
          </ul>
          <div className="flex mt-2 md:mt-0 flex-col md:flex-row items-start md:items-center md:space-x-4 space-y-2 md:space-y-0">
            {/* search input */}
            <SearchInput />
            {isLogin ? (
              <div className="md:flex hidden">
                <IsLogin logoutCallBack={getToken} />
              </div>
            ) : (
              <LoginRegisterButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
