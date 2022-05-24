import {BottomButton, EditImage, Input, Image} from "../oui";
import { largeProfile } from "../oui/styles/image";
import {useEffect, useState, useContext} from 'react';
import authContext from "../../auth/authContext";

const alt = "profile picture";

export default function Vehicle() {
  const [src, useSrc] = useState("pfp");
  const [car, setCar] = useState({});
  const {client} = useContext(authContext)


  useEffect(()=>{
  },[])

  let content = 
    <div>
      <Image src={'pfp'} alt={alt} height={largeProfile} />
      {Object.keys(car).map((key, i)=>{
        return <Input type={'text'} value={car[key]} onChange={(e)=>setCar((p)=>{
          return {
            ...p, 
            key: e.target.value
          }
        })}/>
      })}



      <BottomButton icon={"edit"} />
    </div>

  return content;
}