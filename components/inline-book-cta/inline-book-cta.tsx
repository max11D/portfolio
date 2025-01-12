import { Button, Modal } from "@mantine/core";
import { CSSProperties, useEffect } from "react";
import classes from "./inline-book-cta.module.css";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import BookingForm from "../booking-form/booking-form";
import { MouseEvent as ReactMouseEvent } from 'react';

export default function InlineBookCTA({ style }: { style?: CSSProperties }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openModal = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    open();
    router.push(`?bookingModal=1`, undefined, { scroll: false });
  }
  
  const [opened, { open, close }] = useDisclosure(false, { onClose: () => {
    router.push("?", undefined, { scroll: false });
  }});

  useEffect(() => {
    const modalUrlState = searchParams.get("bookingModal");
    
    if (modalUrlState === "1") {
      open();
    } else {
      close();
    }
  }, [searchParams, close, open])

  return (<div style={style} className={classes.outer}>
    <Modal
      className={classes.modal}
      opened={opened}
      onClose={close}
      yOffset="0"
      title="Book a shoot"
      centered size="auto"
      transitionProps={{ duration: 100, enterDelay: 0 }}
      style={{"--mantine-color-body": "black"}}
      shadow={"#ff000033 0px 0px 12px 2px"}
    >
        <BookingForm />
    </Modal>
    <h2>Like what you see? Book a shoot!</h2>
    <p style={{ maxWidth: "30rem", paddingBottom: "0.5rem" }}>
      Submit an idea if you know what you want, or fill out a mood questionnaire
      if you&apos;re unsure.
    </p>
    <Button onClick={(event) => openModal(event)}>Get started</Button>
  </div>)
}