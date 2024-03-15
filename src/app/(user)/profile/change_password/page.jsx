"use client";

import InputFormSign from "@/components/InputFormSign";
import getBaseURL from "@/libs/getBaseURL";
import { useState } from "react";
import { getCookie } from "cookies-next";

const Page = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const errorInfo = messageError.includes(
    "password most be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol"
  ) ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
      role="alert"
    >
      <span className="font-medium">Danger alert!</span> {messageError}
    </div>
  ) : messageError.includes("Password not match") ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
      role="alert"
    >
      <span className="font-medium">Danger alert!</span> {messageError}
    </div>
  ) : messageError.includes("User updated successfully") ? (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100"
      role="alert"
    >
      <span className="font-medium">Success alert!</span> {messageError}
    </div>
  ) : null;

  const handlerNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handlerConfirmNewPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const submitUpdatePassword = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const body = {
      password: newPassword,
      confirmPassword: confirmNewPassword,
    };

    try {
      const response = await fetch(getBaseURL("users"), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessageError(data.errors);
      } else {
        setMessageError(data.message);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setNewPassword("");
      setConfirmNewPassword("");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={submitUpdatePassword}>
        <InputFormSign
          title={`New Password`}
          type={`${showPassword ? "text" : "password"}`}
          value={newPassword}
          method={handlerNewPassword}
        />
        <InputFormSign
          title={`Confirm New Password`}
          type={`${showPassword ? "text" : "password"}`}
          value={confirmNewPassword}
          method={handlerConfirmNewPassword}
        />
        {errorInfo}
        <label
          className="flex items-center space-x-2 select-none"
          htmlFor="show"
        >
          <input
            id="show"
            type="checkbox"
            className="h-4 w-4"
            onChange={() => setShowPassword(!showPassword)}
          />
          <p>Show Password</p>
        </label>
        <div>
          <button className="font-medium text-base w-full bg-green-500 hover:bg-green-600 h-10 transition rounded-lg text-white">
            {isLoading ? (
              <div className="custom-loader w-5 h-5 mx-auto"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
