import { useState } from "react";
import TagList from "../tag-list/tag-list";
import classes from './theme-questionnaire.module.css';

export default function ThemeQuestionnaire() {
  const AMBIANCE = "country cosmopolitan fairytale nightclub industrial street grunge occult";
  const FASHION = "glamorous goth vintage runway chic alternative";
  const ERA = "victorian classical royal futuristic alien";
  const INTIMACY = "masculine feminine androgenous dominant submissive romantic";
  const DYNAMICS = "strong unhinged playful serious energetic threatening menace thoughtful";
  const PALETTES = "colorful pastel earthy painterly saturated dark monochromatic neon";
  const STIMULUS = "artsy floral maximalist minimalist pop_art liminal";

  const [choices, setChoices] = useState<string[]>([]);

  return <>
    <div className={classes.tagSection}>
      <div className={classes.tagContainer}>
        <TagList options={AMBIANCE.split(" ")} data={choices} setData={setChoices}></TagList>
      </div>
      <div className={classes.tagContainer}>
        <TagList options={FASHION.split(" ")} data={choices} setData={setChoices}></TagList>
      </div>
      <div className={classes.tagContainer}>
        <TagList options={ERA.split(" ")} data={choices} setData={setChoices}></TagList>
      </div>
      <div className={classes.tagContainer}>
        <TagList options={INTIMACY.split(" ")} data={choices} setData={setChoices}></TagList>
      </div>
      <div className={classes.tagContainer}>
        <TagList options={DYNAMICS.split(" ")} data={choices} setData={setChoices}></TagList>
      </div>
      <div className={classes.tagContainer}>
        <TagList options={PALETTES.split(" ")} data={choices} setData={setChoices}></TagList>
      </div>
      <div className={classes.tagContainer}>
        <TagList options={STIMULUS.split(" ")} data={choices} setData={setChoices}></TagList>
      </div>
    </div>
  </>
}