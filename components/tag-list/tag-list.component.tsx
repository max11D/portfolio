import { Button } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

export default function TagList({ options, data, setData }: {
  options: string[],
  data: string[],
  setData: Dispatch<SetStateAction<string[]>>
}) {
  const toggleTag = (tag: string) => {
    const newData = [...data];
    if (!newData.includes(tag)) {
      newData.push(tag);
    } else {
      newData.splice(newData.indexOf(tag), 1);
    }
    setData(newData);
  }
  return <>
    { options.map((o) => <Button
      key={o}
      variant={data.includes(o) ? "filled" : "outline"}
      radius="xl"
      size="compact-md"
      onClick={() => toggleTag(o)}
    >
      {o.replace("_", " ")}
    </Button>)}
  </>
}