"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import CheckboxButtonAddOn from "../package/CheckboxButtonAddOn";
import { getCookie } from "cookies-next";
import getBaseURL from "@/libs/getBaseURL";

const EditBooking = ({ data }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const [person, setPerson] = useState(0);
  const [selectedValues, setSelectedValues] = useState([]);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const handlerAddPerson = (event) => {
    event.preventDefault();
    person != 20 ? setPerson(person + 1) : setPerson(person);
  };

  const handlerReducePerson = (event) => {
    event.preventDefault();
    person != 0 ? setPerson(person - 1) : setPerson(person);
  };

  const editBooking = async (e) => {
    e.preventDefault();
    const body = {
      startDateTime: `${date} ${time}`,
      // endDateTime: endDate && endTime ? `${endDate} ${endTime}` : undefined,
      addOns: selectedValues.length > 1 ? selectedValues.join(", ") : undefined,
      offeringPrice: price,
      totalPersons: `${person}`,
      userMessage: "halo",
    };

    console.log(body);

    try {
      const response = await fetch(getBaseURL(`booking/${id}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      console.log(res);

      // const { data } = await response.json();
      // router.push(`/booking/${data.bookingId}`);
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      location.reload();
      // setIsLoad(false);
    }
  };

  return (
    <>
      <form onSubmit={editBooking} className="">
        <h2>Edit Booking</h2>
        <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
          Check-In
        </h1>
        <div className="flex space-x-4 max-lg:w-full mb-4">
          <input
            required
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            type="date"
            name="daterange"
            className="border w-2/3 border-green-700 p-2 rounded-md bg-white"
          />
          <input
            required
            onChange={(e) => setTime(e.target.value)}
            type="time"
            name="daterange"
            className="border w-1/3 border-green-700 p-2 rounded-md bg-white"
          />
        </div>
        {data.addOns && data.addOns.length > 0 ? (
          <div>
            <h1 className="text-lg mb-2 font-medium text-rinjaniVisitor-green/90">
              Add Ons
            </h1>
            <div className="flex flex-wrap">
              {data.addOns?.map((item, index) => (
                <CheckboxButtonAddOn
                  key={index}
                  id={item}
                  label={item}
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                />
              ))}
            </div>
          </div>
        ) : null}
        <div className="max-sm:space-y-2 mb-4">
          <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
            Person
          </h1>
          <div className="flex space-x-4 w-fit max-lg:w-full max-sm:justify-between overflow-hidden justify-center rounded-md">
            <button
              onClick={handlerReducePerson}
              className="w-10 max-lg:w-3/12 bg-green-700 hover:bg-green-700 text-white"
            >
              {" "}
              -{" "}
            </button>
            <p className="w-7 max-lg:w-6/12 bg-white rounded-md p-2 text-center">
              {person}
            </p>
            <button
              onClick={handlerAddPerson}
              className="w-10 max-lg:w-3/12 bg-green-700 hover:bg-green-700 text-white"
            >
              {" "}
              +{" "}
            </button>
          </div>
        </div>
        <div className=" space-y-2 mb-4">
          <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
            Offering Price
          </h1>
          <input
            required
            min={
              person > 1 ? data.lowestPrice * 0.8 * person : data.lowestPrice
            }
            type="number"
            className="border border-green-700 bg-transparent py-2 px-3 focus:outline-none rounded-md w-full bg-white"
            placeholder={`Enter a offer price minimum $${
              person === 1 ? data.lowestPrice : data.lowestPrice * person * 0.8
            }`}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className=" space-y-2 mb-4">
          <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
            Message
          </h1>
          <input
            type="text"
            className="border border-green-700 bg-transparent py-2 px-3 focus:outline-none rounded-md w-full bg-white"
            placeholder="Send message to admin (optional)"
            // onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button
          // disabled={data.status ? isLoad : !data.status}
          type="submit"
          className="font-medium text-base w-full bg-green-700 hover:bg-green-600 h-10 transition rounded-lg text-white disabled:bg-slate-400"
        >
          {/* {isLoad ? (
          <div className="custom-loader w-8 h-8 mx-auto"></div>
        ) : ( */}
          Booking
          {/* )} */}
        </button>
      </form>
    </>
  );
};

export default EditBooking;
