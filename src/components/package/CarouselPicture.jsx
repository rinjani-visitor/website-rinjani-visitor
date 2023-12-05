import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image"

const CarouselPicture = ({ images }) => {
  return (
    <Carousel showThumbs={false}>
      {
        images && images.map(image => (
          <div key={image.fotoId} className="h-auto">
            <Image src={`${image.url}`} alt="presean" width={1000} height={500} className="object-center h-auto" priority/>
          </div>
        ))
      }
    </Carousel>
  )
}

export default CarouselPicture