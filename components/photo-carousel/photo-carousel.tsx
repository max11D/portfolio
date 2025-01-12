import { filterByArea, getImageUrls } from "@/helpers/imageList";
import { CarouselProvider, Slider, Slide, CarouselContext } from "pure-react-carousel";
import { useContext, useEffect, useMemo, useState } from "react";
import classes from "./photo-carousel.module.css";

/*<source media="(min-height:2560px) and (min-aspect-ratio:1.0)" srcSet={filterByArea(urls, "4k")?.url} />
        <source media="(min-height:1080px) and (min-aspect-ratio:1.0)" srcSet={filterByArea(urls, "2k")?.url} />
        <source media="(min-width:1100px) and (max-aspect-ratio:1.0)" srcSet={filterByArea(urls, "2k-port")?.url} />
        <source media="(max-aspect-ratio:1.0)" srcSet={filterByArea(urls, "1080-port")?.url} />*/

function LazySlide({ photo, index, delta = 1 }: { photo: string, delta?: number, index: number }) {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide] = useState(carouselContext.state.currentSlide);
  const [load, setLoad] = useState(Math.abs(currentSlide - index) <= delta);

  useEffect(() => {
    function onChange() {
      if (Math.abs(carouselContext.state.currentSlide - index) <= delta) {
        setLoad(true);
      }
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext, index, delta]);

  useEffect(() => {
    if (Math.abs(currentSlide - index) <= delta) {
      setLoad(true);
    }
  }, [currentSlide, index, delta]);

  const urls  = useMemo(() => getImageUrls(photo), [photo]);

  if (!load) {
    return <div></div>;
  }

  return <picture style={{ display: "contents" }}>
    <source media="(min-height:2560px) and (min-aspect-ratio:1.0)" srcSet={filterByArea(urls, "4k")?.url} />
    <source media="(min-height:1080px) and (min-aspect-ratio:1.0)" srcSet={filterByArea(urls, "2k")?.url} />
    <source media="(min-width:1100px) and (max-aspect-ratio:1.0)" srcSet={filterByArea(urls, "2k-port")?.url} />
    <source media="(max-aspect-ratio:1.0)" srcSet={filterByArea(urls, "1080-port")?.url} />
    <img src={filterByArea(urls, "720-land")?.url} style={{ maxWidth: "100%", maxHeight: "100%" }} />
  </picture>;
}

export default function PhotoCarousel({ photos, initialIndex }: { photos: string[], initialIndex: number }) {
  return <CarouselProvider
  naturalSlideWidth={1200}
  naturalSlideHeight={800}
  totalSlides={photos?.length}
  currentSlide={initialIndex}
>
  <Slider style={{ width: "92vw"}}>
    {photos.map((photo, i) => (
      <Slide index={i} key={i} innerClassName={classes.innerSlide}>
        <LazySlide photo={photo} index={i} />
      </Slide>
    ))}
  </Slider>
</CarouselProvider>
}