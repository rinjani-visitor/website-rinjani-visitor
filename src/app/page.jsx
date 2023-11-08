import VideoPlayer from "@/components/VideoPlayer"
import CardField from "@/components/home/CardField"
import Image from "next/image"

const Page = () => {
  return (
    <div className="container space-y-20">
      <section className="grid grid-cols-2 h-screen">
        <div className="my-auto space-y-6">
          <p className="text-base font-light">Rinjani Visitor make Easy</p>
          <h1 className="text-[#32823A] font-semibold text-6xl">Find the Best Rinjani <br /> Trip in Here</h1>
          <p className="text-2xl font-normal">We Provide What You <br />Need in Rinjani</p>
          <div className="space-x-4 font-normal">
            <button className="py-2 px-4 text-white rounded-md bg-[#32823A]">Get Started</button>
            <button className="py-2 px-4 rounded-md text-[#32823A] border">Contact Us</button>
          </div>
        </div>
        <div className="my-auto flex justify-end relative">
          <Image priority src={`/assets/segaraanak.jpg`} width={500} height={500} alt="segara anak" className="w-4/5 border-8 border-[green] rounded-tr-xl rounded-s-[40px] rounded-br-[40px] shadow-2xl" />
          <Image priority src={`/assets/presean.jpg`} width={500} height={500} alt="Presean" className="absolute -left-20 bottom-16 w-2/3 border-8 border-[green] rounded-[32px]" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-8 pe-28">
          <div className="space-y-8">
            <CardField order={1} title={`Easy and Safe`} body={`Now ordering Rinjani tour packages can be done easily and safely`} />
            <CardField order={2} title={`Cheap`} body={`Tour packages that are affordable and provide an extraordinary experience`} />
          </div>
          <div className="pt-8 space-y-8">
            <CardField order={3} title={`Trusted`} body={`We try to provide the best to tourists by maintaining trust`} />
            <CardField order={4} title={`Eco Tourism`} body={`Tourism while protecting preserving nature is the main goal`} />
          </div>
        </div>
        <div className="space-y-8 text-end">
          <h1 className="text-5xl font-semibold">Why Rinjani Visitor ?</h1>
          <p className="font-normal text-xl">Committed to providing services <br /> with an exeptional experience</p>
          <div className="grid grid-cols-3 divide-x text-center">
            <div className="space-y-2">
              <h3 className="text-8xl font-semibold">23</h3>
              <p>Package Available</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-8xl font-semibold">23</h3>
              <p>Home Stay</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-8xl font-semibold">23</h3>
              <p>Year Operation</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg text-white bg-green-500">Continue to explore</button>
        </div>
      </section>

      <section className="grid grid-cols-2 relative">
        <div className="space-y-6">
          <h1 className="text-5xl font-semibold text-[green]">About Us</h1>
          <p className="text-2xl font-normal">Rinjani Visitor is a service to accommodate tourist in enjoying the beauty of Rinjani Mount and the culture of Lombok</p>
          <button className="px-4  py-2 rounded-lg text-white bg-green-500">Watch Our Video</button>
        </div>
        <div className="flex justify-end relative">
          <Image src="/assets/danau.jpg" width={1000} height={1000} alt="..." className=" border-[green] h-screen w-auto object-contain border-8 rounded-tl-[60px] rounded-[20px]" />
        </div>
        <VideoPlayer />
      </section>

      <section className="">
        <h1>Trip Package</h1>
        <p>Let’s start your journey with us to explore the beatiful rinjani</p>
        <button>See More Packages</button>
      </section>

      <section className="flex flex-col items-center space-y-10 py-10">
        <h1 className="text-5xl font-semibold text-green-700">What are you waiting for?</h1>
        <p className="text-center text-xl font-normal">
          If you want to know more about Rinjani Visitors, <br /> you can contact us directly by writing this message
        </p>
        <div className="w-full text-center">
          <input className="border w-3/4 px-6 h-20 text-xl rounded-2xl focus:outline-none" placeholder="Type here what you need..." />
        </div>
      </section>
    </div>
  )
}

export default Page
