import {useState} from "react";
import { useNavigate } from "react-router-dom";

import "../css/Guardian.css";

import dclub from "../images/dclub.png";

function Guardian() {
    const navigate = useNavigate(); //remove later
    const [notifications, setNotifications] = useState([{
                                                            title:"title",
                                                            description:"no notifications"
                                                        }]);

    const [recomendation, setRecomendation] = useState({
                                                            title: "After School Club",
                                                            description: "An after school club deticated to doing after school activities",
                                                            link: "interested?",
                                                            image: dclub
                                                        });

    return (
        <main id="guardian-home">
            {
                notifications.map((notification, index) => {
                    return (
                        <div onClick={()=>{alert("not yet implemented")}} key={index} className="notification c4 b1 minor-button">
                            <div className="title">{notification.title}</div>
                            <div className="description">{notification.description}</div>
                        </div>
                    );
                })
            }
            <div className="recomendation">
                <div>{recomendation.title}</div>
                <img src={recomendation.image} alt=""/>
                <div>{recomendation.description}</div>
                <button onClick={()=>alert("not yet implemented")} className="minor-button b1 c1">{recomendation.link}</button>
            </div>
        </main>
    );
}

export default Guardian;