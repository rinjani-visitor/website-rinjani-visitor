import Image from "next/image";

const CardReviewHome = ({ name, country, body, profile }) => {
  return (
    <div className="w-96 h-40 rounded-md bg-white shadow p-4 me-4 hover:bg-green-600 hover:text-white transition-all duration-150">
      <p className="line-clamp-2">{body}</p>
      <div className="flex items-center space-x-4 mt-4">
        <div className="aspect-square rounded-full overflow-hidden h-16 ">
          <Image src={profile} width={500} height={500} alt="avatar" />
        </div>
        <div className="">
          <h1 className="text-lg font-medium">{name}</h1>
          <p>{country}</p>
        </div>
      </div>
    </div>
  );
};

export default CardReviewHome;
