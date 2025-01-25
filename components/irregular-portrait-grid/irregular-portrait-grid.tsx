/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './irregular-portrait-grid.module.css';
const ariana = "IMG_6867", ironFog = "IMG_0748", jadeMulticolor = "IMG_9206";
const arianaExtras = ["IMG_6859", "IMG_6861", "IMG_6871-2", "IMG_6882"];
const ironFogExtras = ["IMG_0735", "IMG_0750"];
const redBoots = "IMG_0501", redBootsExtras = ["IMG_0488", "IMG_0497"];
const jadeRainbowBoots = "IMG_0476", jadeRainbowBootsExtras = ["IMG_0475", "IMG_0481"];
const ella = "IMG_8152";
const neonAmy = "IMG_9629-2", mushroom = "IMG_7744", self = "IMG_7229", caliVibes = "IMG_8201";
const neonAmyExtras = ["IMG_9642", "IMG_9643"];
const connect4 = "IMG_5375", leos = "IMG_5357", earthy = "IMG_8211";
const shikha = "IMG_4986-Enhanced-NR";
const alyssa = "IMG_6962-3";
const goofyDrink = "IMG_7517";
const allysha = "IMG_7841";
const cyberpunk = "IMG_1766", cyberpunkExtras = ["IMG_1779", "IMG_1788"];
const louWide = "IMG_1706", louCircle = "IMG_1392", louStartrails = "IMG_1856";
const louStartrailsExtras = ["IMG_1848", "IMG_1867", "IMG_1998"];
const ominousJustin = "IMG_1906", ominousJustinExtra = "IMG_1913";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { CSSProperties, JSX, useEffect, useRef, useState } from 'react';
import { MouseEvent as ReactMouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import InlineBookCTA from '../inline-book-cta/inline-book-cta';
import { getImageUrls, filterByArea } from '@/helpers/imageList';
import PhotoCarousel from '../photo-carousel/photo-carousel';

const carouselSequence = [
  ariana, ...arianaExtras, ominousJustin, ominousJustinExtra, connect4,
  louStartrails, ...louStartrailsExtras, neonAmy, ...neonAmyExtras,
  mushroom, self, shikha, alyssa, louWide, leos, caliVibes,
  ironFog, ...ironFogExtras, cyberpunk, ...cyberpunkExtras, earthy, louCircle,
  ella, jadeRainbowBoots, ...jadeRainbowBootsExtras, allysha,
]

function ImageBtn({ styles, openModal, loaded, baseImageName, onLoad, minLoad = 0, big = false }: {
  baseImageName?: string;
  styles: CSSProperties,
  loaded: number;
  minLoad?: number;
  big?: boolean
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
  });

  if (baseImageName) {
    const urls = getImageUrls(baseImageName);
    srcSet = <picture style={{ display: "contents" }}>
      <img onLoad={() => { imgLoadedSet(true); onLoad(); }} ref={ref} src={filterByArea(urls, big ? "1080-land" : "720-land")?.url} className={classes.img}/>
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
  const [activeImageIndex, setactiveImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(1);
  const incrementLoaded = () => {
    setLoaded(loaded + 1);
  }
  const router = useRouter();
  const searchParams = useSearchParams();

  const openModal = (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    event.preventDefault();
    setactiveImageIndex(index);
    open();
    router.push(`?index=${index}`, undefined, { "scroll": false });
  }

  useEffect(() => {
    setTimeout(() => setLoaded(1000), 1500);
  });

  useEffect(() => {
    const imageIndex = searchParams.get("index");
    
    if (imageIndex === null) {
      close();
    } else {
      if (!opened) {
        open();
      }
      setactiveImageIndex(parseInt(imageIndex));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  let n = 0;

  const nextLoad = () => { n += 1; return n - 1; }

  return <>
    <Modal
      className={classes.modal}
      opened={opened}
      onClose={close}
      yOffset="0"
      title="Image"
      centered size="auto"
      transitionProps={{ duration: 100, enterDelay: 0 }}
      style={{"--mantine-color-body": "black"}}
      shadow={"#ff000033 0px 0px 12px 2px"}
    >
      <PhotoCarousel photos={carouselSequence} initialIndex={activeImageIndex} />
    </Modal>
    <div className={classes.grid}>
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={ariana} styles={{ gridColumn: "1 / span 2", gridRow: "1 / span 2"}} openModal={openModal} big />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={ominousJustin} styles={{ gridColumn: "3", gridRow: "1"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={connect4} styles={{ gridColumn: "3", gridRow: "2"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={louStartrails} styles={{ gridColumn: "2 / span 2", gridRow: "3"}} openModal={openModal} />
      <InlineBookCTA style={{ gridColumn: "1 / span 3", gridRow: "4"}} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={neonAmy} styles={{ gridColumn: "1 / span 2", gridRow: "5 / span 2"}} openModal={openModal} big />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={mushroom} styles={{ gridColumn: "3", gridRow: "5"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={self} styles={{ gridColumn: "3", gridRow: "6"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={shikha} styles={{ gridColumn: "1", gridRow: "7"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={alyssa} styles={{ gridColumn: "2", gridRow: "7"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={louWide} styles={{ gridColumn: "1 / span 3", gridRow: "8"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={leos} styles={{ gridColumn: "2 / span 2", gridRow: "9"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={caliVibes} styles={{ gridColumn: "1", gridRow: "10"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={ironFog} styles={{ gridColumn: "2", gridRow: "10"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={cyberpunk} styles={{ gridColumn: "3", gridRow: "10"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={earthy} styles={{ gridColumn: "1", gridRow: "11"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={louCircle} styles={{ gridColumn: "2 / span 2", gridRow: "11 / span 2"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={ella} styles={{ gridColumn: "1", gridRow: "13"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={jadeRainbowBoots} styles={{ gridColumn: "2", gridRow: "13"}} openModal={openModal} />
      <ImageBtn onLoad={incrementLoaded} loaded={loaded} minLoad={nextLoad()} baseImageName={allysha} styles={{ gridColumn: "3", gridRow: "13"}} openModal={openModal} />
    </div>
  </>;
}