import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image"

const CarouselPicture = ({ images }) => {
  return (
    <Carousel showThumbs={false}>
      {
        images && images.map(image => (
          <div key={image.fotoId} className="h-[360px]">
            <Image src={`${image.url}`} alt="presean" width={1000} height={500} className="object-cover w-full h-full" priority/>
          </div>
        ))
      }
    </Carousel>
  )
}

export default CarouselPicture