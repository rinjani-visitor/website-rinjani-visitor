"use client";

import getBaseURL from "@/libs/getBaseURL";
import { Trash } from "@phosphor-icons/react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toast";

const DeleteAccount = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const handlerModal = () => {
    setIsOpen(!isOpen);
  };

  const deleteAccount = async () => {
    setIsLoad(true);
    try {
      const response = await fetch(getBaseURL("users"), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      if (response.ok) {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        router.push("/");
      }
    } catch (error) {
      toast.error("Error deleting account");
    } finally {
      router.push("/");
      setIsLoad(false);
    }
  };

  return (
    <div className="">
      <ToastContainer delay={5000} />
      <div
        className={`top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } fixed transition-opacity duration-300 z-[99] overflow-hidden`}
      >
        <div className="bg-white max-w-lg w-full px-6 py-4 rounded-md">
          <h1 className="text-center text-2xl font-medium">
            Are You Sure to Delete this Account?
          </h1>
          <div className="mt-4 w-fit space-x-3 ml-auto justify-between flex">
            <button
              onClick={handlerModal}
              type="button"
              className="py-2 px-6 w-32 rounded-md border-2 border-red-600 text-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={deleteAccount}
              className="py-2 px-6 w-32 text-white hover:bg-rinjaniVisitor-green bg-rinjaniVisitor-green/80 rounded-md"
            >
              {isLoad ? (
                <div className="custom-loader w-6 h-6 mx-auto"></div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
      <button
        className="flex items-center space-x-2 text-red-500 hover:text-red-700"
        onClick={handlerModal}
      >
        <Trash size={28} />
        <p className="font-medium md:block hidden">Delete Account</p>
      </button>
    </div>
  );
};

export default DeleteAccount;
