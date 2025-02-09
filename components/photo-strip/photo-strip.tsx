import { filterByArea, getImageUrls } from "@/helpers/imageList";
import classes from "./photo-strip.module.css";
import { Modal } from "@mantine/core";
import PhotoCarousel from "../photo-carousel/photo-carousel";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { MouseEvent as ReactMouseEvent } from 'react';

export default function PhotoStrip({ photos }: { photos: string[] }) {

  const [opened, { open, close }] = useDisclosure(false);
  const [activeImageIndex, setactiveImageIndex] = useState(0);
  
  const openModal = (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    event.preventDefault();
    setactiveImageIndex(index);
    open();
  }

  
  return <>
    <div className={classes.strip}>
      {photos.map((photo, targetIndex) => {
        const urls = getImageUrls(photo)
        return <a href="#" key={photo} onClick={(event) => openModal(event, targetIndex)}>
          <img src={filterByArea(urls, "720-land")?.url} />
        </a>;
      })}
    </div>
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
      <PhotoCarousel photos={photos} initialIndex={activeImageIndex} />
    </Modal>
  </>
}