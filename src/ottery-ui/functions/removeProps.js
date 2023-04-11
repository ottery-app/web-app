import React from "react";

export default function removeProps(child, propTypes) {
    const {children, ...filteredProps} = child.props;

    propTypes.forEach((prop)=>{
        filteredProps[prop] = undefined;
    });

    return React.createElement(child.type, filteredProps, children);          
}