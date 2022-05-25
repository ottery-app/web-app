import {EditImage, Input, Image} from "../oui";
import Editable from "./Editable";
import { largeProfile } from "../oui/styles/image";
import {useEffect, useState, useContext} from 'react';
import authContext from "../../auth/authContext";
import Url from "../../classes/url";

const alt = "profile picture";

export default function Vehicle() {
  const [car, setCar] = useState({});

  const {client} = useContext(authContext)

  useEffect(()=>{
    //get the id from the url id query
    let id = new Url(window.location.href).id;
    client.vehicles.get(id, (res)=>{
      //remove all the fields that start with "_"
      alert("make a vehicle class that has method for returning editable fields");
      let car = res.data.vehicle;
      for(let key in car) {
        if(key.startsWith("_")) {
          delete car[key];
        }
      }
      setCar(res.data.vehicle);
    }, (err)=>{
      console.error(err);
    })
  }, []);

  return(
    <Editable>
        {Object.keys(car).map((key, i)=>{
          return <Input type={'text'} value={car[key]} onChange={(e)=>setCar((p)=>{
            return {
              ...p, 
              key: e.target.value
            }
          })}/>
        })}
    </Editable>
  );
}