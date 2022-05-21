import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ImageButton, MultiFieldHeader, OrderedList } from '../oui/index.js';
import {height} from "../oui/styles/banners";
import authContext from '../../auth/authContext';
import addPx from '../../functions/addPx.js';
import { backgroundColor } from '../oui/styles/colors.js';
import Faded from '../oui/text/Faded.js';
import BottomButton from '../oui/buttons/BottomButton.js';

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
`;

const Sticky = styled.div`
    position: sticky;
    background: ${backgroundColor};
    padding-bottom: 0px;
    top: ${addPx(height, 1)};
`;

const List = styled.div`
    margin: 0 20px;
`;

const fields = ["kids", "friends", "vehicles"];

export default function GuardianUserProfile() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
    });
    const [currentKey, setCurrentKey] = useState(fields[0]);
    const navigate = useNavigate();
    const [add, setAdd] = useState(() => () => navigate("../create/" + fields[0]));
    const [data, setData] = useState({});
    const [curDat, setCurDat] = useState([]);
    const {client} = useContext(authContext);

    useEffect(() => {
        client.getInfo(
            (res) => {setUser(res.data)},
            (err) => {console.error(err)}
        );
    }, []);


    useEffect(()=>{
        client.getKids((res)=>{
            res.data.kids.forEach((kid)=>{
                kid.name = kid.firstName + " " + kid.lastName;
            });

            setData((p)=>{
                return {
                    ...p,
                    kids: res.data.kids
                }
            });
        })

        client.getVehicles((res)=>{
            res.data.vehicles.forEach((vehicle)=>{
                vehicle.name = vehicle.color + " " + vehicle.model;
            });

            setData((p)=>{
                return {
                    ...p,
                    vehicles: res.data.vehicles
                }
            });
        })

        client.getFriends((f)=>{
            data.friends = f;
        })
    },[]);

    useEffect(()=>{
        setCurDat(data[currentKey]);
    }, [data[currentKey]]);

    function changeContent(key) {
        setCurrentKey(key);
        setCurDat(data[key])
        setAdd(() => () => navigate("../create/" + key));
    }

    function showInfo(key, id) {
        //remove the s off the end of the key
        key = key.substring(0, key.length - 1);
        key = (key === "friend") ? "user" : key;
        //attach the id as a query param
        navigate("/info/" + key + "?id=" + id);
    }

    return (
        <Main>
            <Sticky>
                <MultiFieldHeader
                    title={user.firstName + " " + user.lastName}
                    src="pfp"
                    onTab={changeContent}
                    onEdit={()=>{navigate("edit")}}
                >
                    {fields.map((key)=>{
                        return <span key={key}>{key}</span>
                    })}
                </MultiFieldHeader>
            </Sticky>
            <List>
                <OrderedList>
                    {(curDat && curDat.length)
                        //if the user has anything saved
                        ?curDat.map((cur)=>{
                            return <ImageButton key={cur} content={cur.name} right={"pfp"} onClick={()=>{showInfo(currentKey, cur._id)}}/>
                        })
                        //if the user doesnt have anything saved
                        :[<Faded key={"singleItem"}>You have no registered {currentKey}</Faded>]
                    }
                </OrderedList>
            </List>
            <BottomButton icon={"pluss"} onClick={add} />
        </Main>
    );
}
