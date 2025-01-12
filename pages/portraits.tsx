import Head from "next/head";
import IrregularPortraitGrid from "./components/irregular-portrait-grid/irregular-portrait-grid";

export default function Portraits() {
  return (
    <>
      <Head>
        <title>Portraits</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IrregularPortraitGrid />
    </>
  );
}