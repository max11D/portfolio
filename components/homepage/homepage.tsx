import PhotoStrip from "../photo-strip/photo-strip";
import classes from "./homepage.module.css";
import { filterByArea, getImageUrls } from "@/helpers/imageList";

const ella = "IMG_8152";
const connect4 = "IMG_5375", leos = "IMG_5357";
const shikha = "IMG_4986-Enhanced-NR";
const alyssa = "IMG_6962-3";
//const cyberpunk = "IMG_1766";
const ominousJustin = "IMG_1906";

export default function Homepage() {
  return (
    <div className={classes.container}>
      <div className={classes.portraitBanner}>
        <img src={filterByArea(getImageUrls("IMG_1856"), "1080-land")?.url} className={classes.heroImage} />
        <div className={classes.overlay}>
          <div>
            <h2>Portrait<br/>photographer<br/>based in<br/>Madison, WI</h2>
          </div>
        </div>
      </div>
      <div className={classes.summary}>
        <h3>About me and my work</h3>
        <p>
          Hello! I&apos;m Maksim, a portrait photographer currently based in Madison, WI.

          With a background in street photography, I have experience taking photos of a
          diverse range of people of all identities and backgrounds.
          
          I specialize in taking artistic portraits with striking poses and lighting, but I
          also work with clients to ensure the mood and goals of the shoot align with their needs.
        </p>
        <PhotoStrip photos={[ominousJustin, shikha, leos, alyssa, ella, connect4]} />
        <p>
          My current focus is on darker images with vibrant colored lights. I work in both
          studios and in urban environments. However, I do not limit myself to such an aesthetic
          and am always interested in trying new things.
        </p>
      </div>
    </div>
  )
}