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
    const response = await fetch(getBaseURL(`payment/${id}`), {
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

const Page = async ({ params }) => {
  const { id } = params;

  const data = await fetchData(id);

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-semibold text-rinjaniVisitor-green">
          Payment Details
        </h1>
        <BookingStatus status={data?.paymentStatus} />
      </div>
      <p>{data?.note}</p>
      {data.adminMessage ? (
        <>
          <p>Admin Message : {data.adminMessage}</p>
        </>
      ) : null}
      <div className="space-y-1 text-sm text-slate-600">
        <p>Payment Id: {data?.paymentId}</p>
        <p>Payment Date: {data?.paymentDate}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          {/* thumnail */}
          <Image
            src={data?.imageProofTransfer}
            height={500}
            width={500}
            alt="thumbnail product"
            className="h-[500px] rounded-2xl object-cover"
          />
        </div>
        <div className="">
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Tax
            </h1>
            <p>{data?.tax}%</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Sub Total
            </h1>
            <p>${data?.subTotal}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Total
            </h1>
            <p>${data?.total}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              Method
            </h1>
            <p>{data?.method}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              {data?.method == "Wise" ? "Wise Email" : "Bank Name"}
            </h1>
            <p>{data?.bankNameOrWiseEmail}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
              {data?.method == "Wise" ? "Wise Account Name" : "Bank Account Name"}
            </h1>
            <p>{data?.bankAccountNameOrWiseAccountName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
