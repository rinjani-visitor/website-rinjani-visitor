"use client";

import BookingStatus from "./bookingStatus";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import ReactStars from "react-stars";
import { CancelOrder } from "./cancelOrder";
import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const OrderCard = ({
  title,
  location,
  status,
  orderId,
  orderApproveDate,
  rating,
  messageReview,
  productId,
}) => {
  const [ratings, setRatings] = useState(0);
  const [review, setReview] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const router = useRouter();

  const ratingChanged = (newRating) => {
    setRatings(newRating);
  };

  const submitReview = async (event) => {
    setIsLoad(true);
    event.preventDefault();
    const body = {
      orderId: orderId,
      messageReview: review,
      rating: `${ratings}`,
    };

    console.log(body);

    try {
      const response = await fetch(getBaseURL("reviews"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error("Error review order");
      }

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="p-4 space-y-4 rounded-md shadow">
      <Link href={`/packages/${productId}`}>
        <div className="flex space-x-6 items-center">
          <h1 className="font-semibold text-2xl">{title}</h1>
        </div>
        <div className="flex space-x-4 text-gray-700 font-normal ">
          <div className="flex items-center space-x-2">
            <MapPin size={24} weight="fill" /> <span>{location}</span>
          </div>
        </div>
      </Link>
      <div className="flex space-x-6 items-center justify-between">
        <h2 className="font-semibold text-rinjaniVisitor-green text-xl md:text-3xl">
          Status Order
        </h2>
        <BookingStatus status={status} />
      </div>
      <div className="text-sm text-slate-600 space-y-1">
        <p>Order Id: {orderId}</p>
        <p>Order Approve Date: {orderApproveDate}</p>
      </div>

      {status === "On Journey" ? (
        <>
          <div className="flex w-1/2 justify-between space-x-4 text-white">
            <button
              className="w-full bg-rinjaniVisitor-green py-2 rounded-md hover:bg-green-800"
              onClick={() => setIsHidden(true)}
            >
              Finish
            </button>
            <CancelOrder id={orderId} />
          </div>
          <form
            className={`space-y-2 ${!isHidden ? "hidden" : ""}`}
            onSubmit={submitReview}
          >
            <h1 className="font-medium text-xl text-rinjaniVisitor-green">
              Rating
            </h1>
            <ReactStars
              count={5}
              value={ratings}
              onChange={ratingChanged}
              size={32}
              half={false}
              color2={"#ffd700"}
            />
            <h1 className="font-medium text-xl text-rinjaniVisitor-green">
              Review
            </h1>
            <textarea
              onChange={(event) => setReview(event.target.value)}
              required
              cols="30"
              rows="5"
              placeholder="Write your review about your experience at Rinjani Visitor"
              className="w-full p-2 rounded-md border focus:outline-rinjaniVisitor-green"
            ></textarea>
            <button className="w-full bg-rinjaniVisitor-green py-2 rounded-md hover:bg-green-800 text-white">
              {isLoad ? (
                <div className="mx-auto w-6 h-6 custom-loader"></div>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
          <ToastContainer delay={5000} />
        </>
      ) : null}

      {status === "Finished" ? (
        <div>
          <p className="text-base font-semibold text-rinjaniVisitor-green">
            You Rating
          </p>
          <ReactStars
            edit={false}
            count={5}
            value={rating}
            size={32}
            half={false}
            color2={"#ffd700"}
          />
          <p className="text-base font-semibold text-rinjaniVisitor-green">
            You Review
          </p>
          <p className="">{messageReview}</p>
        </div>
      ) : null}
    </div>
  );
};
