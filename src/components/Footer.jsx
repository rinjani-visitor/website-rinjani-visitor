"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();
  const isLoginRegister = path === "/login" || path === "/register";

  const handlerModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <footer
      className={`mt-4 text-white flex-col bg-rinjaniVisitor-green ${
        isLoginRegister ? "hidden" : ""
      }`}
    >
      <div className="container grid md:grid-cols-2 py-8 space-y-2 md:space-y-0">
        <div className="md:space-y-6 space-y-3">
          <Image
            src={`https://utfs.io/f/f101327d-61f5-4453-8e9d-d0d56945b816-s4hkpl.png`}
            width={300}
            height={200}
            style={{ width: "152px", height: "auto" }}
            alt="rijani visitor putih"
            className="invert brightness-0"
          />
          {/* <img src="assets/svg/logo.svg" alt="" class="invert brightness-0"> */}
          <p className="text-sm font-light md:w-3/4">
            Welcome to Rinjani Visitor, the gateway to the breathtaking beauty
            of nature, the wisdom of local culture, and the wonders of Mount
            Rinjani in Senaru!
          </p>
          <p>
            <Link href="mailto:rinjani-visitor@gmail.com" className="text-sm">
              rinjanivisitor@gmail.com
            </Link>
          </p>
        </div>
        <div>
          <div className="grid grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-base font-medium">Menu</h3>
              <ul className="text-sm space-y-2 font-light">
                {[
                  ["Home", "/"],
                  ["Package", "/"],
                  ["Home Stay", "/"],
                  ["Event", "/"],
                  ["Wish List", "/"],
                ].map(([title, url]) => (
                  <li key={title}>
                    <Link href={url}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-medium">Support</h3>
              <ul className="text-sm space-y-2 font-light">
                <li>
                  <Link
                    href={`https://drive.google.com/file/d/1hqk57AhnryQTwnoJEMXb7z-Qyt_I5jga/view?usp=sharing`}
                    target="_blank"
                  >
                    Get Mobile App
                  </Link>
                </li>
                {[
                  ["FAQ", "/"],
                  ["Privacy n Policy", "/privacy_policy"],
                  ["Term of Service", "/"],
                  ["Delete Account", "/delete-account"],
                ].map(([title, url]) => (
                  <li key={title}>
                    <Link href={url}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-medium">Social Media</h3>
              <ul className="text-sm space-y-2 font-light">
                {[
                  ["Instagram", "/"],
                  ["WhatsApp", "/"],
                  ["Youtube", "/"],
                ].map(([title, url]) => (
                  <li key={title}>
                    <Link href={url}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href={`https://play.google.com/store/apps/details?id=com.rinjanivisitor.rinjani_visitor&hl=en&gl=US`}
              target="_blank"
            >
              <Image
                src={`/assets/playstore.jpg`}
                width={500}
                height={500}
                alt="play store"
                className="w-32"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="container border-t py-4">
        <p className="text-center md:text-sm text-xs font-normal">
          Copyright © 2023 by Rinjani Visitor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
