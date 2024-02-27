import CardReviewHome from "@/components/CardReviewHome";
import VideoPlayer from "@/components/VideoPlayer";
import CardField from "@/components/home/CardField";
import ContactAdmin from "@/components/home/ContactAdmin";
import getBaseURL from "@/libs/getBaseURL";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const fetchData = async () => {
  try {
    const req = await fetch(
      "https://rinjani-visitor-web-nvyjfyoxzq-et.a.run.app/api/dashboard",
      {
        cache: "no-store",
        method: "GET",
      }
    );

    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const fetchReviews = async () => {
  try {
    const req = await fetch(
      "https://rinjani-visitor-web-nvyjfyoxzq-et.a.run.app/api/reviews",
      {
        // cache: "force-cache",
        method: "GET",
      }
    );

    const res = await req.json();
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Page = async () => {
  const [data, reviews] = await Promise.all([fetchData(), fetchReviews()]);

  const sliceReview = reviews.slice(-10);

  console.log(data);

  return (
    <div className="container max-w-6xl space-y-10">
      <section className="grid md:grid-cols-2">
        <div className="my-auto space-y-2 md:space-y-4 text-center md:text-left">
          <p className="text-xl font-semibold text-rinjaniVisitor-green">
            Rinjani Visitor make Easy
          </p>
          <h1 className="text-[#32823A] font-semibold text-3xl md:text-5xl ">
            Find the Best Rinjani Trip in Here
          </h1>
          <p className="text-lg md:text-xl font-base">
            We Provide What You Need in Rinjani
          </p>
          <div className="space-y-2 md:space-y-0 md:space-x-4 font-normal flex flex-col md:flex-row">
            <Link
              className="py-2 px-4 text-white rounded-md bg-[#32823A] hover:bg-green-700"
              href={"#2"}
            >
              Get Started
            </Link>
            <Link
              className="py-2 px-4 text-[#32823A] hover:text-white hover:bg-[#32823a] rounded-md border border-[#32823A]"
              href={"#5"}
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="my-auto flex justify-end relative -order-1 md:order-1">
          <Image
            priority
            src={`https://utfs.io/f/fe1f8d1c-8a1b-4bb9-bbbe-8a9452d98ec9-aatl72.jpg`}
            width={500}
            height={500}
            alt="segara anak"
            className="w-4/5 object-cover border-8 border-[green] rounded-tr-xl rounded-s-[40px] rounded-br-[40px] shadow-2xl"
          />
          <Image
            priority
            src={`https://utfs.io/f/92ad6631-d79e-4fa9-ba42-6e48a80152f9-59hsri.jpg`}
            width={500}
            height={500}
            alt="Presean"
            className="absolute md:-left-20 left-0 bottom-16 w-2/3 border-8 border-[green] rounded-3xl"
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8" id="2">
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
          <div className="pt-8 space-y-8">
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
        <div className="space-y-8 md:text-end text-center -order-1 md:order-1">
          <h1 className="md:text-5xl text-3xl font-semibold text-rinjaniVisitor-green">
            Why Rinjani Visitor ?
          </h1>
          <p className="font-normal text-lg md:text-xl">
            Committed to providing services <br /> with an exeptional experience
          </p>
          <div className="grid grid-cols-3 divide-x-2 divide-slate-300 text-center">
            <div className="space-y-2">
              <h3 className="md:text-8xl text-5xl font-semibold text-[#2F4B32] ">
                {data.userCount}
              </h3>
              <p className="md:text-base text-sm font-normal">
                Registered User
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="md:text-8xl text-5xl font-semibold text-[#2F4B32]">
                {data.averageRating}
              </h3>
              <p className="md:text-base text-sm font-normal">Avarage Rating</p>
            </div>
            <div className="space-y-2">
              <h3 className="md:text-8xl text-5xl font-semibold text-[#2F4B32]">
                {data.productCount}
              </h3>
              <p className="md:text-base text-sm font-normal">
                Package Available
              </p>
            </div>
          </div>
          <Link
            className="px-4 py-2 rounded-lg inline-block text-white bg-rinjaniVisitor-green text-center w-full md:w-auto"
            href={"#3"}
          >
            Continue to explore
          </Link>
        </div>
      </section>

      <section
        id="3"
        className="grid md:grid-cols-2 relative space-y-6 md:space-y-0"
      >
        <div className="md:space-y-6 space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-semibold text-[green]">
            About Us
          </h1>
          <p className="md:text-xl font-normal">
            Rinjani Visitor is a service to accommodate tourist in enjoying the
            beauty of Rinjani Mount and the culture of Lombok
          </p>
          <Link
            className="px-4 py-2 rounded-lg text-white bg-green-500 inline-block"
            href={"https://www.youtube.com/watch?v=ijhs79_A02E"}
          >
            Watch Our Video
          </Link>
          <VideoPlayer />
        </div>
        <div className="flex justify-end relative space-y-4 overflow-hidden">
          <Image
            src={`https://utfs.io/f/4d0ecb10-846a-44ae-9cd4-6b67166438e6-1krp1h.jpg`}
            width={1000}
            height={1000}
            alt="..."
            className=" border-rinjaniVisitor-green md:w-4/5 object-cover border-8 md:rounded-tl-[60px] rounded-[20px]"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl text-center font-semibold text-green-700">
          Home Stay
        </h1>
        <p className="text-sm md:text-xl text-center">
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
              className="absolute bottom-10 -right-20 h-3/5 object-contain"
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
            <p className="text-end md:text-xl text-lg font-medium w-2/3 ms-auto">
              We previously opened home stay rentals on{" "}
              <span className="text-rinjaniVisitor-green"> booking.com </span>
              and have had many customers give good reviews
            </p>
            <div className="ms-auto w-fit">
              <Link
                className="px-4 inline-block py-2 ms-auto rounded-lg text-white bg-green-500"
                href={"/homestay"}
              >
                Home Stay
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl text-center md:text-start font-semibold text-green-700">
          What our customers say
        </h1>
        <p className="text-sm md:text-xl">
          Let&apos;s feel the same thing as them or even more than them
        </p>
        <Marquee className="" speed={100} autoFill={true}>
          {sliceReview.map((item) => (
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
        className="flex flex-col items-center space-y-4 md:space-y-10 py-10"
        id="5"
      >
        <h1 className="text-4xl md:text-5xl text-center md:text-start font-semibold text-green-700">
          What are you waiting for?
        </h1>
        <p className="text-center text-sm md:text-xl font-normal md:w-3/5">
          If you want to know more about Rinjani Visitors, you can contact us
          directly by writing this message
        </p>
        <div className="w-full flex justify-center">
          <ContactAdmin />
        </div>
      </section>
    </div>
  );
};

export default Page;
