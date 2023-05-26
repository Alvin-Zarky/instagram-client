import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImagePreview } from "../../types/util";

export default function ImageDisplay({ media }: ImagePreview) {
  // const [file, setFile] = useState<any[]>([]);

  // useEffect(() => {
  //   Array.from(media).forEach((val: any, ind: number) => {
  //     for (let data of val) {
  //       setFile((prev: any) => [
  //         ...prev,
  //         { url: URL.createObjectURL(data as any), type: data.type },
  //       ]);
  //     }
  //   });

  //   return () => {
  //     setFile([]);
  //   };
  // }, [media]);

  return (
    <>
      {media?.length === 1 ? (
        media[0].type.startsWith("image") ? (
          <img src={media[0].url} alt="singleGallary" />
        ) : (
          <video src={media[0].url} autoPlay />
        )
      ) : (
        <div className="image-slider-post">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {media.map((val: any, ind: number) => (
              <SwiperSlide key={ind}>
                {val.type.startsWith("image") ? (
                  <img src={val.url} alt="gallary" />
                ) : (
                  <video src={val.url} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
