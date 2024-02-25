import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Image from "next/image";
import { MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import CancelBooking from "@/components/package/CancelBooking";
import BookingStatus from "@/components/bookingStatus";
import EditBooking from "@/components/booking/editBooking";

const fetchData = async (id) => {
  try {
    const response = await fetch(getBaseURL(`booking/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const fetchDetailProduct = async (id) => {
  try {
    const response = await fetch(getBaseURL(`products/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const Page = async ({ params }) => {
  const { id } = params;

  const data = await fetchData(id);
  const product = await fetchDetailProduct(data?.productId);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex space-x-6 items-center">
        <h1 className="font-semibold text-2xl text-rinjaniVisitor-green">
          Booking Details
        </h1>
        <BookingStatus status={data?.bookingStatus} />
      </div>
      <p>{data?.note}</p>
      {data.adminMessage ? (
        <>
          <p>Admin Message : {data.adminMessage}</p>
        </>
      ) : null}
      <div className="text-sm text-slate-600 space-y-1">
        <p>Booking Id: {data?.bookingId}</p>
        <p>Order Date: {data?.createdAt}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Link className="" href={`/packages/${data.productId}`}>
          {/* thumnail */}
          <Image
            src={data?.thumbnail}
            height={500}
            width={500}
            alt="thumbnail product"
            className="rounded-2xl h-[500px] object-cover"
          />
          <h1 className="font-semibold mt-2 text-2xl text-gray-700 max-sm:text-lg max-lg:text-xl ">
            {data?.title}
          </h1>
          <div className="flex space-x-4 text-gray-700 font-normal ">
            <div className="flex items-center space-x-2">
              <Star size={24} weight="fill" /> <span>{data?.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={24} weight="fill" /> <span>{data?.location}</span>
            </div>
          </div>
        </Link>
        <div className="">
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Offering Price
            </h1>
            <p className="text-base">${data?.offeringPrice}/person</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Date and Time
            </h1>
            <p>{data?.startDateTime}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Add On
            </h1>
            <p>{data?.addOns}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Person
            </h1>
            <p>{data?.totalPersons} Person</p>
          </div>
          {data?.bookingStatus === "Waiting for Payment" ? (
            // <button>Continue</button>
            <Link
              href={`/payment/${data?.bookingId}`}
              className="block bg-rinjaniVisitor-green text-center text-white py-2 rounded-md"
            >
              Continue Payment
            </Link>
          ) : null}
          {data?.bookingStatus === "Declined" ? (
            <>
              <EditBooking data={product} />
            </>
          ) : null}
          {data?.bookingStatus === "Declined" ||
          data?.bookingStatus === "Offering" ? (
            <CancelBooking id={data?.bookingId} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Page;
