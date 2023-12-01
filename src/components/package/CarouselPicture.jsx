import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image"

const CarouselPicture = ({ images }) => {
  return (
    <Carousel showThumbs={false}>
      {
        images && images.map(image => (
          <div key={image.fotoId} className="h-[360px]">
            <Image src={`${image.url}`} alt="presean" width={500} height={500} className="object-center" priority/>
          </div>
        ))
      }
    </Carousel>
  )
}

export default CarouselPicture