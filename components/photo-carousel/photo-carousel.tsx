import { filterByArea, getImageUrls } from "@/helpers/imageList";
import { CarouselProvider, Slider, Slide, CarouselContext, ButtonBack, ButtonNext } from "pure-react-carousel";
import { useContext, useEffect, useMemo, useState } from "react";
import classes from "./photo-carousel.module.css";
import { useViewportSize } from "@mantine/hooks";

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
    <img src={filterByArea(urls, "720-land")?.url} style={{ maxWidth: "100%", maxHeight: "100%", padding: "1px" }} />
  </picture>;
}

export default function PhotoCarousel({ photos, initialIndex }: { photos: string[], initialIndex: number }) {
  const { height, width } = useViewportSize();
  return <CarouselProvider
    naturalSlideWidth={width}
    naturalSlideHeight={height * 0.9}
    totalSlides={photos?.length}
    currentSlide={initialIndex}
  >
  <Slider className={classes.slider} classNameAnimation={classes.sliderAnimation}>
    {photos.map((photo, i) => (
      <Slide index={i} key={i} innerClassName={classes.innerSlide}>
        <LazySlide photo={photo} index={i} />
      </Slide>
    ))}
  </Slider>
  <ButtonBack className={classes.back}>‹</ButtonBack>
  <ButtonNext className={classes.next}>›</ButtonNext>
</CarouselProvider>
}