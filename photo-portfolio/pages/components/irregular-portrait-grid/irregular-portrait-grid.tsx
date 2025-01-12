import classes from './irregular-portrait-grid.module.css';
const ariana = "IMG_6867", ironFog = "IMG_0748", jadeMulticolor = "IMG_9206", redBoots = "IMG_0501";
const arianaExtras = ["IMG_6859", "IMG_6861", "IMG_6871-2", "IMG_6882"];
const ironFogExtras = ["IMG_0735", "IMG_0750"];
const redBootsExtras = ["IMG_0488", "IMG_0497"];
const neonAmy = "IMG_9629-2", mushroom = "IMG_7744", self = "IMG_7229", caliVibes = "IMG_8201";
const connect4 = "IMG_5375", leos = "IMG_5357", lightBars = "IMG_6703", earthy = "IMG_8211";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { CSSProperties, JSX, useEffect, useRef, useState } from 'react';
import { MouseEvent as ReactMouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import InlineBookCTA from '../inline-book-cta/inline-book-cta';
import { getImageUrls, filterByArea } from '@/pages/imageList';

const carouselSequence = [
  ariana, ...arianaExtras, ironFog, ...ironFogExtras, jadeMulticolor, redBoots, ...redBootsExtras, neonAmy, mushroom, self, caliVibes,
  connect4, leos, lightBars, earthy
]

function ImageBtn({ styles, openModal, loaded, baseImageName, onLoad, minLoad = 0 }: {
  baseImageName?: string;
  styles: CSSProperties,
  loaded: number;
  minLoad?: number;
  openModal: (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => void,
  onLoad: () => void;
}): JSX.Element {
  const targetIndex = carouselSequence.findIndex((v) => v === baseImageName);
  let srcSet: JSX.Element | undefined = undefined;
  const ref = useRef<HTMLImageElement>(null);
  const [imgLoaded, imgLoadedSet] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!imgLoaded && ref.current?.width) {
        imgLoadedSet(true);
        onLoad(); 
      }
    }, 100);
  })

  if (baseImageName) {
    const urls = getImageUrls(baseImageName);
    /* 
      <source media="(min-height:2560px) and (min-aspect-ratio:1.0)" srcSet={filterByArea(urls, "4k")?.url} />
      <source media="(min-height:1080px) and (min-aspect-ratio:1.0)" srcSet={filterByArea(urls, "2k")?.url} />
      <source media="(min-width:1100px) and (max-aspect-ratio:1.0)" srcSet={filterByArea(urls, "2k-port")?.url} />
      <source media="(max-aspect-ratio:1.0)" srcSet={filterByArea(urls, "1080-port")?.url} />
      */

    srcSet = <picture style={{ display: "contents" }}>
      <img onLoad={() => { imgLoadedSet(true); onLoad(); }} ref={ref} src={filterByArea(urls, "720-land")?.url} className={classes.img}/>
    </picture>
  }
  return <>
    <a
      className={classes.imgLink}
      href={`?index=${targetIndex ?? 0}`}
      onClick={(event) => openModal(event, targetIndex ?? 0)}
      style={styles}
    >
      { loaded >= minLoad ? srcSet : null}
    </a>
  </>
}

export default function IrregularPortraitGrid() {
  const [opened, { open, close }] = useDisclosure(false, { onClose: () => {
    router.push("?", undefined, { "scroll": false });
  }});
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState(1);
  const incrementLoaded = () => {
    console.warn("Loaded...");
    setLoaded(loaded + 1);
  }
  const router = useRouter();
  const searchParams = useSearchParams();

  const openModal = (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    event.preventDefault();
    setActiveImage(carouselSequence[index]);
    open();
    router.push(`?index=${index}`, undefined, { "scroll": false });
  }

  useEffect(() => {
    const imageIndex = searchParams.get("index");
    
    if (imageIndex === null) {
      close();
    } else {
      if (!opened) {
        open();
      }
      setActiveImage(carouselSequence[parseInt(imageIndex)]);
    }
    
  }, [searchParams]);

  //<img className={classes.modalImg} src={activeImage?.src} />
  return <>
    <Modal
      className={classes.modal}
      opened={opened}
      onClose={close}
      yOffset="0"
      title="Image"
      centered size="auto"
      transitionProps={{ duration: 100, enterDelay: 0 }}
    >
      <picture style={{ display: "contents" }}>
        <source media="(min-height:2560px) and (min-aspect-ratio:1.0)" srcSet={filterByArea(urls, "4k")?.url} />
        <source media="(min-height:1080px) and (min-aspect-ratio:1.0)" srcSet={filterByArea(urls, "2k")?.url} />
        <source media="(min-width:1100px) and (max-aspect-ratio:1.0)" srcSet={filterByArea(urls, "2k-port")?.url} />
        <source media="(max-aspect-ratio:1.0)" srcSet={filterByArea(urls, "1080-port")?.url} />
        <img className={classes.modalImg} src={activeImage?.src} />
      </picture>
    </Modal>
    <div className={classes.grid}>
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={0} baseImageName={ariana} styles={{ gridColumn: "1 / span 2", gridRow: "1 / span 2"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={1} baseImageName={ironFog} styles={{ gridColumn: "3", gridRow: "1"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={2} baseImageName={jadeMulticolor} styles={{ gridColumn: "3", gridRow: "2"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={3} baseImageName={redBoots} styles={{ gridColumn: "2 / span 2", gridRow: "3"}} openModal={openModal} />
      <InlineBookCTA style={{ gridColumn: "1 / span 3", gridRow: "4"}} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={4} baseImageName={neonAmy} styles={{ gridColumn: "1 / span 2", gridRow: "5 / span 2"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={5} baseImageName={mushroom} styles={{ gridColumn: "3", gridRow: "5"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={6} baseImageName={self} styles={{ gridColumn: "3", gridRow: "6"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={7} baseImageName={leos} styles={{ gridColumn: "2 / span 2", gridRow: "7"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={8} baseImageName={caliVibes} styles={{ gridColumn: "1", gridRow: "8"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={9} baseImageName={connect4} styles={{ gridColumn: "2", gridRow: "8"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={10} baseImageName={earthy} styles={{ gridColumn: "1", gridRow: "9"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={11} baseImageName={lightBars} styles={{ gridColumn: "2 / span 2", gridRow: "9 / span 2"}} openModal={openModal} />
    </div>
  </>;
}