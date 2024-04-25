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
import Available from "./available/Available";
import Unavailable from "./available/Unavailable";

const DetailPackage = ({ id }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [person, setPerson] = useState(1);
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
    person != 1 ? setPerson(person - 1) : setPerson(person);
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
      endDateTime: endDate && endTime ? `${endDate} ${endTime}` : undefined,
      addOns: selectedValues.length > 1 ? selectedValues.join(", ") : undefined,
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
          <p className="font- text-base capitalize text-gray-700 max-sm:text-xs">
            Packages/{data.category}/{data.subCategory}
          </p>
          {data.status ? <Available /> : <Unavailable />}
          <h1 className="text-3xl font-semibold text-gray-700 max-lg:text-2xl max-sm:text-xl ">
            {data.title}
          </h1>
          <div className="flex space-x-4 font-normal text-gray-700">
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
            className="text-red-600 transition-all ease-in-out"
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
          <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
            Check-In
          </h1>
          <div className="mb-4 flex w-6/12 space-x-4 max-lg:w-full">
            <input
              required
              onChange={handlerDate}
              min={new Date().toISOString().split("T")[0]}
              type="date"
              name="daterange"
              className="w-full rounded-md border border-green-700 bg-white p-2"
            />
            <input
              required
              onChange={handlerTime}
              type="time"
              name="daterange"
              className="w-full rounded-md border border-green-700 bg-white p-2"
            />
          </div>
          {data.category === "homestay" ? (
            <>
              <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
                Check-Out
              </h1>
              <div className="mb-4 flex w-6/12 space-x-4 max-lg:w-full">
                <input
                  required
                  onChange={(e) => setEndDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                  name="daterange"
                  className="w-full rounded-md border border-green-700 bg-white p-2"
                />
                <input
                  required
                  onChange={(e) => setEndTime(e.target.value)}
                  type="time"
                  name="daterange"
                  className="w-full rounded-md border border-green-700 bg-white p-2"
                />
              </div>
            </>
          ) : null}
          {data.addOns && data.addOns.length > 0 ? (
            <div>
              <h1 className="mb-2 text-lg font-medium text-rinjaniVisitor-green/90">
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
          <div className="mb-4 max-sm:space-y-2">
            <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
              Person
            </h1>
            <div className="flex w-fit justify-center space-x-4 overflow-hidden rounded-md max-lg:w-full max-sm:justify-between">
              <button
                onClick={handlerReducePerson}
                className="w-10 bg-green-700 text-white hover:bg-green-700 max-lg:w-3/12"
              >
                {" "}
                -{" "}
              </button>
              <p className="w-7 rounded-md bg-white p-2 text-center max-lg:w-6/12">
                {person}
              </p>
              <button
                onClick={handlerAddPerson}
                className="w-10 bg-green-700 text-white hover:bg-green-700 max-lg:w-3/12"
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
          <div className=" mb-4 space-y-2">
            <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">
              Offering Price
            </h1>
            <input
              required
              // min={
              //   person > 1 ? data.lowestPrice * 0.8 * person : data.lowestPrice
              // }
              min={Math.ceil(
                person > 1 ? data.lowestPrice * 0.8 * person : data.lowestPrice,
              )}
              type="number"
              className="w-full rounded-md border border-green-700 bg-transparent bg-white px-3 py-2 focus:outline-none"
              placeholder={`Enter a offer price minimum $${
                person === 1
                  ? data.lowestPrice
                  : Math.ceil(data.lowestPrice * person * 0.8)
              }`}
              onChange={handlerOfferingPrice}
            />
          </div>
          <button
            disabled={
              data.status || data.category === "event" ? isLoad : !data.status
            }
            type="submit"
            className="h-10 w-full rounded-lg bg-green-700 text-base font-medium text-white transition hover:bg-green-600 disabled:bg-slate-400"
          >
            {isLoad ? (
              <div className="custom-loader mx-auto h-8 w-8"></div>
            ) : (
              "Booking"
            )}
          </button>
        </form>
      </section>

      <section className="grid grid-cols-1 space-y-4">
        <div className="space-y-4 rounded-md bg-white p-4 shadow-md">
          <div className="">
            <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
              Description
            </h1>
            <p className=" text-slate-900 max-sm:text-sm">{data.description}</p>
          </div>
          {data.category === "rinjani" ? (
            <>
              <div className="">
                <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
                  Program
                </h1>
                <p className=" text-slate-900 max-sm:text-sm">{data.program}</p>
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
                  Duration
                </h1>
                <p className=" text-slate-900 max-sm:text-sm">
                  {data.duration}
                </p>
              </div>
            </>
          ) : null}

          {["landscape", "culture"].includes(data.category) ? (
            <>
              <div className="">
                <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
                  Route
                </h1>
                <p className=" text-slate-900 max-sm:text-sm">
                  {data.route ? data.route : "-"}
                </p>
              </div>
            </>
          ) : null}

          {data.category === "event" ? (
            <>
              <div className="">
                <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
                  Start Date
                </h1>
                <p className=" text-slate-900 max-sm:text-sm">
                  {showFormattedDate(data?.startDate)}
                </p>
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
                  End Date
                </h1>
                <p className=" text-slate-900 max-sm:text-sm">
                  {showFormattedDate(data?.endDate)}
                </p>
              </div>
            </>
          ) : null}
          <div className="">
            <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
              Noted
            </h1>
            <p className=" text-slate-900 max-sm:text-sm">
              {data.note ? data.note : "-"}
            </p>
          </div>
          <div className="max-lg:flex max-lg:space-x-10 xl:space-y-4">
            <div>
              <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
                Facility
              </h1>
              <ul className="list-inside list-none">
                {data.facilities?.length > 0 ? (
                  data.facilities.map((facilities, index) => (
                    <li key={index}>{facilities}</li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-md bg-white p-4 shadow-md">
          <h1 className="text-2xl font-semibold text-green-700 max-sm:text-lg">
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
