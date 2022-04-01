import React from "react";
import { useState } from "react";

import "../css/Info.css";
import "../css/minorButton.css";

import dpfp from "../images/dpfp.svg";
import gear from "../images/gear.svg";

Info.defaultProps = {
    img: dpfp,
    title: "title",
    fields: [
        {
            title: "default 1",
            content: "default content 1"
        },
        {
            title: "default 2",
            content: "default content 2"
        },
        {
            title: "default 3",
            content: "default content 3"
        }
    ]
}

/**
 * info is used to display the important information of the item that is passed in. It displays
 * in the header an image, id, and buttons to access the different fields of information.
 * 
 * @param {image} img is the image that is displayed in the info as an identifier
 * @param {React.Component} title is the identifying info of the item being displayed
 * @param {array} fields is an array of objects that contain the title and content of the info
 * 
 * @returns {React.Component} a display of the info
 */
function Info({img, title, fields}) {
    /**
     * these are the buttons that will be displayed in the info view
     */
    const buttons = fields.map(field => 
            <div className="minor-button c1 b1" onClick={() => {setContent(field.content)}} >
                {field.title}
            </div>
        );

    /**
     * this is the current content that is displayed
     */
    const [content, setContent] = useState(fields[0].content);

    return (
        <div className="info-view">
            <div className="header">
                <div className="pfp">
                    <img src={img} alt="default pfp" />
                </div>
                <div className="title">{title}</div>
                <div className="edit" onClick={()=>{alert("not implemented")}}>
                    <img src={gear} alt="edit" />
                </div>
                <div className="buttons">{buttons}</div>
            </div>
            <div className="content">
                {content}
            </div>
        </div>
    );
}

export default Info;