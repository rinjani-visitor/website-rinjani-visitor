import HeaderPackage from "@/components/HeaderPackage";
import CardPackage from "@/components/package/CardPackage";
import FilterPackage from "@/components/package/filter/Filter";

const Page = () => {
  return (
    <div className="container">
      <HeaderPackage title={`Package List`} subtitle={`Let’s start your journey with us to explore the beatiful rinjani`} />
      <div className="grid grid-cols-5">
        <div className="">
          <FilterPackage />
        </div>
        <div className="col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 h-fit">
          <CardPackage />
          <CardPackage />
          <CardPackage />
          <CardPackage />
          <CardPackage />
        </div>
      </div>
    </div>
  );
};

export default Page;
