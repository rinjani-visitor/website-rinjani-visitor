"use client"

import { getCookie, hasCookie } from "cookies-next"
import Image from "next/image"

const Page = () => {

  const cookie = hasCookie("accessToken");
  if (!cookie) {
    return (
      <div className="container">
        <div>
          <Image src={`/6184159_3094350.svg`} alt="..." width={500} height={500} className="mx-auto"/>
          <h1 className="text-center text-5xl font-medium bg-clip-text text-rinjaniVisitor-green">You&apos;re not Login</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>wishlist</h1>
    </div>
  );
};

export default Page;
