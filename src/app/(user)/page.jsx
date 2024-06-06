"use client";

import CardReviewHome from "@/components/CardReviewHome";
import VideoPlayer from "@/components/VideoPlayer";
import CardField from "@/components/home/CardField";
import ContactAdmin from "@/components/home/ContactAdmin";
import getBaseURL from "@/libs/getBaseURL";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { useEffect, useState } from "react";

const fetchData = async () => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard`,
      {
        cache: "no-store",
        method: "GET",
      },
    );

    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const fetchReviews = async () => {
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`, {
      // cache: "force-cache",
      method: "GET",
    });

    const res = await req.json();
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Page = () => {
  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [fetchedData, fetchedReviews] = await Promise.all([
          fetchData(),
          fetchReviews(),
        ]);
        setData(fetchedData);
        setReviews(fetchedReviews);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const sliceReview = reviews?.slice(-10);

  return (
    <div className="container max-w-6xl space-y-10">
      <section className="grid md:grid-cols-2">
        <div className="my-auto space-y-2 text-center md:space-y-4 md:text-left">
          <p className="text-xl font-semibold text-rinjaniVisitor-green">
            Rinjani Visitor make Easy
          </p>
          <h1 className="text-3xl font-semibold text-[#32823A] md:text-5xl ">
            Find the Best Rinjani Trip in Here
          </h1>
          <p className="font-base text-lg md:text-xl">
            We Provide What You Need in Rinjani
          </p>
          <div className="flex flex-col space-y-2 font-normal md:flex-row md:space-x-4 md:space-y-0">
            <Link
              className="rounded-md bg-[#32823A] px-4 py-2 text-white hover:bg-green-700"
              href={"#2"}
            >
              Get Started
            </Link>
            <Link
              className="rounded-md border border-[#32823A] px-4 py-2 text-[#32823A] hover:bg-[#32823a] hover:text-white"
              href={"#5"}
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="relative -order-1 my-auto flex justify-end md:order-1">
          <Image
            priority
            src={`https://utfs.io/f/fe1f8d1c-8a1b-4bb9-bbbe-8a9452d98ec9-aatl72.jpg`}
            width={500}
            height={500}
            alt="segara anak"
            className="w-4/5 rounded-s-[40px] rounded-br-[40px] rounded-tr-xl border-8 border-[green] object-cover shadow-2xl"
          />
          <Image
            priority
            src={`https://utfs.io/f/92ad6631-d79e-4fa9-ba42-6e48a80152f9-59hsri.jpg`}
            width={500}
            height={500}
            alt="Presean"
            className="absolute bottom-16 left-0 w-2/3 rounded-3xl border-8 border-[green] md:-left-20"
          />
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2" id="2">
        <div className="grid grid-cols-2 gap-4 md:pe-28">
          <div className="space-y-8">
            <CardField
              order={1}
              title={`Easy and Safe`}
              body={`Now ordering Rinjani tour packages can be done easily and safely`}
            />
            <CardField
              order={2}
              title={`Economical Affordable`}
              body={`Tour packages that are affordable and provide an extraordinary experience`}
            />
          </div>
          <div className="space-y-8 pt-8">
            <CardField
              order={3}
              title={`Trusted and Reliable`}
              body={`We try to provide the best to tourists by maintaining trust`}
            />
            <CardField
              order={4}
              title={`Eco Tourism`}
              body={`Tourism while protecting preserving nature is the main goal`}
            />
          </div>
        </div>
        <div className="-order-1 space-y-8 text-center md:order-1 md:text-end">
          <h1 className="text-3xl font-semibold text-rinjaniVisitor-green md:text-5xl">
            Why Rinjani Visitor ?
          </h1>
          <p className="text-lg font-normal md:text-xl">
            Committed to providing services <br /> with an exeptional experience
          </p>
          {loading ? (
            <div className="h-20 w-full animate-pulse bg-gray-200 rounded-xl"></div>
          ) : (
            // <p>loading</p>
            <div className="grid grid-cols-3 divide-x-2 divide-slate-300 text-center">
              <div className="space-y-2">
                <h3 className="text-5xl font-semibold text-[#2F4B32] md:text-8xl ">
                  {data?.userCount}
                </h3>
                <p className="text-sm font-normal md:text-base">
                  Registered User
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-5xl font-semibold text-[#2F4B32] md:text-8xl">
                  {data.averageRating ? data?.averageRating.toFixed(1) : 0}
                </h3>
                <p className="text-sm font-normal md:text-base">
                  Avarage Rating
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-5xl font-semibold text-[#2F4B32] md:text-8xl">
                  {data?.productCount}
                </h3>
                <p className="text-sm font-normal md:text-base">
                  Package Available
                </p>
              </div>
            </div>
          )}
          <Link
            className="inline-block w-full rounded-lg bg-rinjaniVisitor-green px-4 py-2 text-center text-white md:w-auto"
            href={"#3"}
          >
            Continue to explore
          </Link>
        </div>
      </section>

      <section
        id="3"
        className="relative grid space-y-6 md:grid-cols-2 md:space-y-0"
      >
        <div className="space-y-4 text-center md:space-y-6 md:text-left">
          <h1 className="text-3xl font-semibold text-[green] md:text-5xl">
            About Us
          </h1>
          <p className="font-normal md:text-xl">
            Rinjani Visitor is a service to accommodate tourist in enjoying the
            beauty of Rinjani Mount and the culture of Lombok
          </p>
          <Link
            className="inline-block rounded-lg bg-green-500 px-4 py-2 text-white"
            href={"https://www.youtube.com/watch?v=ijhs79_A02E"}
          >
            Watch Our Video
          </Link>
          <VideoPlayer />
        </div>
        <div className="relative flex justify-end space-y-4 overflow-hidden">
          <Image
            src={`https://utfs.io/f/4d0ecb10-846a-44ae-9cd4-6b67166438e6-1krp1h.jpg`}
            width={1000}
            height={1000}
            alt="..."
            className=" rounded-[20px] border-8 border-rinjaniVisitor-green object-cover md:w-4/5 md:rounded-tl-[60px]"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h1 className="text-center text-4xl font-semibold text-green-700 md:text-5xl">
          Home Stay
        </h1>
        <p className="text-center text-sm md:text-xl">
          Explore rinjani mountain and feel to live with local people
        </p>
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <Image
              priority
              src={`/assets/1.png`}
              width={500}
              height={500}
              alt="asdasd"
            />
            <Image
              priority
              src={`/assets/2.png`}
              width={500}
              height={500}
              alt="asdasd"
              className="absolute -right-20 bottom-10 h-3/5 object-contain"
            />
          </div>
          <div className="space-y-4">
            <Image
              priority
              src={`/assets/296.png`}
              height={500}
              width={500}
              alt="how"
            />
            <p className="ms-auto w-2/3 text-end text-lg font-medium md:text-xl">
              We previously opened home stay rentals on{" "}
              <span className="text-rinjaniVisitor-green"> booking.com </span>
              and have had many customers give good reviews
            </p>
            <div className="ms-auto w-fit">
              <Link
                className="ms-auto inline-block rounded-lg bg-green-500 px-4 py-2 text-white"
                href={"/homestay"}
              >
                Home Stay
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h1 className="text-center text-4xl font-semibold text-green-700 md:text-start md:text-5xl">
          What our customers say
        </h1>
        <p className="text-sm md:text-xl">
          Let&apos;s feel the same thing as them or even more than them
        </p>
        <Marquee className="" speed={100} autoFill={true}>
          {sliceReview?.map((item) => (
            <>
              <CardReviewHome
                body={item.messageReview}
                name={item.name}
                country={item.country}
                profile={item.profilPicture}
              />
            </>
          ))}
        </Marquee>
      </section>

      <section
        className="flex flex-col items-center space-y-4 py-10 md:space-y-10"
        id="5"
      >
        <h1 className="text-center text-4xl font-semibold text-green-700 md:text-start md:text-5xl">
          What are you waiting for?
        </h1>
        <p className="text-center text-sm font-normal md:w-3/5 md:text-xl">
          If you want to know more about Rinjani Visitors, you can contact us
          directly by writing this message
        </p>
        <div className="flex w-full justify-center">
          <ContactAdmin />
        </div>
      </section>
    </div>
  );
};

export default Page;
