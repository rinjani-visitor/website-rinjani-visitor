import Image from "next/image";
import ReactStars from "react-stars";
const CardReview = ({
  name,
  body,
  country,
  imageProfile,
  timestamp,
  rating,
}) => {
  return (
    <div className=" p-4 rounded-md space-y-4 border border-opacity-10 border-gray-500">
      <div className="flex space-x-2">
        <div className="aspect-square w-20 rounded-full">
          <Image src={imageProfile} alt="" width={1000} height={1000} className="rounded-full aspect-square object-cover" />
        </div>
        <div className=" w-full">
          <div>
            <h4 className="text-xl font-bold text-gray-600">{name}</h4>
            <p className="text-sm text-gray-600">{country}</p>
            <div className="flex space-x-2 items-center">
              <ReactStars
                edit={false}
                value={rating}
                count={5}
                size={20}
                color1={"#000000"}
                color2={"#15803D"}
              />
              <p>|</p>
              <p className="text-gray-600">{timestamp}</p>
            </div>
            <div className="mt-2">
              <p>{body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
