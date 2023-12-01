import VideoPlayer from "@/components/VideoPlayer"
import CardField from "@/components/home/CardField"
import Image from "next/image"

const Page = () => {

  return (
    <div className="container space-y-10 md:space-y-20">
      <section className="grid md:grid-cols-2 h-screen">
        <div className="my-auto space-y-4 md:space-y-6 text-center md:text-left">
          <p className="text-base font-light">Rinjani Visitor make Easy</p>
          <h1 className="text-[#32823A] font-semibold text-3xl md:text-6xl ">Find the Best Rinjani Trip in Here</h1>
          <p className="text-xl md:text-2xl font-normal">We Provide What You <br />Need in Rinjani</p>
          <div className="space-y-2 md:space-y-0 md:space-x-4 font-normal flex flex-col md:flex-row">
            <button className="py-2 px-4 text-white rounded-md bg-[#32823A]">Get Started</button>
            <button className="py-2 px-4 text-white rounded-md bg-[#32823A]">Contact Us</button>
          </div>
        </div>
        <div className="my-auto flex justify-end relative -order-1 md:order-1">
          <Image priority src={`https://utfs.io/f/fe1f8d1c-8a1b-4bb9-bbbe-8a9452d98ec9-aatl72.jpg`} width={500} height={500} alt="segara anak" className="w-4/5 border-8 border-[green] rounded-tr-xl rounded-s-[40px] rounded-br-[40px] shadow-2xl" />
          <Image priority src={`https://utfs.io/f/92ad6631-d79e-4fa9-ba42-6e48a80152f9-59hsri.jpg`} width={500} height={500} alt="Presean" className="absolute md:-left-20 left-0 bottom-16 w-2/3 border-8 border-[green] rounded-3xl" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-4 md:pe-28">
          <div className="space-y-8">
            <CardField order={1} title={`Easy and Safe`} body={`Now ordering Rinjani tour packages can be done easily and safely`} />
            <CardField order={2} title={`Economical Affordable`} body={`Tour packages that are affordable and provide an extraordinary experience`} />
          </div>
          <div className="pt-8 space-y-8">
            <CardField order={3} title={`Trusted and Reliable`} body={`We try to provide the best to tourists by maintaining trust`} />
            <CardField order={4} title={`Eco Tourism`} body={`Tourism while protecting preserving nature is the main goal`} />
          </div>
        </div>
        <div className="space-y-8 md:text-end text-center -order-1 md:order-1">
          <h1 className="md:text-5xl text-3xl font-semibold text-rinjaniVisitor-green">Why Rinjani Visitor ?</h1>
          <p className="font-normal text-lg md:text-xl">Committed to providing services <br /> with an exeptional experience</p>
          <div className="grid grid-cols-3 divide-x-2 divide-slate-300 text-center">
            <div className="space-y-2">
              <h3 className="md:text-8xl text-5xl font-semibold text-[#2F4B32] ">21</h3>
              <p className="md:text-base text-sm font-normal">Package Available</p>
            </div>
            <div className="space-y-2">
              <h3 className="md:text-8xl text-5xl font-semibold text-[#2F4B32]">21</h3>
              <p className="md:text-base text-sm font-normal">Package Available</p>
            </div>
            <div className="space-y-2">
              <h3 className="md:text-8xl text-5xl font-semibold text-[#2F4B32]">21</h3>
              <p className="md:text-base text-sm font-normal">Package Available</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg text-white bg-rinjaniVisitor-green text-center w-full md:w-auto">Continue to explore</button>
        </div>
      </section>

      <section className="grid grid-cols-2 relative">
        <div className="space-y-6">
          <h1 className="text-5xl font-semibold text-[green]">About Us</h1>
          <p className="text-2xl font-normal">Rinjani Visitor is a service to accommodate tourist in enjoying the beauty of Rinjani Mount and the culture of Lombok</p>
          <button className="px-4  py-2 rounded-lg text-white bg-green-500">Watch Our Video</button>
        </div>
        <div className="flex justify-end relative">
          <Image src={`https://utfs.io/f/4d0ecb10-846a-44ae-9cd4-6b67166438e6-1krp1h.jpg`} width={1000} height={1000} alt="..." className=" border-[green] h-screen w-auto object-contain border-8 rounded-tl-[60px] rounded-[20px]" />
        </div>
        <VideoPlayer />
      </section>

      {/* <section className="">
        <h1>Trip Package</h1>
        <p>Let’s start your journey with us to explore the beatiful rinjani</p>
        <button>See More Packages</button>
      </section> */}

      <section className="flex flex-col items-center space-y-4 md:space-y-10 py-10">
        <h1 className="text-4xl md:text-5xl text-center md:text-start font-semibold text-green-700">What our customers say?</h1>
        <p className="text-center text-sm md:text-xl font-normal">
          If you want to know more about Rinjani Visitors, you can contact us directly by writing this message
        </p>
        <div className="w-full text-center">
          <input className="border w-full md:w-3/4 px-6 md:h-20 h-10 md:text-xl rounded-lg md:rounded-2xl focus:outline-none" placeholder="Type here what you need..." />
        </div>
      </section>
    </div>
  )
}

export default Page
