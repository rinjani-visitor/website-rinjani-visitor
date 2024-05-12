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
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-semibold text-rinjaniVisitor-green">
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
      <div className="space-y-2 text-sm text-slate-600">
        <p>Booking Id: {data?.bookingId}</p>
        <p>Order Date: {data?.createdAt}</p>
        {["Payment Reviewing", " Payment Failed", "Success"].includes(
          data?.bookingStatus,
        ) ? (
          <Link
            href={`/booking/payments/${id}`}
            className="mt-4 inline-block italic text-rinjaniVisitor-green underline"
          >
            See Payment Details
          </Link>
        ) : null}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Link className="" href={`/packages/${data.productId}`}>
          {/* thumnail */}
          <Image
            src={data?.thumbnail}
            height={500}
            width={500}
            alt="thumbnail product"
            className="h-[500px] rounded-2xl object-cover"
          />
          <h1 className="mt-2 text-2xl font-semibold text-gray-700 max-lg:text-xl max-sm:text-lg ">
            {data?.title}
          </h1>
          <div className="flex space-x-4 font-normal text-gray-700 ">
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
            <p>{data?.addOns ? data.addOns : "-"}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Person
            </h1>
            <p>{data?.totalPersons} Person</p>
          </div>
          {data?.bookingStatus === "Waiting for Payment" ||
          data?.bookingStatus === "Payment Failed" ? (
            // <button>Continue</button>
            <Link
              href={`/payment/${data?.bookingId}`}
              className="block rounded-md bg-rinjaniVisitor-green py-2 text-center text-white"
            >
              {data?.bookingStatus == "Waiting for Payment"
                ? "Continue Payment"
                : "Payment Again"}
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
