import { useEffect, useState } from "react";
import { noId } from "@ottery/ottery-dto";

import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import Head from "./components/UI/Head";
import { CheckBox } from "../../../../ottery-ui/input/CheckBox";
import TextInput from "../../../../ottery-ui/input/TextInput";
import { Dropdown } from "../../../../ottery-ui/input/Dropdown";
import Main from "./components/UI/Main";

function BasicInfoForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
  const [title, setTitle] = useState(form.summary);
  const [org, setOrg] = useState(form.org);
  const [about, setAbout] = useState(form.description);
  const [location, setLocation] = useState(form.location);
  const [pub, setPublic] = useState(form.public);

  useEffect(() => {
    setForm((form) => {
      return {
        ...form,
        summary: title,
        org,
        description: about,
        location,
        public: pub,
      };
    });
  }, [title, org, about, location, pub]);

  useEffect(() => {
    updateErrorHandler(() => {
      if (!title) {
        return "Missing event title";
      }

      if (!org) {
        return "Missing event orginization";
      }

      if (!about) {
        return "Missing event summary";
      }

      if (!location) {
        return "Missing event location";
      }

      if (pub === undefined) {
        return "Event must be marked as public or unpublic";
      }
    });
  }, [title, org, about, location, pub]);

  return (
    <Main>
      <Head>Basic Info</Head>
      {/* <CheckBox label="Make public?" onChange={setPublic} value={pub} /> */}
      <TextInput label="Event Title" onChange={setTitle} value={title} />
      {/* <Dropdown
        label="Organization"
        onChange={setOrg}
        options={[{ label: "No Organization", value: noId }]}
        value={org}
      /> */}
      <TextInput label="Location" onChange={setLocation} value={location} />
      <TextInput
        label="About"
        multiline
        numberOfLines={4}
        onChange={setAbout}
        value={about}
      />
    </Main>
  );
}

export default BasicInfoForm;
