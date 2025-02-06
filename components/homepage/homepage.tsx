import classes from "./homepage.module.css";
import { filterByArea, getImageUrls } from "@/helpers/imageList";

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
        <h3>About my and my work</h3>
        <p>
          Hello! I&apos;m Maksim, a portrait photographer currently based in Madison, WI.
          Because of my background in street photography, I focus primarily on taking portraits
          of regular people with varying degrees of comfort in front of a camera. I believe that
          everyone deserves beautifal and flattering images of themselves.
          <br />
          <br />
          Stylistically, I currently focus on darker images with vibrant colored lights. I work
          either in a studio, or in urban environments when the weather permits. I am familia
          with all sorts of lighting setups, natural and artificial, not all of which are showcased.
        </p>
      </div>
    </div>
  )
}