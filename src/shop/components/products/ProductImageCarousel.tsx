import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ProductImage } from "../../../interfaces/product";
import { Swiper as SwiperType } from 'swiper'; 

interface Props {
  images: ProductImage[]
}

export const ProductImageCarousel = ({images}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const goToSlide = (i: number) => {
    if (swiper) {
      swiper.slideTo(i);
    }
  }

  return (
    <div className="w-full">
      <div className="h-96 w-full">
        <Swiper
          onSwiper={setSwiper}
          spaceBetween={20}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          navigation={true}
        >
          {
            images.map((image, i) => (
              <SwiperSlide key={image.id}>
                <img src={image.url} alt={`imagen producto ${i + 1}`} className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mt-4">
        {
          images.map((img, idx) => (
            <div key={img.id} className={`overflow-hidden rounded-lg cursor-pointer border hover:border-gray-400 ${activeIndex === idx ? "border-blue-500 " : "border-gray-200"}`} onClick={() => goToSlide(idx)}>
              <img src={img.url} alt={`imagen producto ${idx + 1}`} className="h-full w-full object-contain"/>
            </div>
          ))
        }
      </div>
    </div>
  )
}