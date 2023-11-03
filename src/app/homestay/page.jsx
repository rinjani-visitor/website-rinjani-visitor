import HeaderPackage from "@/components/HeaderPackage";
import FilterPackage from "@/components/package/filter/Filter";

const Page = () => {
  return (
    <div className="container">
      <HeaderPackage title={`Home Stay`} subtitle={`Explore rinjani mountain and feel to live with local people`} />
      <div className="grid grid-cols-5">
        <div className="border">
          <FilterPackage />
        </div>
        <div className="border border-slate-900 col-span-4">
          as
        </div>
      </div>
    </div>
  );
};

export default Page;
