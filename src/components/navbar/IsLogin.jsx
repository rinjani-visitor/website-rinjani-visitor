"use client";

import getBaseURL from "@/libs/getBaseURL";
import DropDownUser from "./DropDownUser";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const IsLogin = ({ logoutCallBack }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("p");
        const req = await fetch(getBaseURL("users"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });

        if (!req.ok) {
          console.error(
            "Error fetching user profile:",
            req.status,
            req.statusText
          );
          return;
        }

        const res = await req.json();
        console.log(res.data.profilPicture);
        setProfile(res.data.profilPicture);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {loading ? (
        // Render a loading indicator here (e.g., a spinner)
        <div>Loading...</div>
      ) : (
        <DropDownUser profile={profile} logoutCallBack={logoutCallBack} />
      )}
    </div>
    // <div className="flex items-center space-x-4">
    //   <DropDownUser logoutCallBack={logoutCallBack} />
    // </div>
  );
};

export default IsLogin;
