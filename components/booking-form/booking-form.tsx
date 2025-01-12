import { TextInput } from "@mantine/core";
import ThemeQuestionnaire from "../theme-questionnaire/theme-questionnaire";

export default function BookingForm() {

  return <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <TextInput label="Name" placeholder="Marie Curie" />
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <TextInput label="Email" placeholder="m.curie@email.com" style={{ flex: "2 2 0"}} />
      <TextInput label="Preffered pronouns" placeholder="she/he/they" style={{ flex: "1 1 0"}} />
    </div>
    <h2>Shoot theme</h2>
    <p>Explain some shit</p>
    <ThemeQuestionnaire />
  </div>
}