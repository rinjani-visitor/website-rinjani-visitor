"use client";

import Link from "next/link";
import Image from "next/image";
import Background from "@/components/Background";
import InputFormSign from "@/components/InputFormSign";
import { useState } from "react";
import { getRinjaniCultureAPI } from "@/libs/api";
import Or from "@/components/Or";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import ForgotPassword from "@/components/auth/ForgotPassword";
import { ToastContainer, toast } from "react-toast";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const errorToast = () => toast.error("Internal Server Error");

  const errorInfo = messageError ? (
    <div
      className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-800 "
      role="alert"
    >
      <span className="font-medium"> {messageError}</span>
    </div>
  ) : null;

  const handleLogin = async (event) => {
    setIsLoad(true);
    event.preventDefault();

    try {
      const response = await getRinjaniCultureAPI("users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const { accessToken, refreshToken } = data;

      if (response.ok) {
        setCookie("accessToken", accessToken, { maxAge: 3600 });
        setCookie("refreshToken", refreshToken, { maxAge: 3600 });
        router.push("/");
      } else {
        setMessageError(data.errors);
      }
    } catch (error) {
      errorToast();
      console.error("Error during login:", error);
      return;
    } finally {
      setIsLoad(false);
    }
  };

  const onHandlerEmail = (event) => {
    setEmail(event.target.value);
  };

  const onHandlerPassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="grid h-screen md:grid-cols-3">
      <div className="my-auto md:col-span-2">
        <div className="mx-auto max-w-2xl space-y-6 p-4">
          <Link href="/">
            <Image
              src={`https://utfs.io/f/874d963c-d788-4fd2-98c4-8c8305fbde37-1qwd.png`}
              width={150}
              height={10}
              alt=""
              style={{ width: "104px", height: "auto" }}
            />
          </Link>
          <h1 className="font-sora text-4xl font-bold text-green-700 md:text-5xl">
            Login
          </h1>
          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-6">
              <InputFormSign
                value={email}
                title={`Email`}
                type={`email`}
                placeholder={`Input Email`}
                method={onHandlerEmail}
              />
              <InputFormSign
                value={password}
                title={`Password`}
                type={`${showPassword ? "text" : "password"}`}
                placeholder={`Input Password`}
                method={onHandlerPassword}
              />
              {errorInfo}
            </div>
            <div className="flex items-center justify-between">
              <label
                className="flex select-none items-center space-x-2"
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
              <ForgotPassword />
              {/* <Link href='/' className="font-semibold">Forgot Password?</Link> */}
            </div>
            <div>
              <button
                disabled={isLoad}
                className={`h-10 w-full rounded-lg bg-green-600 text-base font-medium text-white transition hover:bg-rinjaniVisitor-green`}
              >
                {isLoad ? (
                  <div className="custom-loader mx-auto h-6 w-6"></div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <Or />

          <p className="text-center font-normal">
            Don`t have an account ?{" "}
            <Link href="/register" className="font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Background id_image={`image-login`} />
      <ToastContainer delay={5000} />
    </div>
  );
};

export default Page;
