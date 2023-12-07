import HeaderPackage from "@/components/HeaderPackage";
import CardPackageList from "@/components/package/CardPackageList";
import Filter from "@/components/package/Filter";

const Page = () => {
  return (
    <div className="container">
      <HeaderPackage title={`Package List`} subtitle={`Let’s start your journey with us to explore the beatiful rinjani`} />
      <div className="grid grid-cols-5">
        <div className="">
          <Filter />
        </div>
        {/* <div className="col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 h-fit"> */}
        <CardPackageList />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Page;
