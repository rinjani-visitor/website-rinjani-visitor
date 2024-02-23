import CarouselPicture from "@/components/package/CarouselPicture";
import CardReview from "@/components/review/CardReview";
import getBaseURL from "@/libs/getBaseURL";
import { Heart, MapPin, Star } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckboxButtonAddOn from "./CheckboxButtonAddOn";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toast";
import { showFormattedDate } from "@/libs/formatDate";

const DetailPackage = ({ id }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [person, setPerson] = useState(0);
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [offeringPrice, setOfferingPrice] = useState(null);
  const [like, setLike] = useState(undefined);
  const router = useRouter();
  const cookie = hasCookie("accessToken");

  const fetchData = async () => {
    try {
      const response = await axios.get(getBaseURL(`products/${id}`), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      let { data } = response;
      data = data.data;
      setData(data);
      setLike(data?.userFavorited);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlerAddPerson = (event) => {
    event.preventDefault();
    person != 20 ? setPerson(person + 1) : setPerson(person);
  };

  const handlerReducePerson = (event) => {
    event.preventDefault();
    person != 0 ? setPerson(person - 1) : setPerson(person);
  };

  const handlerDate = (event) => {
    setDate(event.target.value);
  };

  const handlerTime = (event) => {
    setTime(event.target.value);
  };

  const handlerOfferingPrice = (event) => {
    setOfferingPrice(event.target.value);
  };

  const submitBooking = async (event) => {
    setIsLoad(true);
    event.preventDefault();

    if (!cookie) {
      router.push("/login");
      return;
    }

    const body = {
      productId: id,
      startDateTime: `${date} ${time}`,
      addOns: selectedValues ? selectedValues.join(", ") : undefined,
      offeringPrice: offeringPrice,
      totalPersons: `${person}`,
    };

    try {
      const response = await fetch(getBaseURL("booking"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { data } = await response.json();
      router.push(`/booking/${data.bookingId}`);
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsLoad(false);
    }
  };

  const likePackage = async (event) => {
    if (!cookie) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(getBaseURL("users/favorite"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify({ productId: id }),
      });

      if (response.ok) {
        setLike(!like);
      } else {
        throw new Error("Gagal menyukai paket. Status:" + response.status);
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="container space-y-8">
      <section className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:space-y-4">
        <ToastContainer delay={5000} />
        <div className="space-y-2">
          <p className="text-base capitalize max-sm:text-xs text-gray-700 font-">
            Packages/{data.category}/{data.subCategory}
          </p>
          <h1 className="font-semibold text-3xl text-gray-700 max-sm:text-xl max-lg:text-2xl ">
            {data.title}
          </h1>
          <div className="flex space-x-4 text-gray-700 font-normal">
            <div className="flex items-center space-x-2">
              <Star size={24} weight="fill" /> <span>{data.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={24} weight="fill" /> <span>{data.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <button
            onClick={likePackage}
            className="transition-all ease-in-out text-red-600"
          >
            {like ? (
              <Heart size={40} weight="fill" />
            ) : (
              <Heart size={40} className="" />
            )}
          </button>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        <div>
          <CarouselPicture images={data.fotos} />
        </div>
        <form className="" onSubmit={submitBooking}>
          <div className="mb-4">
            <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
              Price
            </h1>
            <p className="text-2xl font-semibold text-rinjaniVisitor-green">
              Start from ${data.lowestPrice}/person
            </p>
          </div>
          <div className="flex w-6/12 space-x-4 max-lg:w-full mb-4">
            <input
              required
              onChange={handlerDate}
              min={new Date().toISOString().split("T")[0]}
              type="date"
              name="daterange"
              className="border border-green-700 p-2 rounded-md bg-white w-full"
            />
            <input
              required
              onChange={handlerTime}
              type="time"
              name="daterange"
              className="border border-green-700 p-2 rounded-md bg-white w-full"
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
              // placeholder="Enter a offer price (minimum 80% of total)"
              placeholder={`Enter a offer price minimum $${
                person === 1
                  ? data.lowestPrice
                  : data.lowestPrice * person * 0.8
              }`}
              onChange={handlerOfferingPrice}
            />
          </div>
          <button
            disabled={data.status ? isLoad : !data.status}
            type="submit"
            className="font-medium text-base w-full bg-green-700 hover:bg-green-600 h-10 transition rounded-lg text-white disabled:bg-slate-400"
          >
            {isLoad ? (
              <div className="custom-loader w-8 h-8 mx-auto"></div>
            ) : (
              "Booking"
            )}
          </button>
        </form>
      </section>

      <section className="grid grid-cols-1 space-y-4">
        <div className="space-y-4 shadow-md p-4 bg-white rounded-md">
          <div className="">
            <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
              Description
            </h1>
            <p className=" max-sm:text-sm text-slate-900">{data.description}</p>
          </div>
          {data.category === "rinjani" ? (
            <>
              <div className="">
                <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
                  Program
                </h1>
                <p className=" max-sm:text-sm text-slate-900">{data.program}</p>
              </div>
              <div className="">
                <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
                  Duration
                </h1>
                <p className=" max-sm:text-sm text-slate-900">
                  {data.duration}
                </p>
              </div>
            </>
          ) : null}

          {["landscape", "culture"].includes(data.category) ? (
            <>
              <div className="">
                <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
                  Route
                </h1>
                <p className=" max-sm:text-sm text-slate-900">
                  {data.route ? data.route : "-"}
                </p>
              </div>
            </>
          ) : null}

          {data.category === "event" ? (
            <>
              <div className="">
                <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
                  Start Date
                </h1>
                <p className=" max-sm:text-sm text-slate-900">
                  {showFormattedDate(data.startDate)}
                </p>
              </div>
              <div className="">
                <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
                  End Date
                </h1>
                <p className=" max-sm:text-sm text-slate-900">
                  {showFormattedDate(data.endDate)}
                </p>
              </div>
            </>
          ) : null}
          <div className="">
            <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
              Noted
            </h1>
            <p className=" max-sm:text-sm text-slate-900">
              {data.note ? data.note : "-"}
            </p>
          </div>
          <div className="max-lg:flex max-lg:space-x-10 xl:space-y-4">
            <div>
              <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
                Facility
              </h1>
              <ul className="list-none list-inside">
                {data.facilities > 0 ? (
                  data.facilities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-4 bg-white rounded-md shadow-md">
          <h1 className="font-semibold text-2xl max-sm:text-lg text-green-700">
            Review
          </h1>
          <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
            {data.reviews && data.reviews.length > 0 ? (
              data.reviews.map((item) => (
                <CardReview
                  key={item.id}
                  name={item.name}
                  body={item.messageReview}
                  country={item.country}
                  rating={item.rating}
                  imageProfile={item.profilPicture}
                  timestamp={item.createdAt}
                />
              ))
            ) : (
              <p>No one review</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailPackage;
