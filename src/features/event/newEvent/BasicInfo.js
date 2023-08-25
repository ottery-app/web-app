
import TextInput from "../../../ottery-ui/input/TextInput";
import { useEffect, useState } from "react";
import OptionsInput from "../../../ottery-ui/input/OptionsInput";
import AreaInput from "../../../ottery-ui/input/AreaInput";
import LocationInput from "../../../ottery-ui/input/LocationInput";
import { Main, Form, Head } from "./newEventStyles";
import CheckboxInput from "../../../ottery-ui/input/CheckboxInput";
import { noId } from "ottery-dto";
import styled from "styled-components";

export default function BasicInfo({
    form,
    setForm,
    updateErrorHandler,
}) {
    const [title, setTitle] = useState(form.summary);
    const [org, setOrg] = useState(form.org);
    const [about, setAbout] = useState(form.description);
    const [location, setLocation] = useState(form.location);
    const [pub, setPublic] = useState(form.public);

    useEffect(()=>{
        setForm((form)=>{
            return {
                ...form,
                summary: title,
                org,
                description: about,
                location,
                public: pub,
            }
        });
    }, [title, org, about, location, pub]);

    useEffect(()=>{
        updateErrorHandler(()=>{
            if (!title) {
                return ("Missing event title");
            }

            if (!org) {
                return ("Missing event orginization");
            }

            if (!about) {
                return ("Missing event summary");
            }

            if (!location) {
                return ("Missing event location");
            }

            if (pub === undefined) {
                return ("Event must be marked as public or unpublic");
            }
        });
    }, [title, org, about, location, pub]);
    
    return (
        <Main>
            <Form>
                <Head>Basic Info</Head>
                <CheckboxInput
                    label="Make public?"
                    checked={pub}
                    onChange={(e)=>{setPublic(e.target.value)}}
                />
                <TextInput 
                    label="Event Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <OptionsInput 
                    label="Orginization"
                    value={org}
                    onChange={e=>setOrg(e.target.value)}
                    options={[
                        [noId, "No Orginization"],
                    ]}
                />
                <LocationInput
                    label="Location"
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                />
                <AreaInput
                    label="About"
                    value={about}
                    onChange={e=>setAbout(e.target.value)}
                />
            </Form>
        </Main>
    );
}