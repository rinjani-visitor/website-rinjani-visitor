import Prms from "@/components/Prms";

const Page = ({ searchParams }) => {
  const { a } = searchParams;
  console.log(a);

  return (
    <div>
      <Prms />
      {/* <p>use params</p> */}
      {user
        .filter((item) => item.title.includes(a))
        .map((item, key) => (
          <div key={key}>
            <p>{item.title}</p>
            <p>{item.body}</p>
          </div>
        ))}
    </div>
  );
};

const user = [
  {
    title: "FR",
    body: "lorem10",
  },
  {
    title: "US",
    body: "lorem10",
  },
  {
    title: "CA",
    body: "lorem10",
  },
];

export default Page;
